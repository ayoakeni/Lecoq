import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../utils/firebaseConfig";
import { Helmet } from 'react-helmet';
import imgg from "../assets/images/mad-designer.png";
import SafeHtml from "../components/safeHtml";
import DateTimeDisplay from "../components/timeFormat";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        const blogDoc = await getDoc(blogRef);

        if (blogDoc.exists()) {
          const blogData = blogDoc.data();

          // Add view record to the 'views' collection
          await addDoc(collection(db, "views"), {
            blogId: id,
            timestamp: serverTimestamp(),
          });

          // Increment the views count in the 'blogs' collection
          await updateDoc(blogRef, {
            views: increment(1), // Increment views by 1
          });

          if (blogData.image) {
            const imageUrl = await getDownloadURL(ref(storage, blogData.image));
            setBlog({ ...blogData, imageUrl });
          } else {
            setBlog(blogData);
          }
        } else {
          console.error("No such blog!");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
    <div className="loaderBox">
      <span className="loader"></span>
    </div>);
  }

  if (!blog) {
    return <div className="recentBlog">No blog found.</div>;
  }

  return (
    <div className="blog-details-container">
      <Helmet>
        <title>{blog.title || "Lecoq French School"}</title>
        <meta property="og:image" content={blog.imageUrl} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="blogContent">
        <div className="blog-header">
          <div className="titleAuthor">
            <h1>{blog.title}</h1>
            <p className="meta">
              <li className="meta-name-Date">
                <span>By</span>
                <strong>{blog.author}</strong>
              </li>
              <i className="fa-solid fa-asterisk"></i>
              <DateTimeDisplay timestamp={blog.time} showTime={true} />
              <span className="views">
                <i className="fa-solid fa-eye"></i>
                {blog.views}
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
          <SafeHtml htmlContent={blog.excerpt} fallback="Content is not available for this blog." />
        </div>
        <button className="back-button" onClick={() => navigate("/blogs")}>
          Go to blogs <i className="fa-solid fa-arrow-right"></i> 
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
