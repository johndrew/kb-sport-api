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
    getRankingLocal,
    testError,
} = require('./util/getRankingUtil');

describe(__filename, () => {
    let params;
    beforeEach(() => {
        params = {
            gender: genders.MEN,
            eventType: eventTypes.LONG_CYCLE,
            duration: durations.TEN,
            kettlebellWeight: kettlebellWeights.TWENTY,
        };
    });

    describe('Positive Tests', () => {
        const timeout = 4000;

        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });

            it('returns Rank I for repetitions greater than or equal to 62', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    90, 80, 70,
                    66, 65, 64, 63, 62,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 62 and greater than or equal to 50', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    61, 60,
                    59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 50 and greater than or equal to 40', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
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

            it('returns Rank I for repetitions greater than or equal to 67', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 80,
                    71, 70, 69, 68, 67,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 67 and greater than or equal to 54', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57, 56, 55, 54,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 54 and greater than or equal to 43', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    53, 52, 51, 50,
                    49, 48, 47, 46, 45, 44, 43,
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

            it('returns Rank I for repetitions greater than or equal to 73', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 80,
                    77, 76, 75, 74, 73,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 73 and greater than or equal to 58', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 58 and greater than or equal to 47', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    57, 56, 55, 54, 53, 52, 51, 50,
                    49, 48, 47,
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

            it('returns Rank I for repetitions greater than or equal to 79', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 85,
                    83, 82, 81, 80, 79,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 79 and greater than or equal to 64', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 64 and greater than or equal to 51', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    63, 62, 61, 60,
                    59, 58, 57, 56, 55, 54, 53, 52, 51,
                ];

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

            it('returns Rank I for repetitions greater than or equal to 85', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 95, 90,
                    89, 88, 87, 86, 85,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 85 and greater than or equal to 69', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 69 and greater than or equal to 55', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58, 57, 56, 55,
                ];

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

            it('returns Rank I for repetitions greater than or equal to 91', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    110, 105, 100,
                    95, 94, 93, 92, 91,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 91 and greater than or equal to 73', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 73 and greater than or equal to 58', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                    59, 58,
                ];

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

            it('returns Rank I for repetitions greater than or equal to 96', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110, 105,
                    100, 99, 98, 97, 96,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 96 and greater than or equal to 77', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 77 and greater than or equal to 62', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62,
                ];

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

            it('returns Rank I for repetitions greater than or equal to 100', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110, 105,
                    104, 103, 102, 101, 100,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 100 and greater than or equal to 80', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 80 and greater than or equal to 64', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64,
                ];

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

            it('returns Rank I for repetitions greater than or equal to 104', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 115, 110,
                    108, 107, 106, 105, 104,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 104 and greater than or equal to 83', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 83 and greater than or equal to 66', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68, 67, 66,
                ];

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

            it('returns Rank I for repetitions greater than or equal to 106', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    130, 120, 115,
                    110, 109, 108, 107, 106,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 106 and greater than or equal to 85', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86, 85,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 85 and greater than or equal to 68', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69, 68,
                ];

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
        const timeout = 4000;

        describe(weightClasses.STRAWWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.STRAWWEIGHT;
            });

            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    52, 42, 33,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));

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
                    57, 46, 36,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));

                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });

            it('returns no rank for repetitions less than 40', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    39, 38, 37, 36, 35,
                    30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 43', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    42, 41, 40, 39, 38,
                    30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 47', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    46, 45, 44, 43, 42,
                    40, 30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 51', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    50, 49, 48, 47, 46,
                    40, 30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 55', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    54, 53, 52, 51, 50,
                    40, 30, 20, 10, 5, 1,
                ];

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

            it('returns 400 for valid repetitions', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    91, 73, 58,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => testError(params, 400));

                const results = await Promise.all(tests);
                const expected = true;
                results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.MIDDLEWEIGHT;
            });

            it('returns no rank for repetitions less than 58', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    57, 56, 55, 54, 53,
                    50, 40, 30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 62', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    61, 60, 59, 58, 57,
                    50, 40, 30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 64', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    63, 62, 61, 60, 59,
                    50, 40, 30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 66', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    65, 64, 63, 62, 61,
                    50, 40, 30, 20, 10, 5, 1,
                ];

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

            it('returns no rank for repetitions less than 68', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    67, 66, 65, 64, 63,
                    50, 40, 30, 20, 10, 5, 1,
                ];

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