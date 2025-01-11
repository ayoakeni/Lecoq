import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo/logo.png";

function Navbar({ onAboutClick, onContactClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Track the active section
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");

    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (contactSection && scrollPosition >= contactSection.offsetTop) {
      setActiveSection("contact");
    } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
      setActiveSection("about");
    } else {
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

  return (
    <nav>
      <div className="nav-children">
        <NavLink to="/">
          <img className="logo" src={Logo} alt="logo" />
        </NavLink>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive || activeSection === "home" ? "active-link" : "not-active"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <span
              onClick={() => {
                onAboutClick();
                setActiveSection("about");
              }}
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
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/educational-service"
                    className={({ isActive }) =>
                      isActive ? "active-link" : "not-active"
                    }
                  >
                    Educational Service
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/non-educational-service"
                    className={({ isActive }) =>
                      isActive ? "active-link" : "not-active"
                    }
                  >
                    Non-Educational Service
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active"
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <span
              onClick={() => {
                onContactClick();
                setActiveSection("contact");
              }}
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
