const assert = require('assert');
const { handler } = require('./index');

describe(__filename, () => {

    const eventId = '18c88ea8b8a5dd866e94e5ff248d5ce9c4b9181c';
    const lifterId = '0eb62bb5d2ff8be63997e24a5dd85516c5980c6e';

    it('should register a lifter', async () => {
        
        await handler({
            action: 'register',
            eventId,
            lifterId,
        }, { tableName: 'kbEventDetailsDb-dev' });
    });

    it('should retrieve all records', async () => {
        
        const records = await handler({
            action: 'getAll'
        });
        assert.strictEqual(records.length > 0, true, 'there should be at least one record');
    });

    it('should update a record', async () => {
        
        await handler({
            action: 'lifterUpdate',
            eventId,
            lifterId,
            details: {
                kettlebellWeight: '28',
            },
        }, { tableName: 'kbEventDetailsDb-dev' });
    });

    it('should unregister a lifter', async () => {
        
        await handler({
            action: 'unregister',
            eventId,
            lifterId,
        }, { tableName: 'kbEventDetailsDb-dev' });
    });
});