import React from "react";

// Import images
import Gcontent from "../assets/images/Globalcontent.png";
import Gplay from "../assets/images/Globalplayer.png";
import Aceexam from "../assets/images/Aceexam.png";
import Kid from "../assets/images/kid.png";

function RecentBlogs() {
  // Blog data
  const blogData = [
    {
      title: "Master French with Le Coq",
      author: "Busayo Akinjagunla",
      date: "20 Jan 2024",
      views: "2245",
      excerpt:
        "Le Coq is a one-stop shop for all your French proficiency needs. French is spoken in many countries across various continents...",
      image: Gcontent,
      link: "/blog/master-french-with-le-coq",
    },
    {
      title: "5 Tips for Learning French Fast",
      author: "Jane Doe",
      date: "15 Jan 2024",
      views: "235",
      excerpt:
        "Learning French doesn't have to be overwhelming. Here are five practical tips to get you started on your journey...",
      image: Gplay,
      link: "/blog/5-tips-learning-french-fast",
    },
    {
      title: "The Joy of Multilingualism",
      author: "John Smith",
      date: "10 Jan 2024",
      views: "500",
      excerpt:
        "Speaking multiple languages opens up new opportunities and experiences. Here's why you should consider learning French...",
      image: Aceexam,
      link: "/blog/joy-of-multilingualism",
    },
    {
      title: "French Pronunciation Simplified",
      author: "Marie Claire",
      date: "5 Jan 2024",
      views: "800",
      excerpt:
        "Struggling with French pronunciation? Our experts share key tips to help you master the sounds of the French language...",
      image: Kid,
      link: "/blog/french-pronunciation-simplified",
    },
  ];

  return (
    <section className="recentBlog">
      <h2>Recent Blog Posts</h2>
      <div className="recentBlogBody">
        {/* First post */}
        <div className="recentPost firstPost">
          <img src={blogData[0].image} alt={blogData[0].title} />
          <div className="recentDetails">
            <div className="info">
              <li className="nameDate">
                <span>{blogData[0].author}</span>
                <i class="fa-solid fa-asterisk"></i>
                <span>{blogData[0].date}</span>
              </li>
              <span className="views">
                <i className="fa-solid fa-eye"></i>{blogData[0].views}
              </span>
            </div>
            <strong>{blogData[0].title}</strong>
            <p>{blogData[0].excerpt}</p>
            <button onClick={() => (window.location.href = blogData[0].link)}>
              Read post
            </button>
          </div>
        </div>

        {/* Second and third posts */}
        <div className="recentPostGroup">
          {blogData.slice(1, 3).map((blog, index) => (
            <div className="recentPost" key={index}>
              <img src={blog.image} alt={blog.title} />
              <div className="recentDetails">
                <div className="info">
                  <li className="nameDate">
                    <span>{blogData[0].author}</span>
                    <i class="fa-solid fa-asterisk"></i>
                    <span>{blogData[0].date}</span>
                  </li>
                  <span className="views">
                    <i className="fa-solid fa-eye"></i>{blog.views}
                  </span>
                </div>
                <strong>{blog.title}</strong>
                <p>{blog.excerpt}</p>
                <button onClick={() => (window.location.href = blog.link)}>
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