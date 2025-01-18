import React, { useState } from "react";
import { Helmet } from "react-helmet";

// Import images
import Gcontent from "../assets/images/Globalcontent.png";
import Gplay from "../assets/images/Globalplayer.png";
import Aceexam from "../assets/images/Aceexam.png";
import Kid from "../assets/images/kid.png";
import Opportunities from "../assets/images/opportunities.png";

function Educational() {
  const programs = [
    {
      title: "The Fresh Beginner Program (FBP)",
      englishDescription:
        "This program caters to fresh/new beginners to the French language. These set have no prior knowledge of French. This program runs for 4 months. The goal of this program is to take students from no level to intermediate level. Students are meant to have virtual contact with the tutor at least 4 times in a week for 3 hours.",
      frenchDescription:
        "Ce programme s'adresse aux débutants complets en langue française. Ces participants n'ont aucune connaissance préalable du français. Le programme dure 4 mois. L'objectif de ce programme est de faire passer les étudiants d'un niveau nul à un niveau intermédiaire. Les étudiants doivent avoir des contacts virtuels avec le tuteur au moins 4 fois par semaine pendant 3 heures.",
      image: Gcontent,
    },
    {
      title: "The Intermediate Program",
      englishDescription:
        "This program caters to intermediate level students who have average knowledge of the French Language. However, a short test will be written to ascertain students level. This program runs for 4 months. The goal of this program is to take students from intermediate level to professional level. Students are meant to have virtual contact with tutor at least 3 times in a week for 3 hours.",
      frenchDescription:
        "Ce programme s'adresse aux étudiants de niveau intermédiaire qui ont une connaissance moyenne de la langue française. Cependant, un court test sera effectué pour évaluer le niveau des étudiants. Le programme dure 4 mois. L'objectif de ce programme est de faire passer les étudiants d'un niveau intermédiaire à un niveau professionnel. Les étudiants doivent avoir des contacts virtuels avec le tuteur au moins 3 fois par semaine pendant 3 heures.",
      image: Gplay,
    },
    {
      title: "The Exam Preparatory Program",
      englishDescription:
        "This program caters for people who have an exam to write in the near future. For instance French proficiency exam such as TEF, TCF or DALF. This program guarantees success in the exam in one sitting. Students are meant to have virtual contact with tutor at least 4 times in a week for 3 hours.",
      frenchDescription:
        "Ce programme s'adresse aux personnes qui doivent passer un examen prochainement, comme un examen de compétence en français tel que le TEF, le TCF ou le DALF. Ce programme garantit le succès à l'examen en une seule séance. Les étudiants doivent avoir des contacts virtuels avec le tuteur au moins 4 fois par semaine pendant 3 heures.",
      image: Aceexam,
    },
    {
      title: "The French Kiddies Program",
      englishDescription:
        "This program caters to teaching kids between ages 9-13 the French Language. Kids will have virtual contact with tutor at weekends at least once for 3 hours for 4 months.",
      frenchDescription:
        "Ce programme s'adresse à l'enseignement du français aux enfants âgés de 9 à 13 ans. Les enfants auront des contacts virtuels avec le tuteur le week-end, au moins une fois pendant 3 heures, et ce, pendant 4 mois.",
      image: Kid,
    },
    {
      title: "Special Summer Classes for Kiddies",
      englishDescription:
        "These are special classes for kiddies during summer holidays. This is open for kiddies from ages 9-13. This class runs for 3 months. Students will have virtual contact with tutor 3 times per week for 3 hours.",
      frenchDescription:
        "Ce sont des cours spéciaux pour les enfants pendant les vacances d'été. Ces cours sont ouverts aux enfants âgés de 9 à 13 ans. La classe dure 3 mois. Les étudiants auront des contacts virtuels avec le tuteur 3 fois par semaine pendant 3 heures.",
      image:Kid,
    },
    {
      title: "Language Buddy",
      englishDescription:
        "This is a special service where you need someone to speak the French language with you consistently to enhance your learning and comprehension of the language.",
      frenchDescription:
        "Il s'agit d'un service spécial où vous avez besoin de quelqu'un pour parler français avec vous de manière constante afin d'améliorer votre apprentissage et votre compréhension de la langue.",
      image: Opportunities,
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
        <title>Programs - Educational Service</title>
        <meta property="og:description" content="Course programs we are offering." />
        <meta property="og:title" content="Programs - Educational Service" />
        <meta property="og:type" content="website" />
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
