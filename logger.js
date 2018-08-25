const bunyan = require('bunyan');
const bunyanFormat = require('bunyan-format');
const { name } = require('./package.json');

const logLevel = 'debug';
const format = bunyanFormat({ outputMode: 'short', levelInString: true });
const logger = bunyan.createLogger({
  name,
  streams: [
    {
      level: logLevel,
      stream: format,
    },
  ],
});

module.exports = logger;
