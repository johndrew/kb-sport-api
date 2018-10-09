const {
    strictEqual,
} = require('assert');
const {
    durations,
    eventTypes,
    genders,
    kettlebellWeights,
    rankings,
    weightClasses,
} = require('../../shared/enums');
const {
    getRanking,
    testErrorCode,
} = require('./util/getRankingUtil');

describe(__filename, () => {
    beforeEach(() => {
        params = {
            gender: genders.MEN,
            eventType: eventTypes.LONG_CYCLE,
            duration: durations.TEN,
            kettlebellWeight: kettlebellWeights.TWENTYFOUR,
        };
    });

    describe('Positive Tests', () => {
        const timeout = 4000;

        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 65', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 80, 70,
                    69, 68, 67, 66, 65,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 65 and greater than or equal to 52', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    64, 63, 62, 61, 60,
                    59, 58, 57, 56, 55, 54, 53, 52,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 52 and greater than or equal to 42', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    51, 50,
                    49, 48, 47, 46, 45, 44, 43, 42,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 42 and greater than or equal to 33', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    41, 40,
                    39, 38, 37, 36, 35, 34, 33,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.FEATHERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FEATHERWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 70', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 80,
                    75, 74, 73, 72, 71, 70,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 70 and greater than or equal to 57', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 57 and greater than or equal to 46', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    56, 55, 54, 53, 52, 51, 50,
                    49, 48, 47, 46,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 46 and greater than or equal to 36', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    45, 44, 43, 42, 41, 40,
                    39, 38, 37, 36,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 76', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 80,
                    79, 78, 77, 76,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 76 and greater than or equal to 61', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 61 and greater than or equal to 49', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    60,
                    59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
                    49,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 49 and greater than or equal to 39', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    48, 47, 46, 45, 44, 43, 42, 41, 40,
                    39,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 82', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    110, 100, 90,
                    85, 84, 83, 82,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 82 and greater than or equal to 66', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 66 and greater than or equal to 53', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    65, 64, 63, 62, 61, 60,
                    59, 58, 57, 56, 55, 54, 53,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 53 and greater than or equal to 42', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    52, 51, 50,
                    49, 48, 47, 46, 45, 44, 43, 42,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.WELTERWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 88', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110, 100, 90,
                    89, 88,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 88 and greater than or equal to 71', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    87, 86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 71 and greater than or equal to 57', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 57 and greater than or equal to 45', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    56, 55, 54, 53, 52, 51, 50,
                    49, 48, 47, 46, 45,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 94', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110, 100,
                    99, 98, 97, 96, 95, 94,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 94 and greater than or equal to 75', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 75 and greater than or equal to 60', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 60 and greater than or equal to 48', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
                    49, 48,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 99', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110,
                    105, 104, 103, 102, 101, 100, 99,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 99 and greater than or equal to 79', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                    79,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 79 and greater than or equal to 63', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 63 and greater than or equal to 51', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    62, 61, 60,
                    59, 58, 57, 56, 55, 54, 53, 52, 51,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 103', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    130, 120, 110,
                    105, 104, 103,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 103 and greater than or equal to 83', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 83 and greater than or equal to 66', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 66 and greater than or equal to 53', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    65, 64, 63, 62, 61, 60,
                    59, 58, 57, 56, 55, 54, 53,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });

            it('returns CMS for repetitions greater than or equal to 107', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    140, 130, 120, 110,
                    109, 108, 107,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 107 and greater than or equal to 86', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    106, 105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 86 and greater than or equal to 68', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 68 and greater than or equal to 55', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57, 56, 55,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT
            });

            it('returns CMS for repetitions greater than or equal to 110', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    140, 130, 120,
                    115, 114, 113, 112, 111, 110,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.CMS;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank I for repetitions less than 110 and greater than or equal to 88', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    109, 108, 107, 106, 105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 88 and greater than or equal to 70', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    87, 86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach((actual) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 70 and greater than or equal to 56', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57, 56,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRanking(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_III;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });
    });

    describe('Negative Tests', () => {
        const timeout = 4000;

        describe(weightClasses.STRAWWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.STRAWWEIGHT;
            });

            it('returns 400 for valid repetitions', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                55, 43, 34, 28,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 400));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.FLYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FLYWEIGHT;
            });

            it('returns 400 for valid repetitions', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                60, 48, 38, 31,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 400));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });

            it('returns 404 for repetitions less than 33', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                32, 31, 30, 29, 28,
                20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.FEATHERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FEATHERWEIGHT;
            });

            it('returns 404 for repetitions less than 36', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                35, 34, 33, 32, 31,
                30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });

            it('returns 404 for repetitions less than 39', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                38, 37, 36, 35, 34,
                30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });

            it('returns 404 for repetitions less than 42', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                41, 40, 39, 38, 37,
                30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.WELTERWEIGHT;
            });

            it('returns 404 for repetitions less than 45', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                44, 43, 42, 41, 40,
                30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_WELTERWEIGHT;
            });

            it('returns 400 for valid repetitions', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                94, 75, 60, 48,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 400));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
            });

            it('returns 404 for repetitions less than 48', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                47, 46, 45, 44, 43,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });

            it('returns 404 for repetitions less than 51', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                50, 49, 48, 47, 46,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });

            it('returns 404 for repetitions less than 53', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                52, 51, 50, 49, 48,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });

            it('returns 404 for repetitions less than 55', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                54, 53, 52, 51, 50,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });

            it('returns 404 for repetitions less than 56', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                55, 54, 53, 52, 51, 50,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testErrorCode(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });
    });
});