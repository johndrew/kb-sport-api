const AWS = require('aws-sdk');
const hash = require('object-hash');
const { genders, weightClasses } = require('../shared/enums');

const VALID_ACTIONS = Object.freeze({
    ADD: 'add',
    DELETE: 'delete',
    GET_ALL: 'getAll',
    UPDATE: 'update',
    EXISTS: 'exists',
});
const DYNAMO_INIT_PARAMS = {
    region: 'us-west-2',
};
const TABLE_NAME = 'kbLifterDb';
const VALID_UPDATE_FIELDS = Object.freeze({
    WEIGHT_CLASS: 'weightClass',
});

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
        case VALID_ACTIONS.UPDATE:
            if (!event.lifterId) throw new Error('lifterId is required for update event');
            if (!event.fields) throw new Error('fields are required for update event');
            if (!Object.keys(event.fields).length) throw new Error('fields cannot be empty');
            
            const invalidFields = Object.keys(event.fields).filter(field => Object.values(VALID_UPDATE_FIELDS).indexOf(field) < 0);
            if (invalidFields.length > 0)
                throw new Error(`these fields are invalid: ${invalidFields}`);
            if (event.fields.weightClass && Object.values(weightClasses).indexOf(event.fields.weightClass) < 0) {
                throw new Error(`weightClass must be one of these: ${Object.values(weightClasses).join(', ')}`);
            }
            break;
        case VALID_ACTIONS.EXISTS:
            if (!event.lifterId) throw new Error('lifterId is required for update event');
            break;
        case VALID_ACTIONS.GET_ALL:
        default:
            break;
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
 * Retrieves all lifters from db
 */
exports.getAllFromDb = async () => {
    
    console.log('INFO: retrieving lifters from database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.scan({ TableName: TABLE_NAME }, (err, result) => {
            if (err) {
                console.error('ERROR: scan error;', err);
                reject(new Error('Could not get lifters from database'));
            } else {
                console.log('DEBUG: scan success', result);
                resolve(result.Items);
            };
        });
    });
};

/**
 * Updates a lifter's data
 */
exports.updateInDb = async ({ lifterId, fields }) => {
    
    const attributesToUpdate = Object.keys(fields).map((field) => ({
        [field]: {
            Action: 'PUT', // TODO: Enable deleting fields
            Value: fields[field],
        },
    })).reduce((finalAttributes, fieldObj) => Object.assign(finalAttributes, fieldObj));
    
    console.log('INFO: updating lifter in database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.update({
            TableName: TABLE_NAME,
            Key: { lifterId },
            AttributeUpdates: attributesToUpdate,
        }, (err, result) => {
            if (err) {
                console.error('ERROR: scan error;', err);
                reject(new Error('Could not get lifters from database'));
            } else {
                console.log('DEBUG: scan success', result);
                resolve('success');
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
            return exports.deleteFromDb(event.lifterId);
        case VALID_ACTIONS.GET_ALL:
            return exports.getAllFromDb();
        case VALID_ACTIONS.UPDATE:
            lifterExists = await exports.lifterExists(event);
            if (lifterExists === false) throw new Error('lifter does not exist');
            return exports.updateInDb(event);
        case VALID_ACTIONS.EXISTS:
            return exports.lifterExists(event);
        default:
            throw new Error('action is not recognized');
    }
};