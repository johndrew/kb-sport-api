const AWS = require('aws-sdk');
const hash = require('object-hash');

const VALID_ACTIONS = Object.freeze({
    REGISTER_LIFTER: 'register',
    UNREGISTER_LIFTER: 'unregister',
    UPDATE_LIFTER_DETAILS: 'lifterUpdate',
});
const TABLE_NAME = 'kbEventDetailsDb';
const LIFTER_DB_FUNCTION = 'kbSportLifterDbInterfaceFunction';
const EVENT_DB_FUNCTION = 'kbSportEventDbInterfaceFunction';
const DYNAMO_INIT_PARAMS = {
    region: 'us-west-2',
};

function validateEvent(event) {

    if (!event) throw new Error('event is required');
    if (!event.action) throw new Error('action is required');

    switch (event.action) {
        case VALID_ACTIONS.REGISTER_LIFTER:
            if (!event.eventId) throw new Error('event id is required');
            if (!event.lifterId) throw new Error('lifter id is required');
            break;
        case VALID_ACTIONS.UNREGISTER_LIFTER:
            if (!event.eventId) throw new Error('event id is required');
            if (!event.lifterId) throw new Error('lifter id is required');
            break;
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}

function createKey(eventId, lifterId) {
    return hash({ eventId, lifterId });
}

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
        default:
            console.warn('WARN: event action not recognized');
            break;
    }
}