import React from "react";

function RecentBlogs({ blogs }) {
  return (
    <section className="recentBlog">
      <h2>Recent blog posts</h2>
      <div className="recentBlogBody">
        {/* First post */}
        <div className="recentPost firstPost">
          <img src={blogs[0].image} alt={blogs[0].title} />
          <div className="recentDetails">
            <li>
              <span>{blogs[0].author}</span>
              <span>{blogs[0].date}</span>
            </li>
            <strong>{blogs[0].title}</strong>
            <p>{blogs[0].excerpt}</p>
            <button onClick={() => window.location.href = blogs[0].link}>
              Read
            </button>
          </div>
        </div>

        {/* Container for second and third posts */}
        <div className="recentPostGroup">
          {blogs.slice(1, 3).map((blog, index) => (
            <div className="recentPost" key={index}>
              <img src={blog.image} alt={blog.title} />
              <div className="recentDetails">
                <li>
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </li>
                <strong>{blog.title}</strong>
                <p>{blog.excerpt}</p>
                <button onClick={() => window.location.href = blog.link}>
                  Read
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
