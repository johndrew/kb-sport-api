const assert = require('assert');
const { handler, eventExists } = require('./index');

describe(__filename, () => {

    const eventTemplate = {
        type: 'Long Cycle',
        duration: '10min',
    };
    let eventId;
    
    it('should add an event to db', async () => {

        const event = Object.assign({}, eventTemplate, { action: 'add' });

        ({ eventId } = await handler(event, {}));

        const actual = await eventExists({
            eventType: eventTemplate.type,
            duration: eventTemplate.duration,
        });
        assert.strictEqual(actual, true);
    });

    it('should get all events from db', async () => {
        
        const event = { action: 'getAll' };

        const actual = await handler(event, {});

        assert.ok(actual);
    });

    it('should register lifter to db', async () => {
        
        const event = {
            action: 'register',
            eventId,
            lifterId: '54e34c0648350e93dee24410510ccbc9e494aeee', // WARNING: hardcoded lifter id. Could be deleted.
        };

        await handler(event, {});
        assert.ok(true);
    });

    it('should delete an event from db', async () => {

        const event = { action: 'delete', eventId };

        await handler(event, {});

        const actual = await eventExists({ eventId });
        assert.strictEqual(actual, false);
    });
});