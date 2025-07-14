import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Upload from "./components/Upload";
import Album from "./components/Album"; // Import the actual Album component
import FaqSection from "./components/FaqSection";
import Favourite from "./components/Favourite";
import AuthForm from "./components/AuthForm";
// Dummy components (can be replaced later)
function Events() {
  return <div className="text-center mt-20 text-white">📅 Events Page</div>;
}
function News() {
  return <div className="text-center mt-20 text-white">📰 News Page</div>;
}
function Contact() {
  return <div className="text-center mt-20 text-white">📞 Contact Page</div>;
}
function Login() {
  return <div className="text-center mt-20 text-white">🔐 Login/Register</div>;
}

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback to trigger reloading album list after upload
  const handleUpload = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="bg-black text-white min-h-screen font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/upload" element={<Upload onUpload={handleUpload} />} />
          <Route path="/albums" element={<Album key={refreshKey} />} />
          <Route path="/events" element={<FaqSection />} />
          <Route path="/news" element={<Favourite />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
