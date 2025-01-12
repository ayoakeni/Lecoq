import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Scrollbar, Autoplay } from "swiper/modules";
import RecentBlogs from "../components/recentBlogpost";
import Testimonials from "../components/testimonial";

// Import images
import Gcontent from "../assets/images/Globalcontent.png";
import Gplay from "../assets/images/Globalplayer.png";
import Aceexam from "../assets/images/Aceexam.png";
import Kid from "../assets/images/kid.png";
import Opportunities from "../assets/images/opportunities.png";

function LandingPage() {
  const [isEnglish, setIsEnglish] = useState(true);

  // Refs for sections
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  
  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };

  // Blog data
const blogData = [
  {
    title: "Master French with Le Coq",
    author: "Busayo Akinjagunla",
    date: "20 Jan 2024",
    excerpt:
      "Le Coq is a one-stop shop for all your French proficiency needs. French is spoken in many countries across various continents...",
    image: Gcontent,
    link: "/blog/master-french-with-le-coq",
  },
  {
    title: "5 Tips for Learning French Fast",
    author: "Jane Doe",
    date: "15 Jan 2024",
    excerpt:
      "Learning French doesn't have to be overwhelming. Here are five practical tips to get you started on your journey...",
    image: Gplay,
    link: "/blog/5-tips-learning-french-fast",
  },
  {
    title: "The Joy of Multilingualism",
    author: "John Smith",
    date: "10 Jan 2024",
    excerpt:
      "Speaking multiple languages opens up new opportunities and experiences. Here's why you should consider learning French...",
    image: Aceexam,
    link: "/blog/joy-of-multilingualism",
  },
  {
    title: "French Pronunciation Simplified",
    author: "Marie Claire",
    date: "5 Jan 2024",
    excerpt:
      "Struggling with French pronunciation? Our experts share key tips to help you master the sounds of the French language...",
    image: Kid,
    link: "/blog/french-pronunciation-simplified",
  },
];

  return (
    <div className="contBody">
      {/* Hero Section */}
      <section className="heropage" ref={heroRef} id="home">
        <div className="heroText">
          <h1>Continue learning and unleash your brain's potential.</h1>
          <button
            className="heroButton"
            onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          scrollbar={{ hide: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Scrollbar, Autoplay]}
          className="mySwiper"
        >
          {[Gcontent, Gplay, Aceexam, Kid, Opportunities].map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="swiperImage" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Section */}
      <section className="about" ref={aboutRef} id="about">
        <h2>about</h2>
        <div className="aboutContent">
          <img
            src={Kid}
            alt="About us"
            className="aboutImage"
          />
          <article className="aboutText">
            <p>
              {isEnglish
                ? "Le Coq is a one-stop shop for all your French proficiency needs. French is spoken in many countries across various continents, including Europe, Africa, and parts of the Americas. It’s an official language in 29 countries and one of the six official languages of the United Nations. We have demystified learning French with our various learning methods to help you achieve your goals. Whether it's relocation, career advancement, or simply for fun, we've got you covered. Our instructors are native French speakers with over 10 years of experience. They possess the expertise to pass the knowledge across to you in simple English. Start the journey with us!"
                : "Le Coq est un guichet unique pour tous vos besoins en matière de maîtrise du français. Le français est parlé dans de nombreux pays sur divers continents, y compris l'Europe, l'Afrique et certaines parties des Amériques. C'est une langue officielle dans 29 pays et l'une des six langues officielles des Nations Unies. Nous avons démystifié l'apprentissage du français avec nos différentes méthodes d'apprentissage pour vous aider à atteindre vos objectifs, que ce soit pour une relocalisation, une progression de carrière ou simplement pour le plaisir. Nous sommes là pour vous accompagner. Nos instructeurs sont des locuteurs natifs du français avec plus de 10 ans d'expérience. Ils possèdent l'expertise nécessaire pour vous transmettre leurs connaissances en anglais simple. Commencez votre voyage avec nous !" }
            </p>
            <button onClick={toggleLanguage} className="translateButton">
              {isEnglish ? "Translate to French" : "Translate to English"}
            </button>
          </article>
        </div>
      </section>
      {/* Recent Blogs */}
      <RecentBlogs blogs={blogData} />
      <Testimonials/>
    </div>
  );
}

export default LandingPage;
