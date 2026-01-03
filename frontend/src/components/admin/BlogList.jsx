function BlogList({ blogs, handleEdit, handleDelete }) {
  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bloglar</h2>
        <p className="text-gray-600">Henüz blog yok.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bloglar</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                  {!blog.published && (
                    <>
                      <span>•</span>
                      <span className="text-orange-600 font-semibold">
                        Taslak
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;

