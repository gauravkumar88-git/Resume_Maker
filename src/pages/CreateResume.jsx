import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { themes } from "../utils/themes";

export default function CreateResume({ resumeData, setResumeData }) {
  const navigate = useNavigate();

  const [personal, setPersonal] = useState(resumeData.personal || {
    name: "", title: "", email: "", phone: "", linkedin: "", github: "", about: ""
  });

  const [education, setEducation] = useState(resumeData.education || [{ degree: "", college: "", year: "", percentage: "" }]);
  const [experience, setExperience] = useState(resumeData.experience || [{ role: "", company: "", duration: "", desc: "" }]);
  const [projects, setProjects] = useState(resumeData.projects || [{ name: "", desc: "" }]);
  const [skills, setSkills] = useState(resumeData.skills || [""]);
  const [achievements, setAchievements] = useState(resumeData.achievements || [""]);
  const [selectedTheme, setSelectedTheme] = useState(resumeData.theme || "classic");

  // Get current theme
  const theme = themes[selectedTheme] || themes.classic;

  const handleArrayChange = (setter, index, field, value, array) => {
    const newArr = [...array];
    newArr[index][field] = value;
    setter(newArr);
  };

  const addArrayItem = (setter, array, newItem) => setter([...array, newItem]);
  const removeArrayItem = (setter, index, array) => setter(array.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({ personal, education, experience, projects, skills, achievements, theme: selectedTheme });
    navigate("/preview");
  };

  const inputStyle = { borderColor: theme.text, color: theme.text };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-8 overflow-y-auto">
        <h2 style={{ color: theme.header }} className="text-3xl font-bold mb-6 text-center">Build Your Resume</h2>

        {/* Theme Selector */}
        <div className="mb-4">
          <label className="font-semibold mr-2" style={{ color: theme.text }}>Select Theme:</label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2"
            style={{ borderColor: theme.text, color: theme.text }}
          >
            {Object.keys(themes).map((themeKey) => (
              <option key={themeKey} value={themeKey}>
                {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Personal Info */}
        <section className="space-y-4">
          <h3 style={{ color: theme.sectionTitle }} className="text-xl font-semibold border-b pb-1">Personal Info</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} className="border p-3 rounded-lg w-full focus:ring-2" style={inputStyle} required />
            <input type="text" placeholder="Title / Position" value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} className="border p-3 rounded-lg w-full focus:ring-2" style={inputStyle} />
            <input type="email" placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} className="border p-3 rounded-lg w-full focus:ring-2" style={inputStyle} />
            <input type="text" placeholder="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} className="border p-3 rounded-lg w-full focus:ring-2" style={inputStyle} />
            <input type="text" placeholder="LinkedIn" value={personal.linkedin} onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })} className="border p-3 rounded-lg w-full focus:ring-2" style={inputStyle} />
            <input type="text" placeholder="GitHub" value={personal.github} onChange={(e) => setPersonal({ ...personal, github: e.target.value })} className="border p-3 rounded-lg w-full focus:ring-2" style={inputStyle} />
            <textarea placeholder="About / Summary" value={personal.about} onChange={(e) => setPersonal({ ...personal, about: e.target.value })} className="border p-3 rounded-lg w-full col-span-2 focus:ring-2" style={inputStyle}></textarea>
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h3 style={{ color: theme.sectionTitle }} className="text-xl font-semibold border-b pb-1">Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="grid md:grid-cols-4 gap-4 items-end border p-4 rounded-lg relative">
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(setEducation, i, "degree", e.target.value, education)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <input type="text" placeholder="College/University" value={edu.college} onChange={(e) => handleArrayChange(setEducation, i, "college", e.target.value, education)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <input type="text" placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange(setEducation, i, "year", e.target.value, education)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <input type="text" placeholder="Percentage" value={edu.percentage} onChange={(e) => handleArrayChange(setEducation, i, "percentage", e.target.value, education)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              {i > 0 && <button type="button" onClick={() => removeArrayItem(setEducation, i, education)} className="absolute top-2 right-2 text-red-600 font-bold">✕</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setEducation, education, { degree: "", college: "", year: "", percentage: "" })} className="text-teal-600 hover:underline">+ Add Education</button>
        </section>

        {/* Experience */}
        <section className="space-y-4">
          <h3 style={{ color: theme.sectionTitle }} className="text-xl font-semibold border-b pb-1">Experience / Internships</h3>
          {experience.map((exp, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-4 items-end border p-4 rounded-lg relative">
              <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange(setExperience, i, "role", e.target.value, experience)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(setExperience, i, "company", e.target.value, experience)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleArrayChange(setExperience, i, "duration", e.target.value, experience)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <textarea placeholder="Description" value={exp.desc} onChange={(e) => handleArrayChange(setExperience, i, "desc", e.target.value, experience)} className="border p-2 rounded-lg w-full col-span-2 focus:ring-2" style={inputStyle}></textarea>
              {i > 0 && <button type="button" onClick={() => removeArrayItem(setExperience, i, experience)} className="absolute top-2 right-2 text-red-600 font-bold">✕</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setExperience, experience, { role: "", company: "", duration: "", desc: "" })} className="text-teal-600 hover:underline">+ Add Experience</button>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h3 style={{ color: theme.sectionTitle }} className="text-xl font-semibold border-b pb-1">Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} className="grid gap-4 border p-4 rounded-lg relative">
              <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => handleArrayChange(setProjects, i, "name", e.target.value, projects)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
              <textarea placeholder="Description" value={proj.desc} onChange={(e) => handleArrayChange(setProjects, i, "desc", e.target.value, projects)} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle}></textarea>
              {i > 0 && <button type="button" onClick={() => removeArrayItem(setProjects, i, projects)} className="absolute top-2 right-2 text-red-600 font-bold">✕</button>}
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setProjects, projects, { name: "", desc: "" })} className="text-teal-600 hover:underline">+ Add Project</button>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h3 style={{ color: theme.sectionTitle }} className="text-xl font-semibold border-b pb-1">Skills</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {skills.map((s, i) => (
              <input key={i} type="text" placeholder="Skill" value={s} onChange={(e) => { const arr = [...skills]; arr[i] = e.target.value; setSkills(arr); }} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
            ))}
          </div>
          <button type="button" onClick={() => setSkills([...skills, ""])} className="text-teal-600 hover:underline">+ Add Skill</button>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h3 style={{ color: theme.sectionTitle }} className="text-xl font-semibold border-b pb-1">Achievements / Hackathons</h3>
          {achievements.map((a, i) => (
            <input key={i} type="text" placeholder="Achievement" value={a} onChange={(e) => { const arr = [...achievements]; arr[i] = e.target.value; setAchievements(arr); }} className="border p-2 rounded-lg w-full focus:ring-2" style={inputStyle} />
          ))}
          <button type="button" onClick={() => setAchievements([...achievements, ""])} className="text-teal-600 hover:underline">+ Add Achievement</button>
        </section>

        <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition">
          Preview Resume
        </button>
      </form>
    </div>
  );
}
