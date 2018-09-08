const { ok } = require('assert');
const getSeedDataInstructions =
  require('../../getSeedDataInstructions');

describe(__filename, () => {
  describe('Positive Tests', () => {
    it('returns instructions', async () => {
      const actual = await getSeedDataInstructions();

      ok(actual);
    });

    it('removes falsy values', async () => {
      const result = await getSeedDataInstructions();

      result.forEach(actual => ok(actual));
    });
  });

  describe('Negative Tests', () => {
    // TBD
  });
});