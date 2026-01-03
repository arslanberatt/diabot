import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import BlogsList from "../components/BlogsList";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs?published=true`);
      const data = await response.json();
      if (data.success) {
        // MongoDB'den gelen blogları formatla
        const formattedBlogs = data.data.map((blog) => ({
          id: blog._id,
          title: blog.title,
          excerpt: blog.excerpt,
          image: blog.image || "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
          date: new Date(blog.createdAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          category: blog.category,
          author: blog.author,
          readTime: blog.readTime || "5 dk",
          tags: blog.tags || [],
        }));
        setBlogs(formattedBlogs);
      }
    } catch (err) {
      console.error("Bloglar yüklenemedi:", err);
      // Fallback: boş array
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <PageHero
          title="Blog"
          subtitle="Diyabet hakkında güncel bilgiler, ipuçları ve uzman görüşleri."
        />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        title="Blog"
        subtitle="Diyabet hakkında güncel bilgiler, ipuçları ve uzman görüşleri."
      />

      <BlogsList blogs={blogs} />

      <Footer />
    </div>
  );
}

export default Blogs;
