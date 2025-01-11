import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Blog from "./pages/Blog";
import Educational from "./pages/EducationalService";
import NonEducational from "./pages/NonEducationalService";
import WhatsappChatBox from "./components/whatsapp"
import "./App.css"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/educational-service" element={<Educational />} />
        <Route path="/non-educational-service" element={<NonEducational />} />
      </Routes>
      <WhatsappChatBox/>
    </div>
  );
}

export default App;