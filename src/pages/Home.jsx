import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard.jsx";
import { FaRegFileAlt, FaGraduationCap, FaTrophy, FaProjectDiagram } from "react-icons/fa";

export default function Home() {
  const features = [
    { icon: <FaRegFileAlt />, title: "Dynamic Resume", desc: "Auto-updates with achievements" },
    { icon: <FaGraduationCap />, title: "Courses & Certifications", desc: "Showcase all learning milestones" },
    { icon: <FaTrophy />, title: "Hackathons & Awards", desc: "Highlight your competitions" },
    { icon: <FaProjectDiagram />, title: "Projects & Skills", desc: "Display real-world projects & skills" },
  ];

  return (
    <div>
      <section className="bg-gradient-to from-indigo-50 to-blue-50 p-16 text-center">
        <h2 className="text-5xl font-bold text-green-700 mb-4">Next-Gen Resume Builder</h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">Build dynamic resumes automatically from real achievements.</p>
        <Link to="/create" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Get Started</Link>
      </section>

      <section className="py-16 bg-white text-center">
        <h3 className="text-3xl font-bold mb-12 text-green-700">Features</h3>
        <div className="grid md:grid-cols-4 gap-8 px-8 text-cyan-700 ">
          {features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>
    </div>
  );
}
