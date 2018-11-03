const AWS = require('aws-sdk');
const hash = require('object-hash');
const { genders, weightClasses } = require('../shared/enums');

const VALID_ACTIONS = Object.freeze({
    ADD: 'add',
    DELETE: 'delete',
});
const DYNAMO_INIT_PARAMS = {
    region: 'us-west-2',
};
const TABLE_NAME = 'kbLifterDb';

function validateEvent(event) {
    if (!event) throw new Error('event is required');
    if (!event.action) throw new Error('action is required');

    switch (event.action) {
        case VALID_ACTIONS.ADD:
            if (!event.firstName) throw new Error('first name is required for add action');
            if (!event.lastName) throw new Error('last name is required for add action');
            if (!event.gender) throw new Error('gender is required for add action');
            if (Object.values(genders).indexOf(event.gender) < 0) throw new Error(`gender must be one of these: ${Object.values(genders).join(', ')}`);
            if (event.weightClass && Object.values(weightClasses).indexOf(event.weightClass) < 0) {
                throw new Error(`weightClass must be one of these: ${Object.values(weightClasses).join(', ')}`);
            }
            break;
        case VALID_ACTIONS.DELETE:
            if (!event.lifterId) throw new Error('lifterId is required for delete event');
            break;
        default:
            throw new Error('action is not recognized');
    }
}

/**
 * Creates id for a lifter
 */
function createKey({
    firstName,
    lastName,
    gender,
}) {
    return hash({
        firstName,
        lastName,
        gender,
    });
}

/**
 * Adds lifter to database
 */
exports.addToDb = async ({
    firstName,
    lastName,
    gender,
    weightClass,
}) => {

    const lifterId = createKey({ firstName, lastName, gender });
    const params = {
        TableName: TABLE_NAME,
        Item: {
            lifterId,
            firstName,
            lastName,
            gender,
        },
    };
    if (weightClass !== undefined) params.weightClass = weightClass;
    
    console.log('INFO: adding lifter to database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.put(params, (err, result) => {
            if (err) {
                console.error('ERROR: put error;', err);
                reject(new Error('Could not add lifter to database'));
            } else {
                console.log('DEBUG: put success', result);
                resolve({
                    lifterId,
                });
            };
        });
    });
}

/**
 * Deletes a lifter from database
 */
exports.deleteFromDb = async (lifterId) => {
    
    console.log('INFO: deleting lifter from database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.delete({
            TableName: TABLE_NAME,
            Key: {
                lifterId,
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: delete error;', err);
                reject(new Error('Could not delete lifter from database'));
            } else {
                console.log('DEBUG: delete success', result);
                resolve('success');
            };
        });
    });
}

/**
 * Determines if the lifter already exists in db.
 */
exports.lifterExists = async ({
    firstName,
    lastName,
    gender,
    lifterId,
}) => {

    const id = lifterId ? lifterId : createKey({ firstName, lastName, gender });
   
    console.log('DEBUG: checking if lifter exists in database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.get({
            TableName: TABLE_NAME,
            Key: {
                lifterId: id,
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: delete error;', err);
                reject(new Error('Could not delete lifter from database'));
            } else {
                console.log('DEBUG: delete success', result);
                resolve(result.Item !== undefined);
            };
        });
    });
}

/**
 * Provides an interface into the kettlebell sport lifter database
 */
exports.handler = async (event, context) => {
    
    validateEvent(event);

    let lifterExists;
    switch (event.action) {
        case VALID_ACTIONS.ADD:
            lifterExists = await exports.lifterExists(event);
            if (lifterExists) throw new Error('lifter already exists');
            return exports.addToDb(event);
        case VALID_ACTIONS.DELETE:
            lifterExists = await exports.lifterExists(event);
            if (lifterExists === false) throw new Error('lifter does not exist');
            await exports.deleteFromDb(event.lifterId);
            break;
        default:
            throw new Error('unrecognized action');
    }
};