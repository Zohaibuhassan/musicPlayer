import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 text-sm bg-purple-300 text-white absolute top-0 w-full z-10">
      <div className="text-lg font-semibold tracking-wide">ONE SOUND</div>
      <ul className="flex gap-8">
        <li><Link to="/" className="hover:text-black-400">Home</Link></li>
        <li><Link to="/albums" className="hover:text-purple-300">Playlist</Link></li>
        <li><Link to="/upload" className="hover:text-purple-300">Upload</Link></li>
        <li><Link to="/events" className="hover:text-purple-300">Ask Questions</Link></li>
        <li><Link to="/news" className="hover:text-purple-300">Favourite</Link></li>
        
        <li><Link to="/login" className="hover:text-purple-300">Login / Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
