import React from "react";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all">
      <div className="text-4xl text-indigo-600 mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
}
