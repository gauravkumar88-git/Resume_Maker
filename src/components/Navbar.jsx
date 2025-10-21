import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold">Next-Gen Resume Builder</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link to="/create" className="hover:text-yellow-300 transition">Create Resume</Link>
        <Link to="/preview" className="hover:text-yellow-300 transition">Preview</Link>
        <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
      </div>
    </nav>
  );
}
