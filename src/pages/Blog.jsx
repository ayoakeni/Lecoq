import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../utils/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const blogData = doc.data();
            if (blogData.image) {
              const imageUrl = await getImageURL(blogData.image);
              return {
                id: doc.id,
                ...blogData,
                image: imageUrl,
              };
            }
            return {
              id: doc.id,
              ...blogData,
            };
          })
        );
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to fetch image URL from Firebase Storage
  const getImageURL = async (imagePath) => {
    try {
      const imageRef = ref(storage, imagePath);
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Image URL: ", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  return (
    <div className="blog">
      <h2 className="title edu">Blogs</h2>
      <section className="blog-grid">
        {blogs.map((blog) => (
          <div className="blogPost" key={blog.id}>
            {blog.image ? (
              <img src={blog.image} alt={blog.title} className="blogImage" /> // Display image if URL is available
            ) : (
              <div className="no-image">No Image Available</div>
            )}
            <div className="blogDetails">
              <div className="blogMeta">
                <li className="nameDate">
                  <span>{blog.author}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <span>{blog.date}</span>
                </li>
                <span className="views">
                  <i className="fa-solid fa-eye"></i>{blog.views}
                </span>
              </div>
              <strong className="blogTitle">{blog.title}</strong>
              <p className="blogExcerpt" dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
              <button
                className="readButton"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Read post
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Blog;