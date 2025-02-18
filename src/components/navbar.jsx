import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo-full.png";

function Navbar({ onHomeClick, onAboutClick, onContactClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      (!hamburgerRef.current || !hamburgerRef.current.contains(event.target))
    ) {
      setMobileMenuOpen(false);
    }
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");
    const homeSection = document.getElementById("home");

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (contactSection && scrollPosition >= contactSection.offsetTop) {
      setActiveSection("contact");
    } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
      setActiveSection("about");
    } else if (homeSection && scrollPosition < aboutSection.offsetTop) {
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

  const navigateToSection = (path, onClick) => {
    navigate(path);
    if (onClick) onClick();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="nav-children">
        <span onClick={() => navigateToSection("/#home", onHomeClick)}>
          <img className="logo" src={Logo} alt="logo" />
        </span>
        <button
          className="hamburger"
          onClick={toggleMobileMenu}
          ref={hamburgerRef}
        >
          <i className={mobileMenuOpen ? "fa-solid fa-times" : "fa-solid fa-bars"}></i>
        </button>
        <ul
          ref={mobileMenuRef}
          className={`menu ${mobileMenuOpen ? "open" : "close"}`}
        >
          <li>
            <span
              onClick={() => navigateToSection("/#home", onHomeClick)}
              className={activeSection === "home" ? "active-link" : "not-active"}
            >
              Home
            </span>
          </li>
          <li>
            <span
              onClick={() => navigateToSection("/#about", onAboutClick)}
              className={activeSection === "about" ? "active-link" : "not-active"}
            >
              
              About
            </span>
          </li>
          <li className="dropdown" ref={dropdownRef}>
            <span onClick={toggleDropdown} className="dropdown-toggle">
              Programs{" "}
              {dropdownOpen ? (
                <i className="fa-solid fa-chevron-up"></i>
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </span>
            <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
              <li>
                <NavLink to="/educational-service" onClick={(closeDropdown,closeMobileMenu)}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "not-active"
                  }
                  >
                  Educational services
                </NavLink>
              </li>
              <li>
                <NavLink to="/non-educational-service" onClick={(closeDropdown,closeMobileMenu)}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "not-active"
                  }
                  >
                  Non-educational services
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/blogs"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active"
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <span
              onClick={() => navigateToSection("/#contact", onContactClick)}
              className={activeSection === "contact" ? "active-link" : "not-active"}
            >
              Contact
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
