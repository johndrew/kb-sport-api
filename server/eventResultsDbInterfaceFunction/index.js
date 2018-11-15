const VALID_ACTIONS = Object.freeze({
    REGISTER_LIFTER: 'register',
    UNREGISTER_LIFTER: 'register',
    UPDATE_LIFTER_DETAILS: 'lifterUpdate',
});

function validateEvent(event) {

    if (!event) throw new Error('event is required');
    if (!event.action) throw new Error('action is required');

    switch (event.action) {
        default:
            throw new Error(`action ${event.action} is not recognized`);
    }
}

exports.handler = async (event, context) => {

    validateEvent(event);
}