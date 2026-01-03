const { error } = require('../utils/response');
const { verifyToken } = require('../controllers/authController');

/**
 * JWT token doğrulama middleware
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error.unauthorized(res, 'Token bulunamadı');
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return error.unauthorized(res, 'Geçersiz token');
  }

  req.user = decoded;
  next();
};

/**
 * Admin kontrolü (opsiyonel - şimdilik herkes yazabilir)
 */
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  // Şimdilik herkes yazabilsin
  next();
};

module.exports = {
  authenticate,
  requireAdmin,
};

