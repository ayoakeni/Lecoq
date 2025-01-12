import React from "react";

function RecentBlogs({ blogs }) {
  return (
    <section className="recentBlog">
      <h2>Recent blog posts</h2>
      <div className="recentBlogBody">
        {blogs.slice(0, 3).map((blog, index) => (
          <div className="recentPost" key={index}>
            <img src={blog.image} alt={blog.title} />
            <div className="recentDetails">
              <li>
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </li>
              <strong>{blog.title}</strong>
              <p>{blog.excerpt}</p>
              <button onClick={() => window.location.href = blog.link}>Read</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentBlogs;
