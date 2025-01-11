import React from 'react';

function ContactUs() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>You can contact us via:</p>
      <ul className="contact-details">
        <li>
          <strong>Email:</strong> 
          <a href="mailto:lecoqfrenchschool@gmail.com">lecoqfrenchschool@gmail.com</a>
        </li>
        <li>
          <strong>WhatsApp (DM):</strong> 
          <a href="https://wa.me/12896984183" target="_blank" rel="noopener noreferrer">
            +1 289-698-4183
          </a>, 08067524626
        </li>
        <li>
          <strong>X:</strong> Lecoqfrenchsch
        </li>
      </ul>
      <footer className="footer">
        &copy; {currentYear} Le Coq French School. All rights reserved.
      </footer>
    </div>
  );
}

export default ContactUs;
