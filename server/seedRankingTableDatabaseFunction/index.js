const getConnection = require('./getConnection');
const getSqlQueries = require('./getSeedDataInstructions');
const seedDatabase = require('./seedDatabase');
const logger = require('../../logger');

const seedRankingTableDatabase = async () => {
  logger.info('Setting up db client');
  const connection = await getConnection();

  try {
    logger.info('Reading database creation file');
    const queries = await getSqlQueries();
  
    logger.info('Creating database');
    await seedDatabase(connection, queries);
  } catch (e) {
    throw e;
  } finally {
    logger.info('Database created');
    await connection.close();
  }
};

module.exports = seedRankingTableDatabase;
