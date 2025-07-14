import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const goToAlbum = () => {
    navigate("/albums"); // make sure your route matches this path
  };

  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: "url('/your-image-path.webp')",
      }}
    >
      <div className="text-sm tracking-widest mb-4">LATEST ALBUM</div>
      <h1 className="text-5xl font-bold mb-6">Beyond Time</h1>
      <button
        onClick={goToAlbum}
        className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
      >
        Discover
      </button>
    </section>
  );
}

export default Hero;

