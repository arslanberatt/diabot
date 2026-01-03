import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StatisticsBar from "../components/StatisticsBar";
import AboutUsSection from "../components/AboutUsSection";
import BlogsSection from "../components/BlogsSection";
import Footer from "../components/Footer";

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/blogs?published=true&limit=2`);
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
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <StatisticsBar />
        <AboutUsSection />
        <BlogsSection blogs={blogs} />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
