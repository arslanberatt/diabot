const app = require('./app');
const env = require('./config/env');
const { testConnection, closePool } = require('./config/database');
const { connectMongoDB, closeMongoDB } = require('./config/mongodb');
const logger = require('./utils/logger');

// Start server
const server = app.listen(env.PORT, async () => {
  logger.success(`🚀 Server ${env.PORT} portunda çalışıyor`);
  logger.info(`📍 http://localhost:${env.PORT}`);
  logger.info(`🌍 Environment: ${env.NODE_ENV}`);

  // Test database connection
  await testConnection();
  
  // Connect MongoDB
  await connectMongoDB();
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  logger.warn(`${signal} sinyali alındı, server kapatılıyor...`);

  server.close(async () => {
    logger.info('HTTP server kapatıldı');
    await closePool();
    await closeMongoDB();
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Zorla kapatılıyor...');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  gracefulShutdown('unhandledRejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = server;

