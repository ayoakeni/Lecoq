import React, { useState, useCallback } from "react";
import DOMPurify from "dompurify";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Opportunities from "../assets/images/opportunities.png";
import TextEditor from "../components/TextEditor";

const Admin = () => {
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "5 Sure-banker Reasons Why You Need French",
      author: "Busayo Akinjagunla",
      date: "2025-01-10",
      image: Opportunities,
      views: 500,
      excerpt: "In our increasingly interconnected world, learning a new language can open doors to countless opportunities.",
    },
    {
      id: "2",
      title: "Unlocking Migration Opportunities",
      author: "Busayo Akinjagunla",
      date: "2025-01-12",
      image: Opportunities,
      views: 700,
      excerpt: "Learning French is not just about mastering a language; it’s about unlocking new opportunities.",
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    id: `${blogs.length + 1}`,
    title: "",
    author: "Busayo Akinjagunla",
    date: new Date().toISOString().split("T")[0],
    views: 0,
    excerpt: "",
    image: null,
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      setNewBlog((prev) => ({ ...prev, image: file }));

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.excerpt || !newBlog.image) {
      alert("Please fill in the required fields: Title, Excerpt, and Image");
      return;
    }

    // Sanitize excerpt
    const sanitizedExcerpt = DOMPurify.sanitize(newBlog.excerpt);

    // Upload image to Firebase Storage
    const storage = getStorage();
    const imageRef = ref(storage, `blogs/${newBlog.image.name}`);
    await uploadBytes(imageRef, newBlog.image);

    const imageUrl = await getDownloadURL(imageRef);

    // Add new blog
    setBlogs([...blogs, { ...newBlog, excerpt: sanitizedExcerpt, imageUrl, id: `${blogs.length + 1}` }]);
    setNewBlog({
      id: `${blogs.length + 2}`,
      title: "",
      author: "Admin User",
      date: new Date().toISOString().split("T")[0],
      views: 0,
      excerpt: "",
      image: null,
      imageUrl: "",
    });
    setImagePreview("");
  };

  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setEditingBlog(blog);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditExcerptChange = useCallback(
    (content) => {
      // Sanitize the excerpt content when edited
      const sanitizedContent = DOMPurify.sanitize(content);
      setEditingBlog((prev) => ({ ...prev, excerpt: sanitizedContent }));
    },
    [setEditingBlog]
  );

  const handleUpdateBlog = () => {
    // Sanitize the excerpt before updating
    const sanitizedExcerpt = DOMPurify.sanitize(editingBlog.excerpt);

    setBlogs(
      blogs.map((blog) =>
        blog.id === editingBlogId ? { ...editingBlog, excerpt: sanitizedExcerpt } : blog
      )
    );
    setEditingBlogId(null);
    setEditingBlog(null);
  };

  const handleCloseModal = () => {
    setEditingBlogId(null);
    setEditingBlog(null);
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
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="textinputImagepreview">
          <div className="image-previewBox">
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          </div>
          <TextEditor
            value={newBlog.excerpt}
            onChange={(content) => setNewBlog({ ...newBlog, excerpt: content })}
            placeholder="Write the blog excerpt..."
          />
        </div>
        <button onClick={handleAddBlog}>Add Blog</button>
      </section>

      <h3>Manage Blogs</h3>
      <section className="manage-blogs">
        {blogs.map((blog) => (
          <div className="blog-item" key={blog.id}>
            <img src={blog.imageUrl || blog.image} alt={blog.title} />
            <div className="blog-manage-Details">
              <div className="blog-manage-Meta">
                <li className="name-manage-Date">
                  <span className="blog-manage-title">{blog.title}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <span>{blog.date}</span>
                </li>
                <span className="views-manage-title">
                  <i className="fa-solid fa-eye"></i>
                  {blog.views}
                </span>
              </div>
              <div
                className="blogExcerpt-manage"
                dangerouslySetInnerHTML={{ __html: blog.excerpt }}
              ></div>
              <button onClick={() => handleEditBlog(blog)}>Edit</button>
              <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      {editingBlogId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Blog</h3>
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={editingBlog.title}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={editingBlog.author}
              onChange={handleEditChange}
            />
            <input
              type="date"
              name="date"
              value={editingBlog.date}
              onChange={handleEditChange}
            />
            <TextEditor
              value={editingBlog.excerpt}
              onChange={handleEditExcerptChange}
              placeholder="Edit your excerpt here..."
            />
            <div className="modal-actions">
              <button onClick={handleUpdateBlog}>Update Blog</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;