const assert = require('assert');
const databaseClient = require('../../../server/dataValidationFunction/databaseClient');
const seedRankingTableDatabase = require('../../../server/seedRankingTableDatabaseFunction');

describe(__filename, () => {
  describe('when setting up the database', () => {
    afterEach(async () => {
      await seedRankingTableDatabase();
      await databaseClient.close();
    });

    it('authenticates properly', async () => {
      await databaseClient.setup();
      assert.ok(true);
    });
  });
});
