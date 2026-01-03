const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/response');
const { asyncHandler } = require('../middleware/validation');
const env = require('../config/env');

/**
 * Kullanıcı kaydı (basit - admin panel için)
 */
const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return error.badRequest(res, 'Kullanıcı adı ve şifre gereklidir');
  }

  // Kullanıcı zaten var mı kontrol et
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return error.conflict(res, 'Bu kullanıcı adı zaten kullanılıyor');
  }

  const user = new User({
    username,
    password,
    role: 'user',
  });

  await user.save();

  success.created(res, 'Kullanıcı başarıyla oluşturuldu', {
    id: user._id,
    username: user.username,
    role: user.role,
  });
});

/**
 * Kullanıcı girişi
 */
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return error.badRequest(res, 'Kullanıcı adı ve şifre gereklidir');
  }

  const user = await User.findOne({ username });
  if (!user) {
    return error.unauthorized(res, 'Kullanıcı adı veya şifre hatalı');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return error.unauthorized(res, 'Kullanıcı adı veya şifre hatalı');
  }

  // JWT token oluştur
  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  success.ok(res, 'Giriş başarılı', {
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
});

/**
 * Token doğrulama middleware için yardımcı fonksiyon
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};

