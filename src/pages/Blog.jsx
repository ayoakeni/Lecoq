import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../utils/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import SafeHtml from "../components/safeHtml";
import { Helmet } from "react-helmet";
import DateTimeDisplay from "../components/timeFormat";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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

  if (loading) {
    return <div className="recentBlog">Loading...</div>;
  }

  if (!blogs.length) {
    return <div className="recentBlog">No blogs found.</div>;
  }

  return (
    <div className="blog">
      <Helmet>
        <title>Blogs</title>
        <meta property="description" content="See what we got for you." />
        <meta property="title" content="Blogs" />
        <meta property="og:type" content="website" />
      </Helmet>
      <h2 className="title edu">Blogs</h2>
      <section className="blog-grid">
        {blogs.map((blog) => (
          <div className="blogPost" key={blog.id}>
            {blog.imageUrl ? (
              <img src={blog.imageUrl} alt={blog.title} className="blogImage" />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
            <div className="blogDetails">
              <div className="blogMeta">
                <li className="nameDate">
                  <span>{blog.author}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <DateTimeDisplay timestamp={blog.time} showTime={false} />
                </li>
              </div>
              <strong className="blogTitle">{blog.title}</strong>
              <p className="blogExcerpt">
                <SafeHtml htmlContent={blog.excerpt} fallback="No excerpt provided." /> 
              </p>
              <button className="readButton" onClick={() => window.open(`/blog/${blog.id}`, "_blank")}>
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