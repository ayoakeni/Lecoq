import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
    // Add more testimonials as needed
  ];

  return (
    <div className="testimonials-section">
      <h1 className="section-title">Testimonials</h1>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}
        className="testimonials-swiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <p className="testimonial-quote">“{testimonial.quote}”</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonials;
