import { Link } from 'react-router-dom';

function PopularPostsSidebar({ blogs }) {
  // Kategorilere göre grupla
  const groupedByCategory = blogs.reduce((acc, blog) => {
    const category = blog.category || 'Genel';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(blog);
    return acc;
  }, {});

  return (
    <aside className="w-full lg:w-80">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Popüler Yazılar</h2>
      
      <div className="space-y-8">
        {Object.entries(groupedByCategory).map(([category, categoryBlogs]) => (
          <div key={category} className="mb-8">
            <h3 className="text-md font-bold text-gray-900 mb-4 uppercase">
              {category}
            </h3>
            <div className="space-y-4">
              {categoryBlogs.slice(0, 3).map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="flex gap-3 group"
                >
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium text-sm leading-snug group-hover:text-blue-600 transition">
                      {blog.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default PopularPostsSidebar;

