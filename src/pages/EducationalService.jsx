import React, { useState } from "react";
import { Helmet } from "react-helmet";

// Import images
import ed1 from "../assets/images/guy.jpg";
import ed2 from "../assets/images/writing.jpg";
import ed3 from "../assets/images/loo.jpg";
import ed4 from "../assets/images/nm.jpg";
import ed5 from "../assets/images/qb.jpg";
import ed6 from "../assets/images/da.jpg";

function Educational() {
  const programs = [
    {
      title: "The Fresh Beginner Program (FBP)",
      englishDescription:
        "This program caters to fresh/new beginners to the French language. These set have no prior knowledge of French. This program runs for 4 months. The goal of this program is to take students from no level to intermediate level. Students are meant to have virtual contact with the tutor at least 4 times in a week for 3 hours.",
      frenchDescription:
        "Ce programme s'adresse aux débutants complets en langue française. Ces participants n'ont aucune connaissance préalable du français. Le programme dure 4 mois. L'objectif de ce programme est de faire passer les étudiants d'un niveau nul à un niveau intermédiaire. Les étudiants doivent avoir des contacts virtuels avec le tuteur au moins 4 fois par semaine pendant 3 heures.",
      image: ed1,
    },
    {
      title: "The Intermediate Program",
      englishDescription:
        "This program caters to intermediate level students who have average knowledge of the French Language. However, a short test will be written to ascertain students level. This program runs for 4 months. The goal of this program is to take students from intermediate level to professional level. Students are meant to have virtual contact with tutor at least 3 times in a week for 3 hours.",
      frenchDescription:
        "Ce programme s'adresse aux étudiants de niveau intermédiaire qui ont une connaissance moyenne de la langue française. Cependant, un court test sera effectué pour évaluer le niveau des étudiants. Le programme dure 4 mois. L'objectif de ce programme est de faire passer les étudiants d'un niveau intermédiaire à un niveau professionnel. Les étudiants doivent avoir des contacts virtuels avec le tuteur au moins 3 fois par semaine pendant 3 heures.",
      image: ed2,
    },
    {
      title: "The Exam Preparatory Program",
      englishDescription:
        "This program caters for people who have an exam to write in the near future. For instance French proficiency exam such as TEF, TCF or DALF. This program guarantees success in the exam in one sitting. Students are meant to have virtual contact with tutor at least 4 times in a week for 3 hours.",
      frenchDescription:
        "Ce programme s'adresse aux personnes qui doivent passer un examen prochainement, comme un examen de compétence en français tel que le TEF, le TCF ou le DALF. Ce programme garantit le succès à l'examen en une seule séance. Les étudiants doivent avoir des contacts virtuels avec le tuteur au moins 4 fois par semaine pendant 3 heures.",
      image: ed3,
    },
    {
      title: "The French Kiddies Program",
      englishDescription:
        "This program caters to teaching kids between ages 9-13 the French Language. Kids will have virtual contact with tutor at weekends at least once for 3 hours for 4 months.",
      frenchDescription:
        "Ce programme s'adresse à l'enseignement du français aux enfants âgés de 9 à 13 ans. Les enfants auront des contacts virtuels avec le tuteur le week-end, au moins une fois pendant 3 heures, et ce, pendant 4 mois.",
      image: ed4,
    },
    {
      title: "Special Summer Classes for Kiddies",
      englishDescription:
        "These are special classes for kiddies during summer holidays. This is open for kiddies from ages 9-13. This class runs for 3 months. Students will have virtual contact with tutor 3 times per week for 3 hours.",
      frenchDescription:
        "Ce sont des cours spéciaux pour les enfants pendant les vacances d'été. Ces cours sont ouverts aux enfants âgés de 9 à 13 ans. La classe dure 3 mois. Les étudiants auront des contacts virtuels avec le tuteur 3 fois par semaine pendant 3 heures.",
      image: ed5,
    },
    {
      title: "Language Buddy",
      englishDescription:
        "This is a special service where you need someone to speak the French language with you consistently to enhance your learning and comprehension of the language.",
      frenchDescription:
        "Il s'agit d'un service spécial où vous avez besoin de quelqu'un pour parler français avec vous de manière constante afin d'améliorer votre apprentissage et votre compréhension de la langue.",
      image: ed6,
    },
  ];


  const [translations, setTranslations] = useState(
    programs.map(() => true) // Initialize all programs in English
  );

  const toggleTranslation = (index) => {
    setTranslations((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div className="educational-services">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Programs - Educational Service</title>
        <meta name="description" content="Discover our educational programs designed to provide quality learning experiences across various subjects." />
        <meta name="keywords" content="educational programs, courses, learning, workshops, training" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lecoqfrench.com/educational-service" />

        {/* Open Graph (OG) Meta Tags for Facebook */}
        <meta property="og:title" content="Programs - Educational Service" />
        <meta property="og:description" content="Discover our educational programs designed to provide quality learning experiences across various subjects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lecoqfrench.com/educational-service" />
        <meta property="og:image" content="https://www.yoursite.com/images/education-preview.png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Programs - Educational Service" />
        <meta name="twitter:description" content="Discover our educational programs designed to provide quality learning experiences across various subjects." />
        <meta name="twitter:image" content="https://www.yoursite.com/images/education-preview.png" />
      </Helmet>
      <div className="container">
        <h2 className="title edu">Educational Services</h2>
        <div className="grid">
          {programs.map((program, index) => (
            <div key={index} className="program-card">
              <img
                src={program.image}
                alt={program.title}
                className="program-image"
              />
              <div className="program-content">
                <h2 className="program-title">{program.title}</h2>
                <p className="program-description">
                  {translations[index]
                    ? program.englishDescription
                    : program.frenchDescription}
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

export default Educational;
