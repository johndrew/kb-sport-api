const assert = require('assert');
const { handler, lifterExists } = require('./index');

describe(__filename, () => {

    let lifterId;
    
    it('should add a lifter to db', async () => {
        
        const event = {
            action: 'add',
            firstName: 'sharon',
            lastName: 'feldman',
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