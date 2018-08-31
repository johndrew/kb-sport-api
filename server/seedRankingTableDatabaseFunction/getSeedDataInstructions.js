const { readFile } = require('fs');
const { join } = require('path');

const dataFilePath = join(__dirname, '../../', 'dist/', 'data.sql');
const getSqlQueriesToSeedDB = async () => {
  return new Promise((resolve, reject) => {
    readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const queries = data.split(';');
        const cleanedQueries = queries.filter(query => query);
        resolve(cleanedQueries);
      }
    });
  });
};

module.exports = getSqlQueriesToSeedDB;
