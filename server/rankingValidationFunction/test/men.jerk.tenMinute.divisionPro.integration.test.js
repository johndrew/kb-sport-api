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
            eventType: eventTypes.JERK,
            duration: durations.TEN,
            kettlebellWeight: kettlebellWeights.THIRTYTWO,
        };
    });

    describe('Positive Tests', () => {``
        
        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 83', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 83; i < 110; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 83 and greater than or equal to 65', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 65; i < 83; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 65 and greater than or equal to 52', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 52; i < 65; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 52 and greater than or equal to 42', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 42; i < 52; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.FEATHERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FEATHERWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 90', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 90; i < 120; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 90 and greater than or equal to 72', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 72; i < 90; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 72 and greater than or equal to 58', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 58; i < 72; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 58 and greater than or equal to 46', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 46; i < 58; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 96', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 96; i < 130; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 96 and greater than or equal to 79', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 79; i < 96; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 79 and greater than or equal to 64', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 64; i < 79; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 64 and greater than or equal to 51', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 51; i < 64; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 102', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 102; i < 130; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 102 and greater than or equal to 86', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 86; i < 102; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 86 and greater than or equal to 69', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 69; i < 86; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 69 and greater than or equal to 55', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 55; i < 69; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.WELTERWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 109', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 109; i < 140; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 109 and greater than or equal to 93', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 93; i < 109; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 93 and greater than or equal to 74', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 74; i < 93; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 74 and greater than or equal to 60', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 60; i < 74; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 116', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 116; i < 150; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 116 and greater than or equal to 99', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 99; i < 116; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 99 and greater than or equal to 79', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 79; i < 99; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 79 and greater than or equal to 63', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 63; i < 79; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 123', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 123; i < 150; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 123 and greater than or equal to 105', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 105; i < 123; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 105 and greater than or equal to 83', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 83; i < 105; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 83 and greater than or equal to 67', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 67; i < 83; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 129', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 129; i < 160; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 129 and greater than or equal to 109', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 109; i < 129; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 109 and greater than or equal to 87', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 87; i < 109; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 87 and greater than or equal to 70', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 70; i < 87; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 134', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 134; i < 160; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 134 and greater than or equal to 113', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 113; i < 134; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 113 and greater than or equal to 90', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 90; i < 113; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 90 and greater than or equal to 72', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 72; i < 90; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });
        
            it('returns MCIS for repetitions greater than or equal to 137', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 137; i < 170; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MSIC;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns MS for repetitions less than 137 and greater than or equal to 116', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 116; i < 137; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.MS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns CMS for repetitions less than 116 and greater than or equal to 92', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 92; i < 116; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 92 and greater than or equal to 74', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 74; i < 92; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
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
                    72, 52, 41, 33,
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
                    77, 58, 46, 37,
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
        
            it('should return no rank for repetitions less than 42', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 42; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 46', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 46; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 51', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 51; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 55', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 55; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 60', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 60; i++) testRepetitions.push(i);
            
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
                    116, 99, 79, 63,
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
        
            it('should return no rank for repetitions less than 63', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 63; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 67', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 67; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 70', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 70; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 72', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 72; i++) testRepetitions.push(i);
            
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
        
            it('should return no rank for repetitions less than 74', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 0; i < 74; i++) testRepetitions.push(i);
            
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