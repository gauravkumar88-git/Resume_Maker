import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { themes } from "../utils/themes";

export default function PreviewResume({ resumeData }) {
  const pdfRef = useRef();

  if (!resumeData.personal.name) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Please fill the resume form first.
      </p>
    );
  }

  const theme = themes[resumeData.theme] || themes.classic;

  // Dynamically adjust font size
  const [fontSizes, setFontSizes] = useState({
    header: 30,
    subHeader: 20,
    text: 16,
  });

  useEffect(() => {
    const totalLength = 
      resumeData.personal.about.length +
      resumeData.education.reduce((sum, e) => sum + e.degree.length + e.college.length, 0) +
      resumeData.experience.reduce((sum, e) => sum + e.role.length + e.company.length + e.desc.length, 0) +
      resumeData.projects.reduce((sum, p) => sum + p.name.length + p.desc.length, 0) +
      resumeData.skills.join(" ").length +
      resumeData.achievements.join(" ").length;

    // Simple scaling: reduce text sizes if content is long
    if (totalLength > 2000) {
      setFontSizes({ header: 22, subHeader: 16, text: 12 });
    } else if (totalLength > 1500) {
      setFontSizes({ header: 24, subHeader: 16, text: 12 });
    } else if (totalLength > 1000) {
      setFontSizes({ header: 26, subHeader: 17, text: 13 });
    }
  }, [resumeData]);

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    const pdfElement = pdfRef.current;
    pdfElement.style.width = "794px"; // Approx A4 width at 96dpi
    pdfElement.style.backgroundColor = "#ffffff"; // solid bg

    try {
      const canvas = await html2canvas(pdfElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personal.name || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Error generating PDF. Use only solid colors (no gradients).");
    } finally {
      pdfElement.style.width = "auto";
    }
  };

  const textStyle = { color: theme.text, fontSize: fontSizes.text };
  const headerStyle = { color: theme.header, fontSize: fontSizes.header };
  const subHeaderStyle = { color: theme.sectionTitle, fontSize: fontSizes.subHeader };

  return (
    <div className="p-8 flex flex-col items-center bg-gray-100 min-h-screen">
      <div
        ref={pdfRef}
        className="w-full max-w-3xl p-8"
        style={{ backgroundColor: "#ffffff", color: theme.text }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div>
            <h1 style={headerStyle} className="font-bold">{resumeData.personal.name}</h1>
            <p style={textStyle}>{resumeData.personal.title}</p>
          </div>
          <div className="mt-2 md:mt-0 space-y-1" style={textStyle}>
            {resumeData.personal.email && <p>Email: {resumeData.personal.email}</p>}
            {resumeData.personal.phone && <p>Phone: {resumeData.personal.phone}</p>}
            {resumeData.personal.linkedin && <p>LinkedIn: {resumeData.personal.linkedin}</p>}
            {resumeData.personal.github && <p>GitHub: {resumeData.personal.github}</p>}
          </div>
        </div>

        {/* About */}
        {resumeData.personal.about && (
          <div className="mb-4">
            <h2 style={subHeaderStyle} className="mb-1 font-semibold">About</h2>
            <p style={textStyle}>{resumeData.personal.about}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-4">
            <h2 style={subHeaderStyle} className="mb-1 font-semibold">Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="mb-1" style={textStyle}>
                <p className="font-semibold">{edu.degree} - {edu.college}</p>
                <p>{edu.year} | {edu.percentage} percentage/cgpa </p>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-4">
            <h2 style={subHeaderStyle} className="mb-1 font-semibold">Experience</h2>
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="mb-1" style={textStyle}>
                <p className="font-semibold">{exp.role} - {exp.company}</p>
                <p>{exp.duration}</p>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-4">
            <h2 style={subHeaderStyle} className="mb-1 font-semibold">Projects</h2>
            {resumeData.projects.map((proj, i) => (
              <div key={i} className="mb-1" style={textStyle}>
                <p className="font-semibold">{proj.name}</p>
                <p>{proj.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-4">
            <h2 style={subHeaderStyle} className="mb-1 font-semibold">Skills</h2>
            <p style={textStyle}>{resumeData.skills.join(", ")}</p>
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <div className="mb-4">
            <h2 style={subHeaderStyle} className="mb-1 font-semibold">Achievements / Hackathons</h2>
            <ul className="list-disc ml-5" style={textStyle}>
              {resumeData.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
