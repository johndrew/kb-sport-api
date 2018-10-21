const mysql = require('mysql2/promise');

class DBClient {
    constructor(client) {
      this.client = client;
    }
  
    connect() {
      this.client.connect();
    }
  
    /**
     * Takes required parameters, bundles them into a SQL query, and executes query.
     *
     * @param {String} param0.eventType The name of an event.
     * @param {String} param0.duration The duration of the event.
     * @param {String} param0.gender The gender category of the lifter.
     * @param {String} param0.kettlebellWeight The kettlebell weight used by the lifter.
     * @param {String} param0.repetitions The number of valid repetitions the lifter performed.
     * @param {String} param0.weightCategory The weight category of the lifter.
     * @returns {Object} Result of SQL query
     */
    async query({
      eventType,
      duration,
      gender,
      kettlebellWeight,
      repetitions,
      weightCategory,
    } = {}) {
      const query = (fields) =>
        `SELECT RankingTypeName FROM RankingTypes LEFT JOIN RankingTable ON RankingTypes.PriorityWeight=RankingTable.Ranking WHERE ${fields} ORDER BY PriorityWeight LIMIT 1;`;
      const fields = [];
  
      fields.push(`MinimumRepetitions <= ${repetitions}`);
      fields.push(`EventType = "${eventType}"`);
      fields.push(`Duration = "${duration}"`);
      fields.push(`WeightCategory = "${weightCategory}"`);
      fields.push(`KettlebellWeight = ${kettlebellWeight}`);
      fields.push(`Gender = "${gender}"`);
      const allFields = fields.join(' AND ');
  
      const sql = query(allFields);
  
      const result = this.client.query(sql);

      const data = result && result[0] && result[0][0] && result[0][0].RankingTypeName;
      
    };
  
    async bulkQuery(params) {
      return Promise.all(this.query(params));
    }
  
    close() {
      this.client.close();
    }
  }
  
  /**
   * Returns a client to a MySQL AWS RDS instance. Uses special IAM RDS authentication.
   *
   * @param {String} host Instance of RDS MySQL.
   * @param {String} user Name of the user to connect with.
   * @param {String} database Name of the database to retrieve from.
   * @param {String} region Name of the region the instance is in.
   * @throws If RDS token cannot be retrieved.
   * @throws If RDS client cannot be made.
   * @returns {DBClient} An instance of DBClient.
   */
  module.exports = async function createClient({
    host,
    user,
    password,
    database,
  }) {
    console.info('Creating connection options');
    let options = {
      host,
      port: 3306,
      user,
      password,
      database,
    };
  
    console.info('Creating connection to database');
    const client = await mysql.createConnection(options);
  
    return new DBClient(client);
  };