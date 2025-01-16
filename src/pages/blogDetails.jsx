import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import imgg from "../assets/images/mad-designer.png";

const BlogDetails = ({ db }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = await getDoc(doc(db, "blogs", id));
        if (blogDoc.exists()) {
          setBlog(blogDoc.data());
        } else {
          console.error("No such blog!");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id, db]);

  if (!blog) {
    return (
      <div className="errorPage">
        <span>
          Page not found: <strong>404</strong>. Check the address again.
        </span>
        <img src={imgg} alt="error" />
      </div>
    );
  }

  return (
    <div className="blog-details-container">
      <div className="blogContent">
        <div className="blog-header">
          <div className="titleAuthor">
            <h1>{blog.title}</h1>
            <p className="meta">
              <span>By</span>
              <strong>{blog.author}</strong>
              <span>
                <i className="fa-solid fa-grip-lines-vertical"></i>
                {blog.date}
              </span>
              <span>
                <i className="fa-solid fa-grip-lines-vertical"></i>
                {blog.time}
              </span>
            </p>
          </div>
          {blog.imageUrl ? (
            <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
          ) : (
            <img src={imgg} alt="Fallback" className="blog-image" />
          )}
        </div>
        <div className="blog-content">
          {blog.content.split("\n").map((line, index) => (
            <p key={index}>{line.trim()}</p>
          ))}
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
