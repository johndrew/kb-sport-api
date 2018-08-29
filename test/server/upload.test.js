const assert = require('assert');
const upload = require('../../server/upload');

describe.skip('Upload Unit Tests', () => {
  describe('Positive Tests', () => {
    it('Uploads does not crash', async () => {
      await upload();
      assert.ok(true);
    });
  });
});