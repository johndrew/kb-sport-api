const assert = require('assert');
const { handler, eventExists } = require('./index');

describe.only(__filename, () => {

    const eventTemplate = {
        type: 'Long Cycle',
        duration: '10min',
    };
    
    it('should add an event to db', async () => {

        const event = Object.assign({}, eventTemplate, { action: 'add' });

        await handler(event, {});

        const actual = await eventExists(eventTemplate.type, eventTemplate.duration);
        assert.strictEqual(actual, true);
    });

    it('should delete an event from db', async () => {

        const event = Object.assign({}, eventTemplate, { action: 'delete' });

        await handler(event, {});

        const actual = await eventExists(eventTemplate.type, eventTemplate.duration);
        assert.strictEqual(actual, false);
    });
});