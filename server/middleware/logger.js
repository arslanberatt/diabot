const morgan = require('morgan');
const logger = require('../utils/logger');

// Custom morgan format
const morganFormat = ':method :url :status :response-time ms - :res[content-length]';

// Request logger middleware
const requestLogger = morgan(morganFormat, {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});

module.exports = requestLogger;

