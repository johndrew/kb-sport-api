const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const logger = require('../logger');

const upload = async () => {
  let connection;


  logger.info('Setting up db client');
  connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'that70sshow',
  });

  try {
    logger.info('Connecting to database');
    connection.connect();

    logger.info('Reading database creation file');
    const dataFilePath = path.join(__dirname, '../', 'dist/', 'data.sql');
    const data = await new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  
    logger.info('Creating database');
    const queries = data.split(';');
    const queryPromises = queries.map((query) => connection.query(query));
    await Promise.all(queryPromises);
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
