const AWS = require('aws-sdk');
const hash = require('object-hash');

const VALID_ACTIONS = Object.freeze({
    REGISTER_LIFTER: 'register',
    UNREGISTER_LIFTER: 'unregister',
    UPDATE_LIFTER_DETAILS: 'lifterUpdate',
    GET_ALL: 'getAll',
});
const VALID_DETAILS_TO_UPDATE = Object.freeze({
    KETTLEBELL: 'kettlebellWeight',
});
const TABLE_NAME = 'kbEventDetailsDb';
const LIFTER_DB_FUNCTION = 'kbSportLifterDbInterfaceFunction';
const EVENT_DB_FUNCTION = 'kbSportEventDbInterfaceFunction';
const DYNAMO_INIT_PARAMS = {
    region: 'us-west-2',
};

/**
 * Validates all input coming into this lambda function
 */
function validateEvent(event) {

    if (!event) throw new Error('event is required');
    if (!event.action) throw new Error('action is required');

    switch (event.action) {
        case VALID_ACTIONS.REGISTER_LIFTER:
        case VALID_ACTIONS.UNREGISTER_LIFTER:
            if (!event.eventId) throw new Error('event id is required');
            if (!event.lifterId) throw new Error('lifter id is required');
            break;
        case VALID_ACTIONS.UPDATE_LIFTER_DETAILS:
            if (!event.eventId) throw new Error('event id is required');
            if (!event.lifterId) throw new Error('lifter id is required');
            if (!event.details) throw new Error('details are required');
            Object.keys(event.details).forEach(detail => {
                if (Object.values(VALID_DETAILS_TO_UPDATE).indexOf(detail) < 0) throw new Error(`detail ${detail} is not allowed`);
            });
            break;
        case VALID_ACTIONS.GET_ALL:
            break;
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}

/**
 * Returns a unique key that identifies records in this db
 */
function createKey(eventId, lifterId) {
    return hash({ eventId, lifterId });
}

/**
 * Determines if an event exists in db
 */
exports.eventExists = async (eventId) => {

    console.log('INFO: Checking if event exists');
    const lambda = new AWS.Lambda({ region: 'us-west-2' });
    return new Promise((resolve, reject) => {
        lambda.invokeAsync({
            FunctionName: EVENT_DB_FUNCTION,
            InvokeArgs: JSON.stringify({
                action: 'exists',
                eventId,
            }),
        }, (err, eventExists) => {
            if (err) {
                console.error('ERROR: call to event failed', err.message);
                reject(new Error('Could not determine if event exists'));
            } else {
                console.log('DEBUG: call to event lambda successful');
                resolve(eventExists);
            }
        });
    });
};

/**
 * Determines if a lifter exists in db
 */
exports.lifterExists = async (lifterId) => {

    console.log('INFO: Checking if lifter exists');
    const lambda = new AWS.Lambda({ region: 'us-west-2' });
    return new Promise((resolve, reject) => {
        lambda.invokeAsync({
            FunctionName: LIFTER_DB_FUNCTION,
            InvokeArgs: JSON.stringify({
                action: 'exists',
                lifterId,
            }),
        }, (err, lifterExists) => {
            if (err) {
                console.error('ERROR: call to lambda failed', err.message);
                reject(new Error('Could not determine if lifter exists'));
            } else {
                console.log('DEBUG: call to lifter lambda successful');
                resolve(lifterExists);
            }
        });
    });
};

/**
 * Registers a lifter to an event in db
 */
exports.registerLifter = async ({ eventId, lifterId }, { tableName } = {}) => {

    console.log('INFO: Registering lifter to event');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.put({
            TableName: tableName || TABLE_NAME,
            Item: {
                id: createKey(eventId, lifterId),
                eventId,
                lifterId,
            },
        }, (err, results) => {
            if (err) {
                console.error('ERROR: put error;', err);
                reject(new Error('Could not register lifter'));
            } else {
                console.log('DEBUG: put success;', results);
                resolve('success');
            };
        });
    });
};

/**
 * Unregisters a lifter from an event in db
 */
exports.unregisterLifter = async ({ eventId, lifterId }, { tableName } = {}) => {

    console.log(`INFO: Unregistering lifter from event; lifterId:${lifterId},eventId:${eventId}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.delete({
            TableName: tableName || TABLE_NAME,
            Key: {
                id: createKey(eventId, lifterId),
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: delete error;', err);
                reject(new Error('Failed to unregister lifter from event'));
            } else {
                console.log('DEBUG: delete success;', result);
                resolve('success');
            };
        });
    });
};

/**
 * Returns all records from db
 */
exports.getAllResults = async ({ tableName } = {}) => {

    console.log('INFO: Getting all event results');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.scan({
            TableName: tableName || TABLE_NAME,
        }, (err, results) => {
            if (err) {
                console.error('ERROR: scan error;', err);
                reject(new Error('Could not get event results from database'));
            } else {
                console.log('DEBUG: scan success;', results);
                resolve(results.Items);
            };
        });
    });
};

/**
 * Updates details of a specific record
 */
exports.updateRecord = async({ eventId, lifterId, details }, { tableName } = {}) => {
    
    const attributesToUpdate = Object.keys(details).map((detail) => ({
        [detail]: {
            Action: 'PUT', // TODO: Enable deleting details
            Value: details[detail],
        },
    })).reduce((finalAttributes, detailObj) => Object.assign(finalAttributes, detailObj));
    
    console.log('INFO: updating lifter details for event in database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.update({
            TableName: tableName || TABLE_NAME,
            Key: { id: createKey(eventId, lifterId) },
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

exports.handler = async (event, context) => {

    validateEvent(event);

    switch (event.action) {
        case VALID_ACTIONS.REGISTER_LIFTER:
            if (!(await exports.eventExists(event.eventId))) throw new Error(`event ${event.eventId} does not exist`);
            if (!(await exports.lifterExists(event.lifterId))) throw new Error(`lifter ${event.lifterId} does not exist`);
            return exports.registerLifter({ eventId: event.eventId, lifterId: event.lifterId }, context);
        case VALID_ACTIONS.UNREGISTER_LIFTER:
            if (!(await exports.eventExists(event.eventId))) throw new Error(`event ${event.eventId} does not exist`);
            if (!(await exports.lifterExists(event.lifterId))) throw new Error(`lifter ${event.lifterId} does not exist`);
            return exports.unregisterLifter({ eventId: event.eventId, lifterId: event.lifterId }, context);    
        case VALID_ACTIONS.GET_ALL:
            return exports.getAllResults(context);
        case VALID_ACTIONS.UPDATE_LIFTER_DETAILS:
            if (!(await exports.eventExists(event.eventId))) throw new Error(`event ${event.eventId} does not exist`);
            if (!(await exports.lifterExists(event.lifterId))) throw new Error(`lifter ${event.lifterId} does not exist`);
            // TODO: add kettlebell validation by gender
            return exports.updateRecord({
                eventId: event.eventId,
                lifterId: event.lifterId,
                details: event.details,
            }, context);
        default:
            console.warn('WARN: event action not recognized');
            break;
    }
}