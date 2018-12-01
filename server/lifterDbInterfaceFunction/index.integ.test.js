const assert = require('assert');
const { handler, lifterExists, getAllFromDb } = require('./index');
const {
    weightClasses,
    genders,
} = require('../shared/enums');
const testDb = 'kbLifterDb-dev';

describe(__filename, () => {

    let lifterId;
    const context = { tableName: testDb };
    
    it('should add a lifter to db', async () => {
        
        const event = {
            action: 'add',
            firstName: 'test',
            lastName: 'icle',
            gender: genders.WOMEN,
        };

        const result = await handler(event, context);
        lifterId = result.lifterId;
        const actual = await lifterExists(event, context);
        assert.strictEqual(actual, true);
    });

    it('should get all lifters from db', async () => {
        
        const event = { action: 'getAll' };

        const result = await handler(event, context);
        assert.strictEqual(result.length >= 1, true);
    });

    it('should update a lifter', async () => {
        
        const event = {
            action: 'update',
            lifterId,
            gender: genders.WOMEN,
            fields: {
                weight: '75' // welterweight
            },
        };

        await handler(event, context);
        const results = await getAllFromDb(context);
        const { weight: actual } = results.find(result => result.lifterId === lifterId);
        assert.strictEqual(actual, event.fields.weight);
    });

    it('should save weight class when weight is saved', async () => {
        
        const results = await getAllFromDb(context);
        const { weightClass: actual } = results.find(result => result.lifterId === lifterId);
        assert.strictEqual(actual, weightClasses.WELTERWEIGHT);
    });

    it('should show when a lifter exists', async () => {
        
        const event = {
            action: 'exists',
            lifterId,
        };

        const actual = await handler(event, context);
        assert.strictEqual(actual, true);
    });

    it('should delete a lifter from db', async () => {
        
        const event = {
            action: 'delete',
            lifterId,
        };

        await handler(event, context);
        const actual = await lifterExists(event, context);
        assert.strictEqual(actual, false);
    });

    it('should show when a lifter does not exist', async () => {
        
        const event = {
            action: 'exists',
            lifterId,
        };

        const actual = await handler(event, context);
        assert.strictEqual(actual, false);
    });
});