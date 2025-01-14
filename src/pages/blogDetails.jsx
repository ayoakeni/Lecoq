import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import images
import Gcontent from "../assets/images/Globalcontent.png";
import Gplay from "../assets/images/Globalplayer.png";
import Aceexam from "../assets/images/Aceexam.png";
import Opportunities from "../assets/images/opportunities.png";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data
  const blogs = [
    {
      id: "1",
      title: "5 Sure-banker Reasons Why You Need French",
      author: "Busayo Akinjagunla",
      date: "Jan 10, 2025",
      time: "11:00am",
      image: Opportunities,
      content: `
        In our increasingly interconnected world, learning a new language can open doors to countless opportunities.
        Among the many languages you could choose to study, French stands out as a particularly valuable option.
        Here are five compelling reasons why learning French is important:
        
        1. **Global Reach**: French is spoken in more than 29 countries across multiple continents, making it a truly global language.
        2. **Cultural Enrichment**: Access French literature, cinema, and music in their original form.
        3. **Career Opportunities**: Many multinational companies value employees who can speak French.
        4. **Ease of Travel**: Navigate French-speaking countries with ease during your travels.
        5. **Cognitive Benefits**: Learning a new language enhances brain function and memory.
        
        Learning French is not just about mastering vocabulary and grammar; it’s about gaining a new perspective and connecting with the world in a meaningful way.
      `,
    },
    {
      id: "2",
      title: "Unlocking Migration Opportunities",
      author: "Busayo Akinjagunla",
      date: "Jan 12, 2025",
      image: Gcontent,
      content: `
        Learning French is not just about mastering a language; it’s about unlocking new opportunities, enriching your cultural experiences, and enhancing your cognitive abilities.

        Countries like Canada, Belgium, and Switzerland provide numerous migration programs for French speakers. The French language also opens doors to scholarships, international work programs, and social integration.

        Start your French journey today and unlock the countless migration opportunities waiting for you.
      `,
    },
  ];

  // Find the blog based on the id
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <div>404 - Blog Not Found</div>;
  }

  return (
    <div className="blog-details-container">
      <div className="blog-header">
        {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
        <h1>{blog.title}</h1>
        <p className="meta">
          <span>By</span>
          <strong>{blog.author}</strong>
          <span><i class="fa-solid fa-grip-lines-vertical"></i>{blog.date}</span>
          <span><i class="fa-solid fa-grip-lines-vertical"></i>{blog.time}</span>
        </p>
      </div>
      <div className="blog-content">
        {blog.content.split("\n").map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
    </div>
  );
};

export default BlogDetails;
