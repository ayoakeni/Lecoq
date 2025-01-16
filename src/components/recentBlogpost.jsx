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
        const blogsQuery = query(blogsCollection, orderBy("date", "desc"), limit(3));
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

  return (
    <section className="recentBlog">
      <h2>Recent Blog Posts</h2>
      <div className="recentBlogBody">
        {/* First post */}
        {blogs[0] && (
          <div className="recentPost firstPost">
            <img src={blogs[0].imageUrl} alt={blogs[0].title} />
            <div className="recentDetails">
              <div className="info">
                <li className="nameDate">
                  <span>{blogs[0].author}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <span>{new Date(blogs[0].date).toLocaleDateString()}</span>
                </li>
                <span className="views">
                  <i className="fa-solid fa-eye"></i>{blogs[0].views}
                </span>
              </div>
              <strong>{blogs[0].title}</strong>
              <p dangerouslySetInnerHTML={{ __html: blogs[0].excerpt }}></p>
              <button onClick={() => navigate(`/blog/${blogs[0].id}`)}>
                Read post
              </button>
            </div>
          </div>
        )}

        {/* Second and third posts */}
        <div className="recentPostGroup">
          {blogs.slice(1, 3).map((blog, index) => (
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