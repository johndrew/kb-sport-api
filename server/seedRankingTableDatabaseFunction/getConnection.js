const mysql = require('mysql2/promise');

const host = CONFIG.rankingTableDatabase.host;
const port = CONFIG.rankingTableDatabase.port;
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
