const assert = require('assert');
const { handler, eventExists } = require('./index');

describe(__filename, () => {

    const eventTemplate = {
        type: 'Long Cycle',
        duration: '10min',
    };
    const eventId = '18c88ea8b8a5dd866e94e5ff248d5ce9c4b9181c';
    
    it('should add an event to db', async () => {

        const event = Object.assign({}, eventTemplate, { action: 'add' });

        await handler(event, {});

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

    it('should delete an event from db', async () => {

        const event = { action: 'delete', eventId };

        await handler(event, {});

        const actual = await eventExists({ eventId });
        assert.strictEqual(actual, false);
    });
});