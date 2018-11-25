const assert = require('assert');
const { handler } = require('./index');

describe(__filename, () => {

    const eventTemplate = {
        type: 'Long Cycle',
        duration: '10min',
    };
    const context = {
        tableName: 'kbEventDb-dev',
    };
    let eventId;
    
    it('should add an event to db', async function i() {

        this.timeout(3000);

        const event = Object.assign({}, eventTemplate, { action: 'add' });

        ({ eventId } = await handler(event, context));
    });

    it('should confirm that the event exist', async () => {
        
        const event = {
            action: 'exists',
            eventId,
        };

        const actual = await handler(event, context);
        assert.strictEqual(actual, true);
    });

    it('should get all events from db', async () => {
        
        const event = { action: 'getAll' };

        const actual = await handler(event, context);

        assert.ok(actual);
    });

    it('should delete an event from db', async () => {

        const event = { action: 'delete', eventId };

        await handler(event, context);
    });

    it('should confirm that the event does not exist', async () => {
        
        const event = {
            action: 'exists',
            eventId,
        };

        const actual = await handler(event, context);
        assert.strictEqual(actual, false);
    });
});