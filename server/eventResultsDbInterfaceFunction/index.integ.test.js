const assert = require('assert');
const { handler, getAllResults } = require('./index');
const {
    eventTypes,
    durations,
    genders,
    kettlebellWeights,
    rankings,
    weightClasses,
} = require('../shared/enums');

describe(__filename, () => {

    const eventId = '18c88ea8b8a5dd866e94e5ff248d5ce9c4b9181c';
    const lifterId = '0eb62bb5d2ff8be63997e24a5dd85516c5980c6e';
    const context = { tableName: 'kbEventDetailsDb-dev' };

    it('should register a lifter', async () => {
        
        await handler({
            action: 'register',
            eventId,
            lifterId,
        }, context);
    });

    it('should retrieve all records', async () => {
        
        const records = await handler({
            action: 'getAll'
        });
        assert.strictEqual(records.length > 0, true, 'there should be at least one record');
    });

    it('should update a record', async function i() {

        this.timeout(3000);
        
        await handler({
            action: 'lifterUpdate',
            eventId,
            lifterId,
            eventType: eventTypes.LONG_CYCLE,
            eventDuration: durations.TEN,
            weight: 62,
            weightClass: weightClasses.BANTAMWEIGHT,
            gender: genders.MEN,
            details: {
                kettlebellWeight: kettlebellWeights.THIRTYTWO,
                totalRepetitions: '53',
            },
        }, context);
    });

    it('should obtain a score', async () => {
        
        const results = await getAllResults(context);
        const { score: actual } = results.find(result => result.eventId === eventId && result.lifterId === lifterId);
        assert.strictEqual(actual > 0, true);
    });

    it('should obtain a rank', async () => {
        
        const results = await getAllResults(context);
        const { rank: actual } = results.find(result => result.eventId === eventId && result.lifterId === lifterId);
        assert.strictEqual(actual, rankings.MSIC);
    });

    it('should unregister a lifter', async () => {
        
        await handler({
            action: 'unregister',
            eventId,
            lifterId,
        }, context);
    });
});