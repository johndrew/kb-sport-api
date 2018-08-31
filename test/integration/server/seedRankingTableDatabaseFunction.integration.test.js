const {
  ok,
} = require('assert');
const seedRankingTableDatabase = require('../../../server/seedRankingTableDatabaseFunction');

describe(__filename, () => {
  describe('Positive Tests', () => {
    it('resolves', async () => {
      await seedRankingTableDatabase();

      ok(true);
    });
  });

  describe('Negative Tests', () => {
    // TBD
  });
});