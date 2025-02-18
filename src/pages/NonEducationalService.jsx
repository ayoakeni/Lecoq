import React, { useState } from "react";
import { Helmet } from "react-helmet";

// Import images
import ed1 from "../assets/images/translate.jpg";
import ed2 from "../assets/images/nmbf.jpg";
import ed3 from "../assets/images/it.jpg";

function NonEducational() {
  const services = [
    {
      title: "Translation Service",
      englishDescription:
        "We offer translation services to both corporates and individuals. Translation of documents, books, manuals, guides, videos, audios, etc., from English to French or vice versa.",
      frenchDescription:
        "Nous proposons des services de traduction pour les entreprises et les particuliers. Traduction de documents, livres, manuels, guides, vidéos, audios, etc., de l'anglais vers le français ou vice versa.",
      image: ed1,
    },
    {
      title: "Subtitling Services",
      englishDescription:
        "We offer subtitling services for your audio or visual content in French. Subtitling of documentaries, guides, corporate videos, skits, movies, music videos, etc.",
      frenchDescription:
        "Nous proposons des services de sous-titrage pour votre contenu audio ou visuel en français. Sous-titrage de documentaires, guides, vidéos d'entreprise, sketches, films, clips musicaux, etc.",
      image: ed2,
    },
    {
      title: "Interpretation Services",
      englishDescription:
        "Interpretation services are available for those with speaking engagements or meetings.",
      frenchDescription:
        "Des services d'interprétation sont disponibles pour ceux qui ont des interventions orales ou des réunions.",
      image: ed3,
    },
  ];

  const [translations, setTranslations] = useState(
    services.map(() => true) // Initialize all services in English
  );

  const toggleTranslation = (index) => {
    setTranslations((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div className="non-educational-services">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Programs - Non-Educational Service</title>
        <meta name="description" content="Explore the various non-educational programs we offer, designed to meet diverse needs." />
        <meta name="keywords" content="non-educational programs, services, courses, workshops" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lecoqfrench.com/non-educational-service" />

        {/* Open Graph (OG) Meta Tags for Facebook */}
        <meta property="og:title" content="Programs - Non-Educational Service" />
        <meta property="og:description" content="Explore the various non-educational programs we offer, designed to meet diverse needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lecoqfrench.com/non-educational-service" />
        <meta property="og:image" content="https://lecoqfrench.com/images/program-preview.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programs - Non-Educational Service" />
        <meta name="twitter:description" content="Explore the various non-educational programs we offer, designed to meet diverse needs." />
        <meta name="twitter:image" content="https://lecoqfrench.com/images/program-preview.png" />
      </Helmet>
      <div className="container">
        <h2 className="title non">Non-Educational Services</h2>
        <div className="grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <div className="service-content">
                <h2 className="service-title">{service.title}</h2>
                <p className="service-description">
                  {translations[index]
                    ? service.englishDescription
                    : service.frenchDescription}
                </p>
                <button
                  onClick={() => toggleTranslation(index)}
                  className="translate-button"
                >
                  {translations[index]
                    ? "Translate to French"
                    : "Translate to English"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NonEducational;
