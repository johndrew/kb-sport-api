const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const hash = require('object-hash');
const { eventTypes, durations } = require('../shared/enums');

const TABLE_NAME = 'kbEventDb';
const VALID_ACTIONS = Object.freeze({
    ADD: 'add',
    DELETE: 'delete',
    GET_ALL: 'getAll',
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

exports.deleteFromDb = async (eventId) => {

    console.log(`INFO: Deleting event; eventId:${eventId}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.delete({
            TableName: TABLE_NAME,
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
 * Checks if an event exists in database
 * @param {String} eventType The type of event
 * @param {String} duration The length in time of the event
 * @returns {Boolean} Determines if the event exists in db.
 */
exports.eventExists = async ({ eventType, duration, eventId }) => {

    console.log(`INFO: Determine if event exists; type:${eventType}, duration:${duration}, eventId:${eventId}`);
    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.get({
            TableName: TABLE_NAME,
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
exports.getAllFromDb = async () => {

    console.log('INFO: Getting all events');

    const dynamo = new AWS.DynamoDB.DocumentClient(DYNAMO_INIT_PARAMS);
    return new Promise((resolve, reject) => {
        dynamo.scan({ TableName: TABLE_NAME }, (err, results) => {
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
            });
            if (eventExists == true) throw new Error('Event already exists');
            return await exports.addToDb(event.type, event.duration);
        case VALID_ACTIONS.DELETE:
            eventExists = await exports.eventExists({ eventId: event.eventId });
            if (eventExists == false) throw new Error('Event does not exist and cannot be deleted');
            return await exports.deleteFromDb(event.eventId);
        case VALID_ACTIONS.GET_ALL:
            return await exports.getAllFromDb();
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}