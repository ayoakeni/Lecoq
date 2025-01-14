
import React, { useState } from "react";
import Opportunities from "../assets/images/opportunities.png";

const Admin = () => {
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "5 Sure-banker Reasons Why You Need French",
      author: "Busayo Akinjagunla",
      date: "Jan 10, 2025",
      image: Opportunities,
      views: 500,
      excerpt: "In our increasingly interconnected world, learning a new language can open doors to countless opportunities.",
    },
    {
      id: "2",
      title: "Unlocking Migration Opportunities",
      author: "Busayo Akinjagunla",
      date: "Jan 12, 2025",
      image: Opportunities,
      views: 700,
      excerpt: "Learning French is not just about mastering a language; it’s about unlocking new opportunities.",
    },
    {
      id: "1",
      title: "5 Sure-banker Reasons Why You Need French",
      author: "Busayo Akinjagunla",
      date: "Jan 10, 2025",
      image: Opportunities,
      views: 500,
      excerpt: "In our increasingly interconnected world, learning a new language can open doors to countless opportunities.",
    },
    {
      id: "2",
      title: "Unlocking Migration Opportunities",
      author: "Busayo Akinjagunla",
      date: "Jan 12, 2025",
      image: Opportunities,
      views: 700,
      excerpt: "Learning French is not just about mastering a language; it’s about unlocking new opportunities.",
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    id: "",
    title: "",
    author: "",
    date: "",
    views: 0,
    excerpt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.author || !newBlog.date) {
      alert("Please fill in all fields");
      return;
    }
    setBlogs([...blogs, { ...newBlog, id: `${blogs.length + 1}` }]);
    setNewBlog({ id: "", title: "", author: "", date: "", views: 0, excerpt: "" });
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="admin-page">
      <section className="add-blog">
        <h3>Add a New Blog</h3>
        <div className="inputbox">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>
        <div className="inputbox">
          <input
            type="date"
            name="date"
            value={newBlog.date}
            onChange={handleChange}
          />
          <input 
            type="file" 
            name="image"
            value={newBlog.image}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="excerpt"
          placeholder="Short Excerpt"
          value={newBlog.excerpt}
          onChange={handleChange}
        />
        <button onClick={handleAddBlog}>Add Blog</button>
      </section>

      <h3>Manage Blogs</h3>
      <section className="manage-blogs">
        {blogs.map((blog) => (
          <div className="blog-item" key={blog.id}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog-manage-Details">
              <div className="blog-manage-Meta">
                <li className="name-manage-Date">
                  <span className="blog-manage-title">{blog.title}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <span>{blog.date}</span>
                </li>
                <span className="views-manage-title">
                  <i className="fa-solid fa-eye"></i>{blog.views}
                </span>
              </div>
              <p className="blogExcerpt-manage">{blog.excerpt}</p>
              <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
