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
            gender: genders.MEN,
            eventType: eventTypes.LONG_CYCLE,
            duration: durations.FIVE,
            kettlebellWeight: kettlebellWeights.TWENTY,
        };
    });

    describe('Positive Tests', () => {
        
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
        
        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
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
        
        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 56', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 56; i < 90; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 56 and greater than or equal to 45', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 45; i < 56; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 45 and greater than or equal to 36', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 36; i < 45; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 58', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 58; i < 90; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 58 and greater than or equal to 46', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 46; i < 58; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 46 and greater than or equal to 37', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 37; i < 46; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 60', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 60; i < 90; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 60 and greater than or equal to 48', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 48; i < 60; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 48 and greater than or equal to 38', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 38; i < 48; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });
        
            it('returns Rank I for repetitions greater than or equal to 61', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 61; i < 90; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 61 and greater than or equal to 49', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 49; i < 61; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 49 and greater than or equal to 39', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 39; i < 49; i++) testRepetitions.push(i);
            
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
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    30, 24, 19,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.FLYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FLYWEIGHT;
            });
        
            it('should return 400 for valid repetitions', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    33, 26, 21,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));
            
                const results = await Promise.all(tests);
                const expected = true
                results.forEach((actual) => strictEqual(actual, expected));
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
        
        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
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
        
        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });
        
            it('should return no rank for repetitions less than 36', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 36; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });
        
            it('should return no rank for repetitions less than 37', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 37; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });
        
            it('should return no rank for repetitions less than 38', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 38; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });
        
            it('should return no rank for repetitions less than 39', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 39; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.NO_RANK;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
    });
});