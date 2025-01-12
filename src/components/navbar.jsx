import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo.png";

function Navbar({ onHomeClick, onAboutClick, onContactClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");
    const heroSection = document.getElementById("home");

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (contactSection && scrollPosition >= contactSection.offsetTop) {
      setActiveSection("contact");
    } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
      setActiveSection("about");
    } else if (heroSection && scrollPosition < aboutSection.offsetTop) {
      setActiveSection("home");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Scroll to section handler
  const navigateToSection = (path, ref) => {
    navigate(path);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <div className="nav-children">
        <span onClick={() => navigateToSection("/#home", onHomeClick)}>
          <img className="logo" src={Logo} alt="logo" />
        </span>
        <ul>
          <li>
            <span
              onClick={() => navigateToSection("/#home", onHomeClick)}
              className={activeSection === "home" ? "active-link" : "not-active"}
            >
              home
            </span>
          </li>
          <li>
            <span
              onClick={() => navigateToSection("/#about", onAboutClick)}
              className={activeSection === "about" ? "active-link" : "not-active"}
            >
              about
            </span>
          </li>
          <li className="dropdown" ref={dropdownRef}>
            <span onClick={toggleDropdown} className="dropdown-toggle">
              programs{" "}
              {dropdownOpen ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </span>
            <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
              <li>
                <NavLink
                  to="/educational-service"
                  onClick={closeDropdown}
                >
                  educational service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/non-educational-service"
                  onClick={closeDropdown}
                >
                  non-educational service
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={activeSection === "blogs" ? "active-link" : "not-active"}
            >
              blogs
            </NavLink>
          </li>
          <li>
            <span
              onClick={() => navigateToSection("/#contact", onContactClick)}
              className={activeSection === "contact" ? "active-link" : "not-active"}
            >
              contact
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
