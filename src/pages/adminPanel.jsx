import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "../utils/firebaseConfig";
import TextEditor from "../components/TextEditor";
import SafeHtml from "../components/safeHtml"
import DateTimeDisplay from "../components/timeFormat";
import DOMPurify from "dompurify";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "Busayo Akinjagunla",
    date: new Date().toISOString().split("T")[0],
    views: 0,
    excerpt: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch blogs from Firestore
  const fetchBlogs = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Failed to fetch blogs. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      setNewBlog((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = () => setImagePreview
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  // Add a new blog
  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.excerpt || !newBlog.image) {
      alert("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    try {
      const imageRef = ref(storage, `blogs/${newBlog.image.name}`);
      await uploadBytes(imageRef, newBlog.image);
      const imageUrl = await getDownloadURL(imageRef);

      const blogDoc = {
        title: newBlog.title,
        author: newBlog.author,
        date: newBlog.date,
        time: serverTimestamp(),
        views: 0,
        excerpt: DOMPurify.sanitize(newBlog.excerpt),
        imageUrl,
      };
      await addDoc(collection(db, "blogs"), blogDoc);

      alert("Blog added successfully!");
      setNewBlog({
        title: "",
        author: "Busayo Akinjagunla",
        date: new Date().toISOString().split("T")[0],
        views: 0,
        excerpt: "",
        image: null,
      });
      setImagePreview("");
      fetchBlogs();
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing blog
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setEditingBlog(blog);
  };

  // Handle changes in the blog being edited
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in the excerpt (using TextEditor)
  const handleEditExcerptChange = useCallback(
    (content) => {
      const sanitizedContent = DOMPurify.sanitize(content);
      setEditingBlog((prev) => ({ ...prev, excerpt: sanitizedContent }));
    },
    [setEditingBlog]
  );

  // Update an edited blog
  const handleUpdateBlog = async () => {
    if (!editingBlog.title || !editingBlog.excerpt) {
      alert("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    try {
      const blogRef = doc(db, "blogs", editingBlogId);
      await updateDoc(blogRef, {
        title: editingBlog.title,
        author: editingBlog.author,
        date: editingBlog.date,
        excerpt: DOMPurify.sanitize(editingBlog.excerpt),
      });

      alert("Blog updated successfully!");
      setEditingBlogId(null);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (id) => {
    setLoading(true);
    try {
      const blogRef = doc(db, "blogs", id);
      await deleteDoc(blogRef);
      alert("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Close the edit modal
  const handleCloseModal = () => {
    setEditingBlogId(null);
    setEditingBlog(null);
  };

  // Logout functionality
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      alert("You have been logged out successfully!");
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <button onClick={handleLogout} className="logout-button" disabled={loading}>
          Logout
        </button>
      </div>

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
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="textinputImagepreview">
          <div className="image-previewBox">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>
          <TextEditor
            value={newBlog.excerpt}
            onChange={(content) => setNewBlog({ ...newBlog, excerpt: content })}
            placeholder="Write the blog excerpt..."
          />
        </div>
        <button onClick={handleAddBlog} disabled={loading}>
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </section>

      <h3>Manage Blogs</h3>
      <section className="manage-blogs">
        {blogs.map((blog) => (
          <div className="blog-item" key={blog.id}>
            <img src={blog.imageUrl || blog.image} alt={blog.title} />
            <div className="blog-manage-Details">
              <div className="blog-manage-Meta">
                <span className="blog-manage-title">{blog.title}</span>
                <div className="blog-view-date">
                  <DateTimeDisplay timestamp={blog.time} />
                  <span className="views">
                    <i className="fa-solid fa-eye"></i>
                    {blog.views}
                  </span>
                </div>
              </div>
              <div className="blogExcerpt-manage">
                <SafeHtml htmlContent={blog.excerpt} fallback="Content is not available for this blog." />
              </div>
              <button onClick={() => handleEditBlog(blog)}>Edit</button>
              <button onClick={() => handleDeleteBlog(blog.id)} disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </button>
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
              <button onClick={handleUpdateBlog} disabled={loading}>
                {loading ? "Updating..." : "Update Blog"}
              </button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;