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
        gender: genders.WOMEN,
        eventType: eventTypes.LONG_CYCLE,
        duration: durations.TEN,
        kettlebellWeight: kettlebellWeights.EIGHT,
      };
    });

    describe('Positive Tests', () => {
        const timeout = 4000;

        describe(weightClasses.STRAWWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.STRAWWEIGHT;
            });

            it('returns Rank I for repetitions greater than or equal to 65');
            
            it('returns Rank II for repetitions less than 65 and greater than or equal to 52');
            
            it('returns Rank III for repetitions less than 52 and greater than or equal to 42');
        });

        describe(weightClasses.FLYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FLYWEIGHT;
            });

            it('returns Rank I for repetitions greater than or equal to 70');
            
            it('returns Rank II for repetitions less than 70 and greater than or equal to 56');
            
            it('returns Rank III for repetitions less than 56 and greater than or equal to 45');
        });

        describe(weightClasses.BANTAMWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.BANTAMWEIGHT;
            });

            it('returns Rank I for repetitions greater than or equal to 75', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    100, 90, 80,
                    79, 78, 77, 76, 75,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 75 and greater than or equal to 60', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 60 and greater than or equal to 48', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    59, 58, 57, 56, 55, 54, 53, 52, 51, 50,
                    49, 48,
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

            it('returns Rank I for repetitions greater than or equal to 80', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    110, 100, 90,
                    84, 83, 82, 81, 80,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 80 and greater than or equal to 64', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
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

        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });

            it('returns Rank I for repetitions greater than or equal to 86', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110, 100,
                    90, 89, 88, 87, 86,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 86 and greater than or equal to 69', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    85, 84, 83, 82, 81, 80,
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

        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });

            it('returns Rank I for repetitions greater than or equal to 93', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    120, 110, 100,
                    97, 96, 95, 94, 93,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 93 and greater than or equal to 75', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    92, 91, 90,
                    89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 75 and greater than or equal to 60', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    74, 73, 72, 71, 70,
                    69, 68, 67, 66, 65, 64, 63, 62, 61, 60,
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

            it('returns Rank I for repetitions greater than or equal to 100', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    130, 120, 110,
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

        describe(weightClasses.SUPER_WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_WELTERWEIGHT;
            });

            throw new Error('FIXME: have not fixed negative tests. fix dem');

            it('returns Rank I for repetitions greater than or equal to 107', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    140, 130, 120,
                    111, 110, 109, 108, 107,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_I;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank II for repetitions less than 107 and greater than or equal to 86', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    106, 105, 104, 103, 102, 101, 100,
                    99, 98, 97, 96, 95, 94, 93, 92, 91, 90,
                    89, 88, 87, 86,
                ];

                const tests = testRepetitions.map(rep => Object.assign({}, params, {
                    repetitions: rep,
                })).map(params => getRankingLocal(params));

                const results = await Promise.all(tests);
                const expected = rankings.RANK_II;
                results.forEach(({ ranking: actual }) => strictEqual(actual, expected));
            });

            it('returns Rank III for repetitions less than 86 and greater than or equal to 69', async function i() {
                this.timeout(timeout);

                const testRepetitions = [
                    85, 84, 83, 82, 81, 80,
                    79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
                    69,
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
                    65, 52, 42,
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
                    70, 56, 45,
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

            it('returns 404 for repetitions less than 48', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                47, 46, 45, 44, 43,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.FEATHERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.FEATHERWEIGHT;
            });

            it('returns 404 for repetitions less than 51', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                50, 49, 48, 47, 46,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.LIGHTWEIGHT;
            });

            it('returns 404 for repetitions less than 55', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                54, 53, 52, 51, 50,
                40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_LIGHTWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_LIGHTWEIGHT;
            });

            it('returns 404 for repetitions less than 60', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                59, 58, 57, 56, 55,
                50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.WELTERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.WELTERWEIGHT;
            });

            it('returns 404 for repetitions less than 64', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                63, 62, 61, 60, 59,
                50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
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
                    107, 86, 69,
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

            it('returns 404 for repetitions less than 69', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                68, 67, 66, 65, 64,
                60, 50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_MIDDLEWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_MIDDLEWEIGHT;
            });

            it('returns 404 for repetitions less than 72', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                71, 70, 69, 68, 67,
                60, 50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.CRUISERWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.CRUISERWEIGHT;
            });

            it('returns 404 for repetitions less than 75', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                74, 73, 72, 71, 70,
                60, 50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.HEAVYWEIGHT;
            });

            it('returns 404 for repetitions less than 78', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                77, 76, 75, 74, 73,
                70, 60, 50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });

        describe(weightClasses.SUPER_HEAVYWEIGHT, () => {
            beforeEach(() => {
                params.weightCategory = weightClasses.SUPER_HEAVYWEIGHT;
            });

            it('returns 404 for repetitions less than 80', async function i() {
              this.timeout(timeout);
      
              const testRepetitions = [
                79, 78, 77, 76, 75,
                70, 60, 50, 40, 30, 20, 10, 5, 1,
              ];
      
              const tests = testRepetitions.map(rep => Object.assign({}, params, {
                repetitions: rep,
              })).map(params => testError(params, 404));
      
              const results = await Promise.all(tests);
              const expected = true;
              results.forEach((actual) => strictEqual(actual, expected));
            });
        });
    });
});