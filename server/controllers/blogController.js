const Blog = require('../models/Blog');
const { success, error } = require('../utils/response');
const { asyncHandler } = require('../middleware/validation');

/**
 * Tüm blogları getir
 */
const getAllBlogs = asyncHandler(async (req, res) => {
  const { published, limit, skip } = req.query;
  
  const query = {};
  if (published !== undefined) {
    query.published = published === 'true';
  }

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit) || 100)
    .skip(parseInt(skip) || 0);

  success.ok(res, 'Bloglar başarıyla getirildi', blogs);
});

/**
 * Tek bir blog getir
 */
const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const blog = await Blog.findById(id);
  
  if (!blog) {
    return error.notFound(res, 'Blog bulunamadı');
  }

  success.ok(res, 'Blog başarıyla getirildi', blog);
});

/**
 * Yeni blog oluştur
 */
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    content,
    image,
    category,
    author,
    readTime,
    tags,
    published,
  } = req.body;

  // Validation
  if (!title || !excerpt || !content || !category || !author) {
    return error.badRequest(res, 'Başlık, özet, içerik, kategori ve yazar alanları gereklidir');
  }

  const blog = new Blog({
    title,
    excerpt,
    content,
    image: image || '',
    category,
    author,
    readTime: readTime || '5 dk',
    tags: tags || [],
    published: published !== undefined ? published : true,
  });

  await blog.save();

  success.created(res, 'Blog başarıyla oluşturuldu', blog);
});

/**
 * Blog güncelle
 */
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const blog = await Blog.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  if (!blog) {
    return error.notFound(res, 'Blog bulunamadı');
  }

  success.ok(res, 'Blog başarıyla güncellendi', blog);
});

/**
 * Blog sil
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return error.notFound(res, 'Blog bulunamadı');
  }

  success.ok(res, 'Blog başarıyla silindi', null);
});

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

