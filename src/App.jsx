import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/LandingPage";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/blogDetails";
import Educational from "./pages/EducationalService";
import NonEducational from "./pages/NonEducationalService";
import WhatsappChatBox from "./components/whatsapp";
import ScrollToTopButton from "./components/scrotoTop";
import ContactUs from "./components/contact";
import "./App.css";

function App() {
  const contactRef = useRef(null);
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/educational-service" element={<Educational />} />
        <Route path="/non-educational-service" element={<NonEducational />} />
      </Routes>
      <WhatsappChatBox />
      <ScrollToTopButton />
      <section ref={contactRef} id="contact">
        <ContactUs />
      </section>
      <footer className="footer">
        &copy; {currentYear} Le Coq French School. All rights reserved.
      </footer>
    </div>
  );
}

export default App;