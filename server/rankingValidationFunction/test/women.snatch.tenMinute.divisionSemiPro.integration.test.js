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
            eventType: eventTypes.SNATCH,
            duration: durations.TEN,
            kettlebellWeight: kettlebellWeights.TWENTY,
        };
    });

    describe('Positive Tests', () => {

        describe(weightClasses.STRAWWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.STRAWWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 104', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 104; i < 130; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 104 and greater than or equal to 71', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 71; i < 104; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 71 and greater than or equal to 57', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 57; i < 71; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 57 and greater than or equal to 45', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 45; i < 57; i++) testRepetitions.push(i);
            
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

            it('returns CMS for repetitions greater than or equal to 111', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 111; i < 140; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 111 and greater than or equal to 79', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 79; i < 111; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 79 and greater than or equal to 64', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 64; i < 79; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 64 and greater than or equal to 51', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 51; i < 64; i++) testRepetitions.push(i);
            
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
        
            it('returns CMS for repetitions greater than or equal to 120', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    150, 140, 130, 125,
                    124, 123, 122, 121, 120,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 120 and greater than or equal to 89', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    119, 118, 117, 116, 115, 114, 113, 112, 111, 110,
                    109, 108, 107, 106, 105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 89 and greater than or equal to 72', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 72; i < 89; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 72 and greater than or equal to 57', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57,
                ];
            
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
        
            it('returns CMS for repetitions greater than or equal to 129', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    160, 150, 140, 135,
                    133, 132, 131, 130, 129,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 129 and greater than or equal to 99', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    128, 127, 126, 125, 124, 123, 122, 121, 120,
                    119, 118, 117, 116, 115, 114, 113, 112, 111, 110,
                    109, 108, 107, 106, 105, 104, 103, 102, 101, 100,
                    99,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 99 and greater than or equal to 79', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                    79,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 79 and greater than or equal to 63', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63,
                ];
            
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
        
            it('returns CMS for repetitions greater than or equal to 138', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    170, 160, 150, 145,
                    142, 141, 140, 139, 138,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 138 and greater than or equal to 109', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 109; i < 138; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 109 and greater than or equal to 87', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    108, 107, 106, 105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 87 and greater than or equal to 70', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                ];
            
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
        
            it('returns CMS for repetitions greater than or equal to 147', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    180, 170, 160, 155,
                    151, 150, 149, 148, 147,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 147 and greater than or equal to 119', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    146, 145, 144, 143, 142, 141, 140,
                    139, 138, 137, 136, 135, 134, 133, 132, 131, 130,
                    129, 128, 127, 126, 125, 124, 123, 122, 121, 120,
                    119,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 119 and greater than or equal to 95', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [
                    118, 117, 116, 115, 114, 113, 112, 111, 110,
                    109, 108, 107, 106, 105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95,
                ];
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 95 and greater than or equal to 76', async function i() {
                this.timeout(timeout);
                
                const testRepetitions = [];
                for (let i = 76; i < 95; i++) testRepetitions.push(i);
            
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
        
            it('returns CMS for repetitions greater than or equal to 157', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 157; i < 190; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 157 and greater than or equal to 129', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 129; i < 157; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 129 and greater than or equal to 103', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 103; i < 129; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 103 and greater than or equal to 82', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 82; i < 103; i++) testRepetitions.push(i);
            
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
        
            it('returns CMS for repetitions greater than or equal to 168', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 168; i < 200; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank I for repetitions less than 168 and greater than or equal to 137', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 137; i < 168; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank II for repetitions less than 137 and greater than or equal to 110', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 110; i < 137; i++) testRepetitions.push(i);
            
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));
            
                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });
            
            it('returns Rank III for repetitions less than 110 and greater than or equal to 88', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 88; i < 110; i++) testRepetitions.push(i);
            
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

            it('returns no rank for valid repetitions less than 45', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 45; i++) testRepetitions.push(i);
            
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

            it('returns no rank for valid repetitions less than 51', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 51; i++) testRepetitions.push(i);
            
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
        
            it('returns no rank for repetitions less than 57', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 57; i++) testRepetitions.push(i);
            
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
        
            it('returns no rank for repetitions less than 63', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 63; i++) testRepetitions.push(i);
            
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
        
            it('returns no rank for repetitions less than 70', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 70; i++) testRepetitions.push(i);
            
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
        
            it('returns no rank for repetitions less than 76', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 76; i++) testRepetitions.push(i);
            
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
        
            it('returns no rank for repetitions less than 82', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 82; i++) testRepetitions.push(i);
            
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

            it('returns no rank for repetitions less than 88', async function i() {
                this.timeout(timeout);
            
                const testRepetitions = [];
                for (let i = 1; i < 88; i++) testRepetitions.push(i);
            
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
        
            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);
        
                const testRepetitions = [
                    168, 137, 110, 88,
                ];
        
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                  repetitions: rep,
                })).map(params => testError(params, 400));
        
                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });
        
            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);
        
                const testRepetitions = [
                    178, 144, 116, 93,
                ];
        
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                  repetitions: rep,
                })).map(params => testError(params, 400));
        
                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });
        
            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);
        
                const testRepetitions = [
                    186, 150, 121, 97,
                ];
        
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                  repetitions: rep,
                })).map(params => testError(params, 400));
        
                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });
        
            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);
        
                const testRepetitions = [
                    193, 156, 125, 100,
                ];
        
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                  repetitions: rep,
                })).map(params => testError(params, 400));
        
                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
        
        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });
        
            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);
        
                const testRepetitions = [
                    198, 160, 128, 102,
                ];
        
                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                  repetitions: rep,
                })).map(params => testError(params, 400));
        
                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
    });
});