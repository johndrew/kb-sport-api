const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const hash = require('object-hash');
const { eventTypes, durations } = require('../shared/enums');

const TABLE_NAME = 'kbEventDb';
const VALID_ACTIONS = Object.freeze({
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'delete',
});
const DYNAMO_INIT_PARAMS = {
    region: 'us-west-2',
};

/**
 * Throws an error if the event object is invalid.
 */
function validateEvent(event) {

    if (!event) throw new Error('Event is missing');
    if (!event.action) throw new Error('action is required');
    if (Object.values(VALID_ACTIONS).indexOf(event.action) < 0) throw new Error(`action ${event.action} is not recognized`);
    if (!event.type) throw new Error('event type is required');
    if (Object.values(eventTypes).indexOf(event.type) < 0) throw new Error(`event type ${event.type} is not recognized`);
    if (!event.duration) throw new Error('event duration is required');
    if (Object.values(durations).indexOf(event.duration) < 0) throw new Error(`event duration ${event.duration} is not recognized`);
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
exports.addToDb = async (eventType, duration) => {

    console.log(`INFO: Adding event; type:${eventType}, duration:${duration}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.put({
            TableName: TABLE_NAME,
            Item: {
                eventId: createKey(eventType, duration),
                type: eventType,
                duration: duration,
            },
        }, (err, result) => {
            if (err) {
                console.error('ERROR: put error;', err);
                reject(new Error('Could not add event to database'));
            } else {
                console.log('DEBUG: put success', result);
                resolve('success');
            };
        });
    });
};

exports.deleteFromDb = async (eventType, duration) => {

    console.log(`INFO: Deleting event; type:${eventType}, duration:${duration}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.delete({
            TableName: TABLE_NAME,
            Key: {
                eventId: createKey(eventType, duration),
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
 * Checks if an event exists in database
 * @param {String} eventType The type of event
 * @param {String} duration The length in time of the event
 * @returns {Boolean} Determines if the event exists in db.
 */
exports.eventExists = async (eventType, duration) => {

    console.log(`INFO: Determine if event exists; type:${eventType}, duration:${duration}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.get({
            TableName: TABLE_NAME,
            Key: {
                eventId: createKey(eventType, duration),
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
 * Provides an interface into the "kbEventDb" DynamoDb table.
 * Allows the user to add, update, or delete events
 */
exports.handler = async (event, context) => {

    console.log('INFO: Validating event');
    validateEvent(event);

    let eventExists;
    switch (event.action) {
        case VALID_ACTIONS.ADD:
            eventExists = await exports.eventExists(event.type, event.duration);
            if (eventExists == true) throw new Error('Event already exists');
            return await exports.addToDb(event.type, event.duration);
        case VALID_ACTIONS.DELETE:
            eventExists = await exports.eventExists(event.type, event.duration);
            if (eventExists == false) throw new Error('Event does not exist and cannot be deleted');
            return await exports.deleteFromDb(event.type, event.duration);
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}