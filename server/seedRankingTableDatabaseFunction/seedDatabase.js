const logger = require('../../logger');

const seedDatabase = async (client, queries) => {
  logger.info('Connecting to database');
  client.connect();

  logger.info('Creating database');
  await Promise.all(queries.map((query) => client.query(query)));
};

module.exports = seedDatabase;
