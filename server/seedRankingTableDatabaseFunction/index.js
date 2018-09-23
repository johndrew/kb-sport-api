const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');

/**
 * Returns a client to a MySQL AWS RDS instance. Uses special IAM RDS authentication.
 *
 * @param {String} host Instance of RDS MySQL.
 * @param {String} user Name of the user to connect with.
 * @param {String} database Name of the database to retrieve from.
 * @param {String} region Name of the region the instance is in.
 * @throws If RDS token cannot be retrieved.
 * @throws If RDS client cannot be made.
 */
const createClient = async (host, user, region) => {
  const signer = new AWS.RDS.Signer();
  console.info('Retrieving access token');
  const token = await new Promise((resolve, reject) => {
    signer.getAuthToken({
      region,
      hostname: host,
      port: 3306,
      username: user
    }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    })
  });

  console.info('Creating connection to database');
  return mysql.createConnection({
    host,
    port: 3306,
    user,
    password: token,
    ssl: 'Amazon RDS',
    authSwitchHandler: (data, callback) => {
      if (data.pluginName === 'mysql_clear_password') {
        callback(null, Buffer.from(token + '\0'));
      }
    }
  });
};

/**
 * Retrieves a seed file from S3 and converts it to a string.
 * Seed file should be written in SQL.
 * 
 * @returns {String} SQL seed file.
 */
const getSQLSeedFile = async () => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'johndrew-kb-sport',
    Key: 'rankingTable/data.sql',
  };
  const getDataAsString = data => data.Body.toString('utf8');

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(getDataAsString(data));
      }
    });
  });
};

/**
 * Returns SQL queries in data as a list.
 * Each query should be a separate item.
 *
 * @param {String} sqlData SQL seed file.
 * @returns {Array} List of SQL queries.
 */
const getQueriesAsList = (sqlData) => {
  const queries = sqlData.split(';');
  const cleanedQueries = queries.filter(query => query);

  return cleanedQueries;
};

/**
 * Seeds the database with the given queries.
 *
 * @param {Object} connection RDS MySQL client.
 * @param {Array} queries List of SQL queries.
 */
const seedDatabase = async (connection, queries) => {
  console.info('Connecting to database');
  connection.connect();

  await Promise.all(queries.map((query) => {
    console.log('Query:', query);
    return connection.query(query);
  }));
};

exports.handler = async (event, context) => {
  console.info('Setting up db client');
  const host = 'kbsportrankingtable2018.c88tulh6irue.us-west-2.rds.amazonaws.com';
  const user = 'taylor';
  const region = 'us-west-2';
  const connection = await createClient(host, user, region);

  try {
    console.info('Reading database creation file');
    const sqlData = await getSQLSeedFile(); 
    const queries = getQueriesAsList(sqlData);

    console.info('Creating database');
    await seedDatabase(connection, queries);

    return 'Successfully seeded database';
  } catch (e) {
    console.error(e);
    throw new Error('Could not seed database');
  } finally {
    console.info('Closing database connect');
    await connection.close();
  }
};
