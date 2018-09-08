const getConnection = require('./getConnection');
const getSqlQueries = require('./getSeedDataInstructions');
const seedDatabase = require('./seedDatabase');

const seedRankingTableDatabase = async () => {
  console.info('Setting up db client');
  const connection = await getConnection();

  try {
    console.info('Reading database creation file');
    const queries = await getSqlQueries();
  
    console.info('Creating database');
    await seedDatabase(connection, queries);
  } catch (e) {
    throw e;
  } finally {
    console.info('Database created');
    await connection.close();
  }
};

module.exports = seedRankingTableDatabase;
