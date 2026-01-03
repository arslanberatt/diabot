require('dotenv').config();

const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,

  // Database (PostgreSQL)
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || 'mydb',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/diyabetcare',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD'];

const missingVars = requiredEnvVars.filter(
  (varName) => !process.env[varName] || process.env[varName] === ''
);

if (missingVars.length > 0 && env.NODE_ENV === 'production') {
  console.error('❌ Eksik environment değişkenleri:', missingVars.join(', '));
  process.exit(1);
}

module.exports = env;

