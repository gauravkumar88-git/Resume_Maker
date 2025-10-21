import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateResume from "./pages/CreateResume";
import PreviewResume from "./pages/PreviewResume";
import About from "./pages/About";

export default function App() {
  const [resumeData, setResumeData] = useState({
    personal: {},
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    theme: "classic",
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateResume resumeData={resumeData} setResumeData={setResumeData} />} />
        <Route path="/preview" element={<PreviewResume resumeData={resumeData} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}
