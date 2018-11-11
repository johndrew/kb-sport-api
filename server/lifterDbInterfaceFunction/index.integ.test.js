const assert = require('assert');
const { handler, lifterExists, getAllFromDb } = require('./index');

describe(__filename, () => {

    let lifterId;
    
    it('should add a lifter to db', async () => {
        
        const event = {
            action: 'add',
            firstName: 'test',
            lastName: 'icle',
            gender: 'women',
        };

        const result = await handler(event, {});
        lifterId = result.lifterId;
        const actual = await lifterExists(event);
        assert.strictEqual(actual, true);
    });

    it('should get all lifters from db', async () => {
        
        const event = { action: 'getAll' };

        const result = await handler(event, {});
        assert.strictEqual(result.length >= 1, true);
    });

    it('should update a lifter', async () => {
        
        const event = {
            action: 'update',
            lifterId,
            fields: {
                weightClass: 'Flyweight'
            },
        };

        await handler(event, {});
        const results = await getAllFromDb();
        const { weightClass: actual } = results.find(result => result.lifterId === lifterId);
        assert.strictEqual(actual, event.fields.weightClass);
    });

    it('should delete a lifter from db', async () => {
        
        const event = {
            action: 'delete',
            lifterId,
        };

        await handler(event, {});
        const actual = await lifterExists(event);
        assert.strictEqual(actual, false);
    });
});