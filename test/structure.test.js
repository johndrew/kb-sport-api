const assert = require('assert');
const databaseClient = require('../server/databaseClient');

describe('Structure Unit Tests', () => {
  describe('when setting up the database', () => {
    afterEach(async () => {
      await databaseClient.close();
    });

    it('authenticates properly', async () => {
      await databaseClient.setup();
      assert.ok(true);
    });
  });
});
