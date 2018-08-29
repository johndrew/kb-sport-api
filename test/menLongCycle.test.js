const assert = require('assert');
const databaseClient = require('../server/databaseClient');
const {
  weightClass,
} = require('../server/util/enums');

describe('Men Long Cycle Unit Tests', () => {
  before(async () => {
    await databaseClient.setup();
  });

  after(async () => {
    await databaseClient.close();
  });

  let params;
  beforeEach(() => {
    params = {
      gender: 'men',
      event: 'Long Cycle',
    };
  });

  describe('Positive Tests', () => {
    describe('10 minute duration', () => {
      beforeEach(() => {
        params.duration = '10min';
      });

      describe('PRO Division', () => {
        beforeEach(() => {
          params.kettlebellWeight = 32;
        });

        describe(weightClass.BANTAMWEIGHT, () => {
          beforeEach(() => {
            params.weightClass = weightClass.BANTAMWEIGHT;
          }); 

          it('returns MSIC for repetitions greater than or equal to 52', async () => {
            const testRepetitions = [70, 65, 60, 55, 54, 53, 52];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'MSIC';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 52 and greater than or equal to 41', async () => {
            const testRepetitions = [51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'MS';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 41 and greater than or equal to 33', async () => {
            const testRepetitions = [40, 39, 38, 37, 36, 35, 34, 33];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'CMS';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 33 and greater than or equal to 26', async () => {
            const testRepetitions = [32, 31, 30, 29, 28, 27, 26];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'Rank I';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns null for repetitions less than 26', async () => {
            const testRepetitions = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = null;
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });
        });

        describe(weightClass.FEATHERWEIGHT, () => {
          beforeEach(() => {
            params.weightClass = weightClass.FEATHERWEIGHT;
          });

          it('returns MSIC for repetitions greater than or equal to 56', async () => {
            const testRepetitions = [70, 65, 60, 59, 58, 57, 56];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'MSIC';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns MS for repetitions less than 56 and greater than or equal to 45', async () => {
            const testRepetitions = [55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'MS';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns CMS for repetitions less than 45 and greater than or equal to 36', async () => {
            const testRepetitions = [44, 43, 42, 41, 40, 39, 38, 37, 36];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'CMS';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns Rank I for repetitions less than 36 and greater than or equal to 29', async () => {
            const testRepetitions = [35, 34, 33, 32, 31, 30, 29];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = 'Rank I';
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });

          it('returns null for repetitions less than 29', async () => {
            const testRepetitions = [
              28, 27, 26, 25, 24, 23, 22, 21, 20,
              19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
              9, 8, 7, 6, 5, 4, 3, 2, 1,
            ];

            const testParams = testRepetitions.map(rep => Object.assign({}, params, {
              repetitions: rep,
            }));

            const results = await databaseClient.getRankings(testParams);
            const expected = null;
            results.forEach((actual) => assert.strictEqual(actual, expected));
          });
        });
      });
    });
  });

  describe('Negative Tests', () => {
    // TBD
  });
});
