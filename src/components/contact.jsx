import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo/logo.png";

function ContactUs() {
  return (
    <div className="contact-us">
      <NavLink to="/">
        <img className="logo" src={Logo} alt="logo" />
      </NavLink>
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
            <a href="https://wa.me/12896984183" target="_blank" rel="noopener noreferrer">
              +1 289-698-4183
            </a>, 
            <a href="https://wa.me/+2348067524626" target="_blank" rel="noopener noreferrer">
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
