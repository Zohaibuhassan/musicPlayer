import React, { useEffect, useState } from "react";
import axios from "axios";

function Album() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/songs");
      setSongs(res.data);
    } catch (err) {
      alert("Failed to load songs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${filename}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/delete/${filename}`);
      fetchSongs(); // Refresh list
    } catch (err) {
      alert("Failed to delete song.");
    }
  };

  const handleFavourite = (song) => {
    const existing = localStorage.getItem("favouriteSongs");
    const favourites = existing ? JSON.parse(existing) : [];

    const alreadyExists = favourites.some((s) => s.name === song.name);
    if (alreadyExists) {
      alert("Already in favourites.");
      return;
    }

    localStorage.setItem("favouriteSongs", JSON.stringify([...favourites, song]));
    alert(`❤️ Added "${song.name.replace(/^\d+-/, "")}" to favourites!`);
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6 px-4">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Your Album</h2>

      {loading ? (
        <p className="text-gray-400 text-lg">🎧 Loading songs...</p>
      ) : songs.length === 0 ? (
        <p className="text-gray-400 text-lg">No songs uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {songs.map((song, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <p className="mb-3 text-lg font-semibold text-purple-300 break-all">
                {song.name.replace(/^\d+-/, "")}
              </p>

              <audio
                controls
                src={song.url}
                className="mb-4 w-full max-w-xs rounded-md border border-purple-400"
              />

              <button
                onClick={() => handleDelete(song.name)}
                className="px-5 py-2 mb-2 rounded-full text-sm font-medium border border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white transition-colors"
              >
                Delete
              </button>

              <button
                onClick={() => handleFavourite(song)}
                className="px-4 py-2 text-sm rounded-full border border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white transition"
              >
                 Add to Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
