import React from "react";
// Import images
import Gcontent from "../assets/images/Globalcontent.png";
import Gplay from "../assets/images/Globalplayer.png";
import Aceexam from "../assets/images/Aceexam.png";
import Opportunities from "../assets/images/opportunities.png";

const Blog = ({  }) => {
  const blogs = [
    {
      image: Opportunities,
      author: "Busayo Akinjagunla",
      date: "Jan 10, 2025",
      title: "5 Sure-banker reasons why you need French",
      excerpt: "In our increasingly interconnected world, learning a new language can open doors to countless opportunities. Among the many languages you could choose to study, French stands out as a particularly valuable option. Here are five compelling reasons why learning French is important.",
      link: "/blog-post-1",
    },
    {
      image: Aceexam,
      author: "Busayo Akinjagunla",
      date: "Jan 12, 2025",
      title: "Unlocking Migration Opportunities",
      excerpt: "Learning French is not just about mastering a language; it’s about unlocking new opportunities, enriching your cultural experiences, and enhancing your cognitive abilities. Whether you’re looking to advance your career, travel the world, or simply appreciate the beauty of a new language, French offers countless benefits that make it a worthwhile endeavor. So, why not take the plunge and start your journey into the French language today?",
      link: "/blog-post-2",
    },
    {
      image: Gplay,
      author: "Busayo Akinjagunla",
      date: "Jan 14, 2025",
      title: "5 Sure-banker reasons why you need French",
      excerpt: "In our increasingly interconnected world, learning a new language can open doors to countless opportunities. Among the many languages you could choose to study, French stands out as a particularly valuable option. Here are five compelling reasons why learning French is important.",
      link: "/blog-post-3",
    },
    {
      image: Gcontent,
      author: "Busayo Akinjagunla",
      date: "Jan 16, 2025",
      title: "Unlocking Migration Opportunities",
      excerpt: "Learning French is not just about mastering a language; it’s about unlocking new opportunities, enriching your cultural experiences, and enhancing your cognitive abilities. Whether you’re looking to advance your career, travel the world, or simply appreciate the beauty of a new language, French offers countless benefits that make it a worthwhile endeavor. So, why not take the plunge and start your journey into the French language today?",
      link: "/blog-post-4",
    },
  ];
  
  return (
    <section className="blog-grid">
      {blogs.map((blog, index) => (
        <div className="blogPost" key={index}>
          <img src={blog.image} alt={blog.title} className="blogImage" />
          <div className="blogDetails">
            <ul className="blogMeta">
              <li className="blogAuthor">{blog.author}</li>
              <li className="blogDate">{blog.date}</li>
            </ul>
            <strong className="blogTitle">{blog.title}</strong>
            <p className="blogExcerpt">{blog.excerpt}</p>
            <button
              className="readButton"
              onClick={() => (window.location.href = blog.link)}
            >
              Read
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Blog;
