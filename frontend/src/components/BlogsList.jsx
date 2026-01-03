import BlogCard from './BlogCard';
import PopularPostsSidebar from './PopularPostsSidebar';

function BlogsList({ blogs }) {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
          
          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1">
            <PopularPostsSidebar blogs={blogs} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default BlogsList;
