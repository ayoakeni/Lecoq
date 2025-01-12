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
      author: "Author 1",
      date: "Jan 10, 2025",
      title: "Blog Post Title 1",
      excerpt: "This is a brief summary of blog post 1.",
      link: "/blog-post-1",
    },
    {
      image: Aceexam,
      author: "Author 2",
      date: "Jan 12, 2025",
      title: "Blog Post Title 2",
      excerpt: "This is a brief summary of blog post 2.",
      link: "/blog-post-2",
    },
    {
      image: Gplay,
      author: "Author 3",
      date: "Jan 14, 2025",
      title: "Blog Post Title 3",
      excerpt: "This is a brief summary of blog post 3.",
      link: "/blog-post-3",
    },
    {
      image: Gcontent,
      author: "Author 4",
      date: "Jan 16, 2025",
      title: "Blog Post Title 4",
      excerpt: "This is a brief summary of blog post 4.",
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
