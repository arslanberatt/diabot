import { Link } from "react-router-dom";

function BlogsSection({ blogs }) {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6 bg-white relative">
                <div className="absolute -top-4 left-6 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                  {blog.category}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;
