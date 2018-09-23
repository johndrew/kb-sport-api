const seedRankingTableDatabase = require('./seedRankingTableDatabaseFunction');

exports.upload = async (event, context) => {
  if (event == null) {
    throw new Error('"event" object is missing');
  }
  logger.info('Received event:', JSON.stringify(event));
  logger.info('Received context:', JSON.stringify(context));

  return seedRankingTableDatabase();
};

exports.data