const AWS = require('aws-sdk');
const Joi = require('joi');
const mysql = require('mysql2/promise');

/**
 * Confirm expected parameters exist in Lambda event object.
 *
 * @param {Object} event Lambda event object.
 * @throws If event is not valid.
 */
const validateParameters = (event) => {
  const paramSchema = Joi.object().keys({
    repetitions: Joi.number().required(),
    eventType: Joi.string().required(),
    duration: Joi.string().required(),
    weightCategory: Joi.string().required(),
    kettlebellWeight: Joi.number().required(),
    gender: Joi.string().required(),
  });
  const { error } = Joi.validate(event, paramSchema);
  if (error != null) {
    throw new Error(`Input is not valid: ${error}`);
  }
};

/**
 * Returns a client to a MySQL AWS RDS instance. Uses special IAM RDS authentication.
 *
 * @param {String} host Instance of RDS MySQL.
 * @param {String} user Name of the user to connect with.
 * @param {String} database Name of the database to retrieve from.
 * @param {String} region Name of the region the instance is in.
 * @throws If RDS token cannot be retrieved.
 * @throws If RDS client cannot be made.
 */
const createClient = async (host, user, database, region) => {
  const signer = new AWS.RDS.Signer();
  console.info('Retrieving access token');
  const token = await new Promise((resolve, reject) => {
    signer.getAuthToken({
      region,
      hostname: host,
      port: 3306,
      username: user
    }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    })
  });

  console.info('Creating connection to database');
  return mysql.createConnection({
    host,
    port: 3306,
    user,
    password: token,
    database,
    ssl: 'Amazon RDS',
    authSwitchHandler: (data, callback) => {
      if (data.pluginName === 'mysql_clear_password') {
        callback(null, Buffer.from(token + '\0'));
      }
    }
  });
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

/**
 * Takes required parameters and bundles them into a SQL query.
 *
 * @param {String} param0.eventType The name of an event.
 * @param {String} param0.duration The duration of the event.
 * @param {String} param0.gender The gender category of the lifter.
 * @param {String} param0.kettlebellWeight The kettlebell weight used by the lifter.
 * @param {String} param0.repetitions The number of valid repetitions the lifter performed.
 * @param {String} param0.weightCategory The weight category of the lifter.
 * @returns {String} A SQL query for a ranking.
 */
const createQuery = ({
  eventType,
  duration,
  gender,
  kettlebellWeight,
  repetitions,
  weightCategory,
} = {}) => {
  const query = (fields) =>
    `SELECT RankingTypeName FROM RankingTypes LEFT JOIN RankingTable ON RankingTypes.PriorityWeight=RankingTable.Ranking WHERE ${fields} ORDER BY PriorityWeight LIMIT 1;`;
  const fields = [];

  fields.push(`MinimumRepetitions <= ${repetitions}`);
  fields.push(`EventType = "${eventType}"`);
  fields.push(`Duration = "${duration}"`);
  fields.push(`WeightCategory = "${weightCategory}"`);
  fields.push(`KettlebellWeight = ${kettlebellWeight}`);
  fields.push(`Gender = "${gender}"`);
  const allFields = fields.join(' AND ');

  return query(allFields);
};

exports.handler = async (event, context) => {
  console.info('Received event', JSON.stringify(event));
  console.info('Validating event');
  validateParameters(event);

  console.info('Setting up db client');
  const host = 'kbsportrankingtable2018.c88tulh6irue.us-west-2.rds.amazonaws.com';
  const user = 'taylor';
  const region = 'us-west-2';
  const database = 'rankingTable2018';
  const connection = await createClient(host, user, database, region);

  try {
    console.info('Connecting to database');
    connection.connect();

    const params = getParams(event);
    const query = createQuery(params);
    const sqlResult = await connection.query(query);
    console.log('Got database result', sqlResult);

    const result = {
      ranking: null,
    };
    try {
      const data = sqlResult[0];
      if (data.length === 0) {
        console.warn('No result from database');
        return result;
      }

      result.ranking = data[0].RankingTypeName;
    } catch (e) {
      console.error('Problem extracting ranking', e);
      throw new Error('Could not extract ranking');
    }

    return result;
  } catch (e) {
    console.error(e)
    throw new Error('Could not get ranking');
  } finally {
    console.info('Closing database connection');
    await connection.close();
  }
};