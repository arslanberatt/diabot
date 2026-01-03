const userModel = require('../models/userModel');
const { success, error } = require('../utils/response');
const { AppError } = require('../middleware/errorHandler');
const { asyncHandler } = require('../middleware/validation');

const userController = {
  // Get all users
  getAllUsers: asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    const users = await userModel.findAll(limit, offset);
    const total = await userModel.count();

    success.ok(res, 'Kullanıcılar başarıyla getirildi', users, {
      total,
      limit,
      offset,
    });
  }),

  // Get user by ID
  getUserById: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return error.notFound(res, 'Kullanıcı bulunamadı');
    }

    success.ok(res, 'Kullanıcı başarıyla getirildi', user);
  }),

  // Create user
  createUser: asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    // Check if email already exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return error.conflict(res, 'Bu email adresi zaten kullanılıyor');
    }

    const user = await userModel.create(name, email);
    success.created(res, 'Kullanıcı başarıyla oluşturuldu', user);
  }),

  // Update user
  updateUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    // Check if user exists
    const existingUser = await userModel.findById(id);
    if (!existingUser) {
      return error.notFound(res, 'Kullanıcı bulunamadı');
    }

    // Check if email is being changed and if new email already exists
    if (email && email !== existingUser.email) {
      const emailExists = await userModel.findByEmail(email);
      if (emailExists) {
        return error.conflict(res, 'Bu email adresi zaten kullanılıyor');
      }
    }

    const user = await userModel.update(id, name, email);
    success.ok(res, 'Kullanıcı başarıyla güncellendi', user);
  }),

  // Delete user
  deleteUser: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await userModel.delete(id);

    if (!user) {
      return error.notFound(res, 'Kullanıcı bulunamadı');
    }

    success.ok(res, 'Kullanıcı başarıyla silindi', user);
  }),
};

module.exports = userController;

