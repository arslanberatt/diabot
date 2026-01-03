const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { authenticate, requireAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes (herkes yazabilir - authenticate gerekli)
router.post('/', authenticate, createBlog);
router.put('/:id', authenticate, updateBlog);
router.delete('/:id', authenticate, deleteBlog);

module.exports = router;

