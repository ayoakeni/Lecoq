import React from "react";

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Le Coq has helped my dream of learning and speaking French a reality. They also helped me ace my TEF. Today I have my permanent residency in Canada thanks to learning French. The tutors are so jovial and fun. They make you fall in love with the language.",
      author: "Olu of Hamilton",
    },
    {
      quote:
        "Thanks to Le Coq, I started with zero knowledge of the French language but now I can read, write, speak and listen. I love how the tutor makes it fun and easy to grasp.",
      author: "Mrs Ayodeji",
    },
  ];

  return (
    <div className="testimonials-section">
      <h1 className="section-title">Testimonials</h1>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-quote">“{testimonial.quote}”</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
