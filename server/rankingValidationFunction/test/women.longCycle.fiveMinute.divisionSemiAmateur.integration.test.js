const { strictEqual } = require('assert');
const {
    durations,
    eventTypes,
    genders,
    kettlebellWeights,
    rankings,
    weightClasses,
} = require('../../shared/enums');
const { getRankingLocal, testError } = require('./util/getRankingUtil');

describe(__filename, () => {

    const timeout = 4000;

    let params;
    beforeEach(() => {
        params = {
            gender: genders.WOMEN,
            eventType: eventTypes.LONG_CYCLE,
            duration: durations.FIVE,
            kettlebellWeight: kettlebellWeights.TWELVE,
        };
    });

    describe('Positive Tests', () => {

        describe(weightClasses.STRAWWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.STRAWWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 30', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 30; i < 60; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 30 and greater than or equal to 24', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 24; i < 30; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 24 and greater than or equal to 19', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 19; i < 24; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.FLYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FLYWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 33', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 33; i < 60; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 33 and greater than or equal to 26', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 26; i < 33; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 26 and greater than or equal to 21', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 21; i < 26; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 36', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 36; i < 70; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 36 and greater than or equal to 29', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 29; i < 36; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 29 and greater than or equal to 23', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 23; i < 29; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.FEATHERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FEATHERWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 39', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 39; i < 70; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 39 and greater than or equal to 31', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 31; i < 39; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 31 and greater than or equal to 25', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 25; i < 31; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 42', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 42; i < 70; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 42 and greater than or equal to 34', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 34; i < 42; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 34 and greater than or equal to 27', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 27; i < 34; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 46', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 46; i < 80; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 46 and greater than or equal to 37', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 37; i < 46; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 37 and greater than or equal to 29', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 29; i < 37; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.WELTERWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 49', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 49; i < 80; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 49 and greater than or equal to 39', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 39; i < 49; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 39 and greater than or equal to 32', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 32; i < 39; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_WELTERWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 53', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 53; i < 80; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 53 and greater than or equal to 42', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 42; i < 53; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 42 and greater than or equal to 34', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 34; i < 42; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
    });
    
    describe('Negative Tests', () => {

        describe(weightClasses.STRAWWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.STRAWWEIGHT;
            });
        
            it('should return no rank for repetitions less than 19', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 19; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.FLYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FLYWEIGHT;
            });
        
            it('should return no rank for repetitions less than 21', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 21; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });
        
            it('should return no rank for repetitions less than 23', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 23; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.FEATHERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FEATHERWEIGHT;
            });
        
            it('should return no rank for repetitions less than 25', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 25; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });
        
            it('should return no rank for repetitions less than 27', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 27; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });
        
            it('should return no rank for repetitions less than 29', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 29; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.WELTERWEIGHT;
            });
        
            it('should return no rank for repetitions less than 32', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 32; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_WELTERWEIGHT;
            });
        
            it('should return no rank for repetitions less than 34', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 34; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
            });
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    53, 42, 34,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    56, 45, 36,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    58, 46, 37,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    60, 48, 38,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    61, 49, 39,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
    });
});