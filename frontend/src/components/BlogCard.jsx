import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  // Yazarın baş harflerini al
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link 
      to={`/blog/${blog.id || blog._id}`}
      className="bg-white rounded-md mb-8"
    >
      <div className="relative">
        <img 
          src={blog.image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop"} 
          alt={blog.title} 
          className="w-full h-60 object-cover rounded-md"
        />
      </div>
      <div className="py-6 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 min-h-16">{blog.title}</h3>
        <p className="text-gray-700 leading-relaxed mb-4 text-lg line-clamp-3">
          {blog.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags && blog.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author & Date */}
        <div className="flex items-center gap-3 mt-6">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
            {getInitials(blog.author)}
          </div>
          <div>
            <p className="text-gray-900 font-medium">{blog.author}</p>
            <p className="text-gray-500 text-sm">{blog.date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
