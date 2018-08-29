const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const logger = require('../logger');

const dataFilePath = path.join(__dirname, '../', 'dist/', 'data.sql');
const getSqlQueriesToSeedDB = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.split(';'));
      }
    });
  });
};
const upload = async () => {
  let connection;

  logger.info('Setting up db client');
  connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
  });

  try {
    logger.info('Connecting to database');
    connection.connect();

    logger.info('Reading database creation file');
    const queries = await getSqlQueriesToSeedDB(dataFilePath);
  
    logger.info('Creating database');
    await Promise.all(queries.map((query) => connection.query(query)));
  } catch (e) {
    // mysql2 will spit out this error if the query doesn't return anything. Since this query is
    // to setup the tables and seed them with data from the ranking table, this is ok.
    if (e.message === 'Query was empty') {
      logger.info('Query is ok');
    } else {
      throw e;
    }
  } finally {
    logger.info('Database created');
    await connection.close();
  }
};

module.exports = upload;
