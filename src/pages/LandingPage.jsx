import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import ed1 from "../assets/images/teach.jpg";
import ed2 from "../assets/images/twos.jpg";
import ed3 from "../assets/images/loo.jpg";
import ed4 from "../assets/images/translate.jpg";
import ed5 from "../assets/images/nmbf.jpg";
import ed6 from "../assets/images/it.jpg";

function LandingPage() {
  const [isEnglish, setIsEnglish] = useState(true);
  const navigate = useNavigate();

  // Refs for sections
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  
  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };

    const programsEdu = [
       {
        //Educational
        titleEdu: "The Fresh Beginner Program (FBP)",
        contentEdu:
          "This program caters to fresh/new beginners to the French language. These set have no prior knowledge of French. This program runs for 4 months. The goal of this program is to take students from no level to intermediate level. Students are meant to have virtual contact with the tutor at least 4 times in a week for 3 hours.",
        imageEdu: ed1,
      },
      {
        titleEdu: "The Intermediate Program",
        contentEdu:
          "This program caters to intermediate level students who have average knowledge of the French Language. However, a short test will be written to ascertain students level. This program runs for 4 months. The goal of this program is to take students from intermediate level to professional level. Students are meant to have virtual contact with tutor at least 3 times in a week for 3 hours.",
        imageEdu: ed2,
      },
      {
        titleEdu: "The Exam Preparatory Program",
        contentEdu:
          "This program caters for people who have an exam to write in the near future. For instance French proficiency exam such as TEF, TCF or DALF. This program guarantees success in the exam in one sitting. Students are meant to have virtual contact with tutor at least 4 times in a week for 3 hours.",
        imageEdu:ed3,
       },
    ];

    const programsNon = [
      //Non educational
     {  titleNon: "Translation Service",
       contentNon:
         "We offer translation services to both corporates and individuals. Translation of documents, books, manuals, guides, videos, audios, etc., from English to French or vice versa.",
       imageNon: ed4,
     },
     {
       titleNon: "Subtitling Services",
       contentNon:
         "We offer subtitling services for your audio or visual content in French. Subtitling of documentaries, guides, corporate videos, skits, movies, music videos, etc.",
       imageNon: ed5,
     },
     {
       titleNon: "Interpretation Services",
       contentNon:
         "Interpretation services are available for those with speaking engagements or meetings.",
       imageNon: ed6,
     },
   ];

  return (
    <div className="contBody">
      {/* Hero Section */}
      <section className="heropage" ref={heroRef} id="home">
        <div className="heroText">
          <h1>Open Up To Global Opportunities with French</h1>
          <button
            className="heroButton"
            onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          loop={true}
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
        <h2>About</h2>
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

      {/* Programs */}
      <section className="programs-home-display">
        <h2 className="intPro">Programs</h2>
        <div className="programBox">
          <div className="subProgram">
            <span>Educational Services</span>          
            <button
              onClick={() => navigate("/educational-service")}
              className="edu-button"
            >
              See more
            </button>
          </div>
          <div className="grid-program">
            {programsEdu.map((programEdu, index) => (
              <a href="/educational-service" key={index} className="edu-card">
                <img
                  src={programEdu.imageEdu}
                  alt={programEdu.titleEdu}
                  className="edu-image"
                />
                <div className="edu-content">
                  <h2 className="edu-title">{programEdu.titleEdu}</h2>
                  <p className="edu-description">
                    {programEdu.contentEdu}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* Non educational */}
        <div className="programBox">
          <div className="subProgram">
            <span>Non-Educational Services</span>          
            <button
              onClick={() => navigate("/non-educational-service")}
              className="edu-button"
            >
              See more
            </button>
          </div>
          <div className="grid-program">
            {programsNon.map((programNon, index) => (
              <a href="/non-educational-service" key={index} className="edu-card">
                <img
                  src={programNon.imageNon}
                  alt={programNon.titleNon}
                  className="edu-image"
                />
                <div className="edu-content">
                  <h2 className="edu-title">{programNon.titleNon}</h2>
                  <p className="edu-description">
                    {programNon.contentNon}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Recent Blogs */}
      <RecentBlogs/>
      <Testimonials/>
    </div>
  );
}

export default LandingPage;
