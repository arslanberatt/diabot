const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

// MongoDB bağlantısı
const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.success('✅ MongoDB bağlantısı başarılı');
    return true;
  } catch (error) {
    logger.warn('⚠️ MongoDB bağlantı hatası (opsiyonel):', error.message);
    logger.warn('⚠️ Server MongoDB olmadan çalışmaya devam ediyor...');
    return false;
  }
};

// Bağlantı event'leri
mongoose.connection.on('connected', () => {
  logger.info('📊 MongoDB bağlandı');
});

mongoose.connection.on('error', (err) => {
  logger.warn('⚠️ MongoDB bağlantı hatası:', err.message);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('⚠️ MongoDB bağlantısı kesildi');
});

// Graceful shutdown
const closeMongoDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('🔌 MongoDB bağlantısı kapatıldı');
  } catch (error) {
    logger.error('❌ MongoDB kapatılırken hata:', error.message);
  }
};

module.exports = {
  connectMongoDB,
  closeMongoDB,
};

