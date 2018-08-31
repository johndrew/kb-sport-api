const { ok } = require('assert');
const getConnection = require('../../../../server/seedRankingTableDatabaseFunction/getConnection');

describe(__filename, () => {
  describe('Positive Tests', () => {
    let connection;

    afterEach(() => {
      connection.close();
    });

    it('returns connection object', async () => {
      connection = await getConnection();
      const actual = connection;

      ok(actual);
    });
  });

  describe('Negative Tests', () => {
    // TBD
  });
});