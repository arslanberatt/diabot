const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const requestLogger = require('./middleware/logger');

// Initialize Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Health check root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server çalışıyor!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;

