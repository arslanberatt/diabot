const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Joi = require('joi');
const { validate } = require('../middleware/validation');

// Validation schemas
const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'İsim en az 2 karakter olmalıdır',
    'string.max': 'İsim en fazla 100 karakter olabilir',
    'any.required': 'İsim alanı zorunludur',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Geçerli bir email adresi giriniz',
    'any.required': 'Email alanı zorunludur',
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
}).min(1).messages({
  'object.min': 'En az bir alan güncellenmelidir',
});

// Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

