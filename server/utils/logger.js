const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const getTimestamp = () => {
  return new Date().toISOString();
};

const logger = {
  info: (message, meta = {}) => {
    console.log(
      `${colors.cyan}[INFO]${colors.reset} ${getTimestamp()} - ${message}`,
      Object.keys(meta).length > 0 ? meta : ''
    );
  },

  error: (message, meta = {}) => {
    console.error(
      `${colors.red}[ERROR]${colors.reset} ${getTimestamp()} - ${message}`,
      Object.keys(meta).length > 0 ? meta : ''
    );
  },

  warn: (message, meta = {}) => {
    console.warn(
      `${colors.yellow}[WARN]${colors.reset} ${getTimestamp()} - ${message}`,
      Object.keys(meta).length > 0 ? meta : ''
    );
  },

  success: (message, meta = {}) => {
    console.log(
      `${colors.green}[SUCCESS]${colors.reset} ${getTimestamp()} - ${message}`,
      Object.keys(meta).length > 0 ? meta : ''
    );
  },
};

module.exports = logger;

