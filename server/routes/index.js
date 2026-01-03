const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const diabetesRoutes = require('./diabetesRoutes');
const blogRoutes = require('./blogRoutes');
const authRoutes = require('./authRoutes');
const { pool } = require('../config/database');
const { success, error } = require('../utils/response');
const { asyncHandler } = require('../middleware/validation');

// Health check
router.get('/', (req, res) => {
  success.ok(res, 'Server çalışıyor!', {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Database test endpoint
router.get('/test-db', asyncHandler(async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as version');
    success.ok(res, 'Veritabanı bağlantısı başarılı', result.rows[0]);
  } catch (err) {
    error.serverError(res, 'Veritabanı bağlantı hatası: ' + err.message);
  }
}));

// API routes
router.use('/users', userRoutes);
router.use('/diabetes', diabetesRoutes);
router.use('/blogs', blogRoutes);
router.use('/auth', authRoutes);

module.exports = router;

