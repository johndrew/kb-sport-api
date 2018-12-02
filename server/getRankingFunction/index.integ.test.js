const assert = require('assert');
const {
    durations,
    eventTypes,
    genders,
    kettlebellWeights,
    rankings,
    weightClasses,
} = require('../shared/enums');
const { handler } = require('./index');

describe(__filename, () => {

    const event = {
        duration: durations.TEN,
        eventType: eventTypes.LONG_CYCLE,
        gender: genders.WOMEN,
        kettlebellWeight: kettlebellWeights.TWENTYFOUR,
        repetitions: 53,
        weightCategory: weightClasses.BANTAMWEIGHT,
    };
    const context = {
        dbHost: 'localhost',
        dbUser: 'root',
    };

    it('should returns the proper ranking', async () => {

        const { ranking: actual } = await handler(event, context);
        assert.strictEqual(actual, rankings.MSIC);
    });
});