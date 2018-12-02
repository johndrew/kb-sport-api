const AWS = require('aws-sdk');
const Joi = require('joi');
const mysql = require('mysql2/promise');
const _get = require('lodash.get');
const {
  eventTypes,
  durations,
  genders,
  weightClasses,
  kettlebellWeights,
} = require('../shared/enums');
const createDBClient = require('../shared/createDBClient');

const RANKING_DB = 'kbsportrankingtable2018.c88tulh6irue.us-west-2.rds.amazonaws.com';
const DB_USER = 'taylor';

/**
 * These errors are used by API Gateway to map to the correct error response type.
 * 
 * e.g. NO_MATCH_ERROR maps to a 404 error
 */
const errorResponses = Object.freeze({
  BAD_INPUT_ERROR: 'Input is not valid',
  NO_MATCH_ERROR: 'No ranking found',
  LOOKUP_ERROR: 'Could not get ranking',
  PARSING_ERROR: 'Could not extract ranking'
});

/**
 * Confirm expected parameters exist in Lambda event object, and verify that all parameter
 * combinations are valid.
 *
 * @param {Object} event Lambda event object.
 * @throws If event is not valid.
 */
const validateParameters = (event) => {
  const paramSchema = Joi.object().keys({
    duration: Joi.string()
      .valid(Object.values(durations))
      .required(),
    eventType: Joi.string()
      .valid(Object.values(eventTypes))
      .required(),
    gender: Joi.string()
      .valid(Object.values(genders))
      .required(),
    kettlebellWeight: Joi.number()
      .valid(Object.values(kettlebellWeights))
      .required(),
    repetitions: Joi.number().required(),
    weightCategory: Joi.string()
      .valid(Object.values(weightClasses))
      .required(),
  });
  const { error } = Joi.validate(event, paramSchema);
  if (error != null) {
    throw new Error(`${errorResponses.BAD_INPUT_ERROR}: ${error}`);
  }

  if (event.gender === genders.MEN) {
    const blackListedWeightCategories = [
      weightClasses.STRAWWEIGHT,
      weightClasses.FLYWEIGHT,
      weightClasses.SUPER_WELTERWEIGHT,
    ];
    if (blackListedWeightCategories.indexOf(event.weightCategory) > -1) {
      throw new Error(`${errorResponses.BAD_INPUT_ERROR}: ${genders.MEN} cannot have these weight classes: ${blackListedWeightCategories}`);
    }

    const blackListedKettlebellWeights = [
      kettlebellWeights.EIGHT,
      kettlebellWeights.TWELVE,
    ];
    if (blackListedKettlebellWeights.indexOf(event.kettlebellWeight) > -1) {
      throw new Error(`${errorResponses.BAD_INPUT_ERROR}: ${genders.MEN} cannot have these kettlebell weights: ${blackListedKettlebellWeights}`);
    }
  } else {
    const blackListedWeightCategories = [
      weightClasses.MIDDLEWEIGHT,
      weightClasses.SUPER_MIDDLEWEIGHT,
      weightClasses.CRUISERWEIGHT,
      weightClasses.HEAVYWEIGHT,
      weightClasses.SUPER_HEAVYWEIGHT,
    ];
    if (blackListedWeightCategories.indexOf(event.weightCategory) > -1) {
      throw new Error(`${errorResponses.BAD_INPUT_ERROR}: ${genders.WOMEN} cannot have these weight classes: ${blackListedWeightCategories}`);
    }

    const blackListedKettlebellWeights = [
      kettlebellWeights.TWENTYEIGHT,
      kettlebellWeights.THIRTYTWO,
    ];
    if (blackListedKettlebellWeights.indexOf(event.kettlebellWeight) > -1) {
      throw new Error(`${errorResponses.BAD_INPUT_ERROR}: ${genders.WOMEN} cannot have these kettlebell weights: ${blackListedKettlebellWeights}`);
    }
  }
};

/**
 * Retrieves parameters from the Lambda event object, bundles, and returns them.
 *
 * @param {Object} event Lambda event object.
 * @returns {Object} Required params to obtain ranking
 */
const getParams = (event) => {
  return {
    repetitions: event.repetitions,
    eventType: event.eventType,
    duration: event.duration,
    weightCategory: event.weightCategory,
    kettlebellWeight: event.kettlebellWeight,
    gender: event.gender,
  }
};

exports.handler = async (event, { dbHost, dbUser } = {}) => {
  console.info('Received event', JSON.stringify(event));
  console.info('Validating event');
  validateParameters(event);

  console.info('Setting up db client');
  const client = await createDBClient({
    AWS,
    mysql,
    host: dbHost || RANKING_DB,
    user: dbUser || DB_USER,
    database: 'rankingTable2018',
    region: 'us-west-2',
    localTesting: dbHost != null && dbUser != null,
  });

  try {
    console.info('Connecting to database');
    client.connect();

    const params = getParams(event);
    const sqlResult = await client.query(params);
    console.log('Got database result', sqlResult);

    console.log('Checking if data exists');
    const dataExists = _get(sqlResult, '[0][0]', 'no data');
    if (dataExists === 'no data') {
      console.warn('No result from database');
      // throw new Error(errorResponses.NO_MATCH_ERROR);
      return { ranking: '' };
    }

    const result = {
      ranking: null,
    };
    try {
      result.ranking = dataExists.RankingTypeName;
    } catch (e) {
      console.error('Problem extracting ranking', e);
      throw new Error(errorResponses.PARSING_ERROR);
    }

    return result;
  } catch (e) {
    if (e.message === errorResponses.NO_MATCH_ERROR || e.message || errorResponses.PARSING_ERROR) {
      throw e;
    }

    console.error(e)
    throw new Error(errorResponses.LOOKUP_ERROR);
  } finally {
    console.info('Closing database connection');
    await client.close();
  }
};