const { Pool } = require('pg');
const env = require('./env');

// PostgreSQL connection pool
const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ PostgreSQL veritabanına başarıyla bağlandı');
});

pool.on('error', (err) => {
  console.warn('⚠️ PostgreSQL bağlantı hatası (opsiyonel):', err.message);
  // Server'ı kapatma, sadece uyarı ver
});

// Test connection function
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as version');
    console.log('📊 Veritabanı bağlantı testi başarılı:', result.rows[0].current_time);
    return true;
  } catch (error) {
    console.warn('⚠️ Veritabanı bağlantı testi başarısız (opsiyonel):', error.message);
    console.warn('⚠️ Server database olmadan çalışmaya devam ediyor...');
    return false;
  }
};

// Graceful shutdown
const closePool = async () => {
  try {
    await pool.end();
    console.log('🔌 PostgreSQL bağlantı havuzu kapatıldı');
  } catch (error) {
    console.error('❌ Bağlantı havuzu kapatılırken hata:', error.message);
  }
};

module.exports = {
  pool,
  testConnection,
  closePool,
};

