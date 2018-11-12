const AWS = require('aws-sdk');
const hash = require('object-hash');
const { eventTypes, durations } = require('../shared/enums');

const TABLE_NAME = 'kbEventDb';
const VALID_ACTIONS = Object.freeze({
    ADD: 'add',
    DELETE: 'delete',
    GET_ALL: 'getAll',
    REGISTER: 'register',
    EXISTS: 'exists',
});
const DYNAMO_INIT_PARAMS = {
    region: 'us-west-2',
};
const LIFTER_DB_FUNCTION = 'kbSportLifterDbInterfaceFunction';

/**
 * Throws an error if the event object is invalid.
 */
function validateEvent(event) {

    if (!event) throw new Error('Event is missing');
    if (!event.action) throw new Error('action is required');

    switch (event.action) {
        case VALID_ACTIONS.GET_ALL:
            return;
        case VALID_ACTIONS.ADD:
            if (!event.type) throw new Error('event type is required');
            if (Object.values(eventTypes).indexOf(event.type) < 0) throw new Error(`event type ${event.type} is not recognized`);
            if (!event.duration) throw new Error('event duration is required');
            if (Object.values(durations).indexOf(event.duration) < 0) throw new Error(`event duration ${event.duration} is not recognized`);
            return;
        case VALID_ACTIONS.DELETE:
            if (!event.eventId) throw new Error('event id is required');
            return;
        case VALID_ACTIONS.REGISTER:
            if (!event.eventId) throw new Error('event id is required');
            if (!event.lifterId) throw new Error('lifter id is required');
            return;
        case VALID_ACTIONS.EXISTS:
            if (!event.eventId) throw new Error('event id is required');
            return;
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}

/**
 * Creates the db key for dynamo
 * @param {String} eventType 
 * @param {String} duration 
 */
function createKey(eventType, duration) {
    return hash({ eventType, duration });
}

/**
 * Saves an event to the database.
 * @param {String} eventType The type of event
 * @param {String} duration The length in time of the event
 * @returns {String} Success string
 */
exports.addToDb = async (eventType, duration, { tableName } = {}) => {

    console.log(`INFO: Adding event; type:${eventType}, duration:${duration}`);
    const eventId = createKey(eventType, duration);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.put({
            TableName: tableName || TABLE_NAME,
            Item: {
                eventId,
                type: eventType,
                duration: duration,
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: put error;', err);
                reject(new Error('Could not add event to database'));
            } else {
                console.log('DEBUG: put success', result);
                resolve({
                    eventId,
                });
            };
        });
    });
};

exports.deleteFromDb = async (eventId, { tableName } = {}) => {

    console.log(`INFO: Deleting event; eventId:${eventId}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.delete({
            TableName: tableName || TABLE_NAME,
            Key: {
                eventId,
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: delete error;', err);
                reject(new Error('Failed to delete event'));
            } else {
                console.log('DEBUG: delete success;', result);
                resolve('success');
            };
        });
    });
};

/**
 * Registers a lifter for an event in db
 */
exports.registerLifterInDb = async ({ eventId, lifterId }, { tableName } = {}) => {
    
    console.log('INFO: registering lifter to event in database');
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.update({
            TableName: tableName || TABLE_NAME,
            Key: { eventId },
            UpdateExpression: "ADD #lifters :lifter",
            ExpressionAttributeNames: { "#lifters" : "lifters" },
            ExpressionAttributeValues: { ":lifter": dynamo.createSet([lifterId]) }
        }, (err, result) => {
            if (err) {
                console.error('ERROR: update error;', err);
                reject(new Error('Could not register lifter to event in database'));
            } else {
                console.log('DEBUG: update success', result);
                resolve('success');
            };
        });
    });
};

/**
 * Checks if an event exists in database
 * @param {String} eventType The type of event
 * @param {String} duration The length in time of the event
 * @returns {Boolean} Determines if the event exists in db.
 */
exports.eventExists = async ({ eventType, duration, eventId }, { tableName } = {}) => {

    console.log(`INFO: Determine if event exists; type:${eventType}, duration:${duration}, eventId:${eventId}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.get({
            TableName: tableName || TABLE_NAME,
            Key: {
                eventId: eventId ? eventId : createKey(eventType, duration),
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: get error;', err);
                reject(new Error('Could not check if event exists in database'));
            } else {
                console.log('DEBUG: get success;', result);
                resolve(result.Item !== undefined);
            };
        });
    });
};

/**
 * Retrieves all events.
 */
exports.getAllFromDb = async ({ tableName } = {}) => {

    console.log('INFO: Getting all events');

    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.scan({
            TableName: tableName || TABLE_NAME,
        }, (err, results) => {
            if (err) {
                console.error('ERROR: scan error;', err);
                reject(new Error('Could not get events from database'));
            } else {
                console.log('DEBUG: scan success;', results);
                resolve(results.Items);
            };
        });
    });
};

/**
 * Determines if a lifter exists
 */
exports.lifterExists = async ({ lifterId }) => {

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
    })
}

/**
 * Provides an interface into the "kbEventDb" DynamoDb table.
 * Allows the user to add, update, or delete events
 */
exports.handler = async (event, context) => {

    console.log('INFO: Validating event');
    validateEvent(event);

    let eventExists;
    switch (event.action) {
        case VALID_ACTIONS.ADD:
            eventExists = await exports.eventExists({
                eventType: event.type,
                duration: event.duration,
            }, context);
            if (eventExists == true) throw new Error('Event already exists');
            return exports.addToDb(event.type, event.duration, context);
        case VALID_ACTIONS.DELETE:
            eventExists = await exports.eventExists({ eventId: event.eventId }, context);
            if (eventExists == false) throw new Error('Event does not exist and cannot be deleted');
            return exports.deleteFromDb(event.eventId, context);
        case VALID_ACTIONS.GET_ALL:
            return exports.getAllFromDb(context);
        case VALID_ACTIONS.REGISTER:
            eventExists = await exports.eventExists({ eventId: event.eventId }, context);
            if (eventExists == false) throw new Error('Event does not exist. Cannot register lifter');
            const lifterExists = await exports.lifterExists({ lifterId: event.lifterId });
            if (lifterExists == false) throw new Error('Lifter does not exist. Cannot register lifter');
            return exports.registerLifterInDb({ eventId: event.eventId, lifterId: event.lifterId }, context);
        case VALID_ACTIONS.EXISTS:
            return exports.eventExists({ eventId: event.eventId }, context);
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}