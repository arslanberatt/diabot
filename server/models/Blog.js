const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  readTime: {
    type: String,
    default: '5 dk',
  },
  tags: {
    type: [String],
    default: [],
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt before save
blogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Format date for display
blogSchema.virtual('date').get(function () {
  const date = this.createdAt;
  const months = [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
});

blogSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

