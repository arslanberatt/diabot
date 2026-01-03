const logger = require('../utils/logger');

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(`Error: ${err.message}`, {
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  // PostgreSQL error handling
  if (err.code === '23505') {
    // Unique violation
    const message = 'Bu kayıt zaten mevcut';
    error = new AppError(message, 409);
  } else if (err.code === '23503') {
    // Foreign key violation
    const message = 'İlişkili kayıt bulunamadı';
    error = new AppError(message, 400);
  } else if (err.code === '23502') {
    // Not null violation
    const message = 'Zorunlu alanlar eksik';
    error = new AppError(message, 400);
  }

  // Default error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Sunucu hatası';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// 404 handler
const notFound = (req, res, next) => {
  const error = new AppError(`Endpoint bulunamadı: ${req.originalUrl}`, 404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound,
  AppError,
};

