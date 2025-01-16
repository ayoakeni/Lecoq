import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

function RecentBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogsQuery = query(blogsCollection, orderBy("date", "desc"), limit(4)); // Fetch the latest 4 blogs
        const querySnapshot = await getDocs(blogsQuery);

        const fetchedBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Separate the first blog post and the next three
  const [firstPost, ...otherPosts] = blogs;

  return (
    <section className="recentBlog">
      <h2>Recent Blog Posts</h2>
      <div className="recentBlogBody">
        {/* First post */}
        {firstPost && (
          <div className="recentPost firstPost">
            <img src={firstPost.imageUrl} alt={firstPost.title} />
            <div className="recentDetails">
              <div className="info">
                <li className="nameDate">
                  <span>{firstPost.author}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <span>{new Date(firstPost.date).toLocaleDateString()}</span>
                </li>
                <span className="views">
                  <i className="fa-solid fa-eye"></i>{firstPost.views}
                </span>
              </div>
              <strong>{firstPost.title}</strong>
              <p dangerouslySetInnerHTML={{ __html: firstPost.excerpt }}></p>
              <button onClick={() => navigate(`/blog/${firstPost.id}`)}>
                Read post
              </button>
            </div>
          </div>
        )}

        {/* Second to fourth posts */}
        <div className="recentPostGroup">
          {otherPosts.map((blog) => (
            <div className="recentPost" key={blog.id}>
              <img src={blog.imageUrl} alt={blog.title} />
              <div className="recentDetails">
                <div className="info">
                  <li className="nameDate">
                    <span>{blog.author}</span>
                    <i className="fa-solid fa-asterisk"></i>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </li>
                  <span className="views">
                    <i className="fa-solid fa-eye"></i>{blog.views}
                  </span>
                </div>
                <strong>{blog.title}</strong>
                <p dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
                <button onClick={() => navigate(`/blog/${blog.id}`)}>
                  Read post
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecentBlogs;