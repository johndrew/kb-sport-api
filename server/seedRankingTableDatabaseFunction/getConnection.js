const mysql = require('mysql2/promise');
const config = require('config');

const host = config.get('rankingTableDatabase.host');
const port = config.get('rankingTableDatabase.port');
const user = 'root';
const password = 'password';

const getConnection = async () => {
  return mysql.createConnection({
    host,
    port,
    user,
    password,
  });
};

module.exports = getConnection;
