import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/LandingPage";
import Blog from "./pages/blog";
import Admin from "./pages/adminPanel";
import AdminLogin from "./pages/adminLogin";
import BlogDetails from "./pages/blogDetails";
import Educational from "./pages/EducationalService";
import NonEducational from "./pages/NonEducationalService";
import WhatsappChatBox from "./components/whatsapp";
import ScrollToTopButton from "./components/scrotoTop";
import ContactUs from "./components/contact";
import PrivateRoute from "./utils/privateRoute";
import { db } from "./utils/firebaseConfig"; 
import "./App.css";
import img from "./assets/images/mad-designer.png";

const NormalizePath = ({ children }) => {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/{2,}/g, "/");

  if (normalizedPath !== location.pathname) {
    return <Navigate to={normalizedPath} replace />;
  }
  return children;
};

function App() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Check if the user is on ANY admin-related page
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      <Navbar />
      <NormalizePath>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blog />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/blog/:id" element={<BlogDetails db={db} />} />
          <Route path="/educational-service" element={<Educational />} />
          <Route path="/non-educational-service" element={<NonEducational />} />
          <Route
            path="*"
            element={
              <div className="errorPage">
                <span>
                  Page not found :<strong>404</strong> Check the address again
                </span>
                <img src={img} alt="error" />
              </div>
            }
          />
        </Routes>
      </NormalizePath>
      <WhatsappChatBox />
      <ScrollToTopButton />
      {!isAdminPage && (
        <ContactUs />
      )}
      {!isAdminPage && (
        <footer className="footer">
          &copy; {currentYear} Le Coq French School. All rights reserved.
        </footer>
      )}
    </div>
  );
}

export default App;
