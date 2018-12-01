const assert = require('assert');
const { handler } = require('./index');
const { eventTypes, durations } = require('../shared/enums');

const TEN_DIGIT_REGEX = /\d*\.(\d{1,10})/;

/**
 * Determines if two scores are equal.
 * Equality is determined to ten decimal places.
 */
function assertScoresEqual(actual, expected) {

    assert.strictEqual(
        TEN_DIGIT_REGEX.exec(actual.toFixed(12))[1],
        TEN_DIGIT_REGEX.exec(expected.toFixed(12))[1]
    );
}

describe(__filename, () => {

    const scoreEvent = {
        eventType: eventTypes.LONG_CYCLE,
        eventDuration: durations.FIVE,
        kettlebellWeight: 20,
        weight: 98.9,
        totalRepetitions: 28,
    };
    const context = {};

    describe('Positive Tests', () => {

        describe('when a long cycle score is requested', () => {

            let event;
            beforeEach(() => {
                
                event = Object.assign({}, scoreEvent, {
                    eventType: eventTypes.LONG_CYCLE,
                    eventDuration: durations.TEN,
                });
            });

            it('returns 475.714057454398 if kb=20,w=98.9,reps=28', async () => {

                event = Object.assign(event, {
                    kettlebellWeight: 20,
                    weight: 98.9,
                    totalRepetitions: 28,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 475.714057454398);
            });
    
            it('returns 950.752130352771 if kb=16,w=90,reps=88', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 16,
                    weight: 90,
                    totalRepetitions: 88,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 950.752130352771);
            });

            it('returns 516.43444327462 if kb=12,w=75.3,reps=100', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 12,
                    weight: 75.3,
                    totalRepetitions: 100,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 516.43444327462);
            });
        });

        describe('when a snatch score is requested', () => {

            let event;
            beforeEach(() => {
                
                event = Object.assign({}, scoreEvent, {
                    eventType: eventTypes.SNATCH,
                    eventDuration: durations.TEN,
                });
            });
            
            it('returns 604.832899651963 if kb=20,w=98.9,reps=164', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 20,
                    weight: 98.9,
                    totalRepetitions: 164,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 604.832899651963);
            });

            it('returns 242.150379487144 if kb=12,w=82.2,reps=188', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 12,
                    weight: 82.2,
                    totalRepetitions: 188,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 242.150379487144);
            });
        });

        describe('when a jerk score is requested', () => {

            let event;
            beforeEach(() => {
                
                event = Object.assign({}, scoreEvent, {
                    eventType: eventTypes.JERK,
                    eventDuration: durations.TEN,
                });
            });
            
            it('returns 2274.87145895057 if kb=32,w=78,reps=72', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 32,
                    weight: 78,
                    totalRepetitions: 72,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 2274.87145895057);
            });

            it('returns 64.6602804872 if kb=8,w=49.4,reps=102', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 8,
                    weight: 49.4,
                    totalRepetitions: 102,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 64.6602804872);
            });
        });

        describe('when a OALC request is made', () => {
            
            let event;
            beforeEach(() => {
                
                event = Object.assign({}, scoreEvent, {
                    eventType: eventTypes.LONG_CYCLE,
                    eventDuration: durations.FIVE,
                });
            });
            
            it('returns 221.521996678926 if kb=16,w=80.8,reps=65', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 16,
                    weight: 80.8,
                    totalRepetitions: 65,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 221.521996678926);
            });

            it('returns 34.5435719947451 if kb=8,w=85.5,reps=56', async () => {
                
                event = Object.assign(event, {
                    kettlebellWeight: 8,
                    weight: 85.5,
                    totalRepetitions: 56,
                });
                
                const actual = await handler(event, context);
                assertScoresEqual(actual, 34.5435719947451);
            });
        });
    });
    
    describe('Negative Tests', () => {

        it('should error if event is missing', async () => {
            
            try {
                await handler(null, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if event is missing');
        });

        it('should error if event type is missing', async () => {

            const event = Object.assign({}, scoreEvent, { eventType: undefined });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if event type is missing');
        });

        it('should error if event duration is missing', async () => {

            const event = Object.assign({}, scoreEvent, { eventDuration: undefined });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if event duration is missing');
        });

        it('should error if kettlebell weight is missing', async () => {

            const event = Object.assign({}, scoreEvent, { kettlebellWeight: undefined });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if kettlebell weight is missing');
        });

        it('should error if lifter weight is missing', async () => {

            const event = Object.assign({}, scoreEvent, { weight: undefined });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if lifter weight is missing');
        });

        it('should error if total repetitions is missing', async () => {

            const event = Object.assign({}, scoreEvent, { totalRepetitions: undefined });
            
            try {
                await handler(event, context);
            } catch (e) {
                assert.ok(e);
                return;
            }
            
            throw new Error('should not resolve if total repetitions is missing');
        });
    });
});