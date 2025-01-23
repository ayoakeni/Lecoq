import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";
import { db, storage } from "../utils/firebaseConfig";
import { Helmet } from "react-helmet";
import TextEditor from "../components/textEditor";
import SafeHtml from "../components/safeHtml";
import DateTimeDisplay from "../components/timeFormat";
import DOMPurify from "dompurify";
import displayImage from "../assets/images/mad-designer.png"
import AlertPopup from "../components/alertPopup"
import debounce from "lodash.debounce";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "Busayo Akinjagunla",
    views: 0,
    excerpt: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const isFetchingMore = useState(false);
  const lastVisibleRef = useRef(null);
  const isFetchingMoreRef = useRef(false);
  const [hasMoreBlogs, setHasMoreBlogs] = useState(true);

  const showAlertMessage = (message) => {
    setAlertMessage(false);
    setTimeout(() => setAlertMessage(message), 50);
  };

  // Fetch blogs with lazy loading from firestore
  const fetchBlogs = useCallback(async (loadMore = false) => {
  if ((loadMore && !hasMoreBlogs) || isFetchingMoreRef.current) return;

  try {
    if (loadMore) isFetchingMoreRef.current = true;

    const blogsQuery = loadMore
      ? query(
          collection(db, "blogs"),
          orderBy("time", "desc"),
          startAfter(lastVisibleRef.current),
          limit(5)
        )
      : query(collection(db, "blogs"), orderBy("time", "desc"), limit(2));

    const querySnapshot = await getDocs(blogsQuery);

    if (querySnapshot.empty) {
      setHasMoreBlogs(false);
      return;
    }

    const fetchedBlogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Remove duplicate blogs based on ID
    setBlogs((prevBlogs) => {
      const newBlogs = fetchedBlogs.filter(
        (newBlog) => !prevBlogs.some((prevBlog) => prevBlog.id === newBlog.id)
      );
      return [...prevBlogs, ...newBlogs];
    });

    lastVisibleRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
  } catch (error) {
    showAlertMessage("Failed to fetch blogs. Please try again.");
  } finally {
    setLoading(false);
    isFetchingMoreRef.current = false;
  }
}, [hasMoreBlogs]);

  
  // Lazy load on scroll
  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        fetchBlogs(true);
      }
    }, 300),
    [fetchBlogs]
  );
  
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const file = files[0];
      setNewBlog((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setNewBlog((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add a new blog
  const handleAddBlog = async () => {
    if (!newBlog.title.trim()) {
      showAlertMessage("Please provide a title.");
      return;
    }
    if (!newBlog.author) {
      showAlertMessage("Please provide an author name.");
      return;
    }
    if (!newBlog.image) {
      showAlertMessage("Please provide an image.");
      return;
    }
    if (!newBlog.excerpt.trim()) {
      showAlertMessage("Please provide content.");
      return;
    }    

    setAddLoading(true);
    try {
      const imageRef = ref(storage, `blogs/${newBlog.image.name}`);
      await uploadBytes(imageRef, newBlog.image);
      const imageUrl = await getDownloadURL(imageRef);

      const blogDoc = {
        title: newBlog.title,
        author: newBlog.author,
        time: serverTimestamp(),
        views: 0,
        excerpt: DOMPurify.sanitize(newBlog.excerpt),
        imageUrl,
      };

      await addDoc(collection(db, "blogs"), blogDoc);

      showAlertMessage("Blog added successfully!");    

      setNewBlog({
        title: "",
        author: "Busayo Akinjagunla",
        views: 0,
        excerpt: "",
        image: null,
      });
      setImagePreview("");
      document.querySelector('input[name="image"]').value = "";
      fetchBlogs();
    } catch (error) {
      showAlertMessage("Failed to add blog. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  // Handle editing blog
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setEditingBlog(blog);
  };

  // Handle changes in the blog being edited
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      const file = files[0];
      setEditingBlog((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = () => setEditingBlog((prev) => ({ ...prev, imageUrl: reader.result }));
      reader.readAsDataURL(file);
    } else {
      setEditingBlog((prev) => ({ ...prev, [name]: value }));
    }
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
    if (!editingBlog.title.trim()) {
      showAlertMessage("Please provide a title."); 
      return;
    }
    if (!editingBlog.author.trim()) {
      showAlertMessage("Please provide an author name.");
      return;
    }
    if (!editingBlog.excerpt.trim()) {
      showAlertMessage("Please provide a content.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = editingBlog.imageUrl;

      // Upload new image if it exists
      if (editingBlog.image instanceof File) {
        const imageRef = ref(storage, `blogs/${editingBlog.image.name}`);
        await uploadBytes(imageRef, editingBlog.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const blogRef = doc(db, "blogs", editingBlogId);
      await updateDoc(blogRef, {
        title: editingBlog.title,
        author: editingBlog.author,
        imageUrl,
        excerpt: DOMPurify.sanitize(editingBlog.excerpt),
      });

      showAlertMessage("Blog updated successfully!");

      setEditingBlogId(null);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      showAlertMessage("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };  

  // Delete a blog
  const handleDeleteBlog = async (id) => {
    setDeletingBlogId(id); // Set the ID of the blog being deleted
    try {
      const blogRef = doc(db, "blogs", id);
      await deleteDoc(blogRef);

      showAlertMessage("Blog deleted successfully!");
      fetchBlogs();
      setConfirmDelete(null);
    } catch (error) {
      showAlertMessage("Failed to delete blog. Please try again.");
    }
  };

  const handleConfirmDelete = (id) => {
    setConfirmDelete(id); // Set the blog ID to confirm deletion
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null); // Close the confirmation modal
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

      showAlertMessage("You have been logged out successfully!");
      
      window.location.href = "/admin/login";
    } catch (error) {
      showAlertMessage("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-page">
      <Helmet>
        <title>Admin Panel</title>
        <meta property="og:title" content="Admin Panel" />
        <meta property="og:description" content="Modify, Upload your blogs" />
        <meta property="og:image" content={displayImage} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="admin-header">
        <button onClick={handleLogout} className="logout-button" disabled={loading}>
          <i className="fa-solid fa-power-off"></i>
        </button>
      </div>

      {alertMessage && (
        <AlertPopup
          message={alertMessage}
          duration={5000}
          onClose={() => showAlertMessage(false)}
        />
      )}

      <section className="add-blog">
        <h3 className="ad-header">Add a New Blog</h3>
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
        <div className="textinputImagepreview">
          <div className="image-previewBox">
            <div className="image-input">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <i className="fa-solid fa-square-plus"></i>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>
          <TextEditor
            value={newBlog.excerpt}
            onChange={(content) => setNewBlog((prev) => ({ ...prev, excerpt: content }))}
            placeholder="Write the blog excerpt..."
          />
        </div>
        <button className="add-button" onClick={handleAddBlog} disabled={addLoading}>
          {addLoading ? "Adding..." : "Add Blog"}
        </button>
      </section>

      <h3 className="m-h3">Manage Blogs</h3>
      <section className="manage-blogs">
        {loading ? (
          <div className="recentBlog">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="recentBlog">No blogs found.</div>
        ) : (
          blogs.map((blog) => (
            <div className="blog-item" key={blog.id}>
              <img src={blog.imageUrl || blog.image} alt={blog.title} />
              <div className="blog-manage-Details">
                <div className="blog-manage-Meta">
                  <span className="blog-manage-title">{blog.title}</span>
                  <div className="blog-view-date">
                    <DateTimeDisplay timestamp={blog.time} showTime={true} />
                    <span className="views">
                      <i className="fa-solid fa-eye"></i>
                      {blog.views}
                    </span>
                  </div>
                </div>
                <div className="blogExcerpt-manage">
                  <SafeHtml htmlContent={blog.excerpt} fallback="Content is not available for this blog." />
                </div>
                <button className="edit-button" onClick={() => handleEditBlog(blog)}>Edit</button>
                <button
                  className="delete-button"
                  onClick={() => handleConfirmDelete(blog.id)}
                  disabled={deletingBlogId === blog.id}
                >
                  {deletingBlogId === blog.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {confirmDelete && (
        <div className="modal-overlay-delete">
          <div className="modal-content-delete">
            <h3>Are you sure you want to delete this blog?</h3>
            <div className="modal-actions-delete">
              <button
                onClick={() => handleDeleteBlog(confirmDelete)}
                className="confirm-button"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="cancel-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {editingBlogId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="c-h3">Edit Blog</h3>
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
            <div className="modal-image-previewBox">
              <div className="image-input">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleEditChange}
                />
              </div>
              <i className="fa-solid fa-square-plus"></i>
              {editingBlog && (
                <img
                  src={editingBlog.imageUrl || editingBlog.image}
                  alt={editingBlog.title}
                  className="modal-image-preview"
                />
              )}
            </div>
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
      {isFetchingMore && hasMoreBlogs && (
        <div className="lazyLoad">Loading more<i className="fa-solid fa-chevron-down"></i></div>
      )}

      {!hasMoreBlogs && <div className="endOfBlogs">No more blogs to display.</div>}
    </div>
  );
};

export default Admin;