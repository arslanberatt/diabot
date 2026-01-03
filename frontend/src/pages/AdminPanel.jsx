import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/admin/LoginForm";
import AuthInfoCards from "../components/admin/AuthInfoCards";
import BlogForm from "../components/admin/BlogForm";
import BlogList from "../components/admin/BlogList";

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); // true = login, false = register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
    readTime: "5 dk",
    tags: "",
    published: true,
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (token) {
      checkAuth();
      fetchBlogs();
    }
  }, [token]);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("adminToken");
        setToken("");
      }
    } catch (err) {
      localStorage.removeItem("adminToken");
      setToken("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.data?.token) {
        const newToken = data.data.token;
        setToken(newToken);
        localStorage.setItem("adminToken", newToken);
        setIsAuthenticated(true);
        fetchBlogs();
      } else {
        setError(data.message || "Giriş başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        // Register başarılı, otomatik login yap
        const loginResponse = await fetch(`${apiUrl}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const loginData = await loginResponse.json();
        if (loginResponse.ok && loginData.data?.token) {
          const newToken = loginData.data.token;
          setToken(newToken);
          localStorage.setItem("adminToken", newToken);
          setIsAuthenticated(true);
          fetchBlogs();
        }
      } else {
        setError(data.message || "Kayıt başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setIsAuthenticated(false);
    setBlogs([]);
    setShowForm(false);
    setEditingBlog(null);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      console.error("Bloglar yüklenemedi:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    try {
      const url = editingBlog
        ? `${apiUrl}/api/blogs/${editingBlog._id}`
        : `${apiUrl}/api/blogs`;
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowForm(false);
        setEditingBlog(null);
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          image: "",
          category: "",
          author: "",
          readTime: "5 dk",
          tags: "",
          published: true,
        });
        fetchBlogs();
      } else {
        setError(data.message || "İşlem başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image || "",
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime || "5 dk",
      tags: blog.tags?.join(", ") || "",
      published: blog.published !== undefined ? blog.published : true,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Bu blogu silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`${apiUrl}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        setError("Silme işlemi başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <LoginForm
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          loading={loading}
          error={error}
        />
        <AuthInfoCards />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingBlog(null);
                setFormData({
                  title: "",
                  excerpt: "",
                  content: "",
                  image: "",
                  category: "",
                  author: "",
                  readTime: "5 dk",
                  tags: "",
                  published: true,
                });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              {showForm ? "İptal" : "+ Yeni Blog"}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-semibold"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <BlogForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            editingBlog={editingBlog}
          />
        )}

        <BlogList
          blogs={blogs}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
      <Footer />
    </div>
  );
}

export default AdminPanel;

