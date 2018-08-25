const assert = require('assert');
const databaseClient = require('./util/databaseClient');

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

        describe('Bantamweight', () => {
          beforeEach(() => {
            params.weightClass = 'Bantamweight';
          });

          it('returns MSIC for repetitions greater than 52', async () => {
            params.repetitions = 53;

            const actual = await databaseClient.getRanking(params);
            const expected = 'MSIC';

            assert.strictEqual(actual, expected);
          });

          it('returns MSIC for repetitions equal to 52', async () => {
            params.repetitions = 52;

            const actual = await databaseClient.getRanking(params);
            const expected = 'MSIC';

            assert.strictEqual(actual, expected);
          });
        });
      });
    });
  });

  describe('Negative Tests', () => {
    // TBD
  });
});
