import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo.png";

function ContactUs(onHomeClick) {
  const navigate = useNavigate();

  // Scroll to section handler
  const navigateToSection = (path, ref) => {
    navigate(path);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="contact-us">
      <span onClick={() => navigateToSection("/#home", onHomeClick)}>
        <img className="logo" src={Logo} alt="logo" />
      </span>
      <div className="contact-box">
        <h2>Get in touch</h2>
        <p>You can contact us via:</p>
        <ul className="contact-details">
          <li>
            <strong>Email:</strong> 
            <a href="mailto:lecoqfrenchschool@gmail.com"> lecoqfrenchschool@gmail.com</a>
          </li>
          <li>
            <strong>WhatsApp (DM): </strong> 
            <a href="https://api.whatsapp.com/send?phone=12896984183&text=Hi%20I%20would%20like%20to%3A" target="_blank" rel="noopener noreferrer">
              +1 289-698-4183
            </a>, 
            <a href="https://api.whatsapp.com/send?phone=+2348067524626&text=Hi%20I%20would%20like%20to%3A" target="_blank" rel="noopener noreferrer">
            +234 806-752-4626
            </a>
          </li>
          <li>
            <strong><i className="fab fa-x-twitter"></i>:</strong> <a href="https://x.com/Lecoqfrenchsch">Lecoqfrenchsch</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ContactUs;
