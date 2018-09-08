const {
  ok,
  strictEqual,
} = require('assert');
const seedDatabase = require('../../seedDatabase');

describe(__filename, () => {
  describe('Positive Tests', () => {
    let clientStub;
    let queriesStub;

    beforeEach(() => {
      clientStub = {
        connect: async () => Promise.resolve(),
        query: async () => Promise.resolve(),
      };
      queriesStub = [];
    });

    it('resolves', async () => {
      await seedDatabase(clientStub, queriesStub);

      ok(true);
    });
  });

  describe('Negative Tests', () => {
    let clientStub;
    let queriesStub;

    beforeEach(() => {
      clientStub = {
        connect: () => {},
        query: async () => Promise.resolve(),
      };
      queriesStub = [];
    });

    it('throws an error if connection fails', async () => {
      const testError = new Error('test: connection fail');
      const client = Object.assign({}, clientStub, {
        connect: () => { throw testError; },
      });

      try {
        await seedDatabase(client, queriesStub);
        throw new Error('should not resolve');
      } catch (e) {
        strictEqual(e, testError)
      }
    });

    // FIXME: Error is not being thrown by Promise.all
    it.skip('throws an error if query fails', async () => {
      const testError = new Error('test: query fail');
      const client = Object.assign({}, clientStub, {
        query: async () => Promise.reject(testError),
      });

      try {
        await seedDatabase(client, queriesStub);
        throw new Error('should not resolve');
      } catch (e) {
        strictEqual(e, testError)
      }
    });
  });
});