import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${id}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
      } else {
        navigate("/blog");
      }
    } catch (err) {
      console.error("Blog yüklenemedi:", err);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Format date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">
                Ana Sayfa
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900">{blog.title}</span>
            </div>
          </nav>
          <div className="mb-8">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {blog.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">
                    {blog.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
                <span>{blog.author}</span>
              </div>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{blog.readTime || "5 dk"} okuma</span>
            </div>
          </div>
          {blog.image && (
            <div className="mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          )}
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Bu yazıyı paylaş
            </h3>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Facebook
              </button>
              <button className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition">
                Twitter
              </button>
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition">
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BlogDetail;
