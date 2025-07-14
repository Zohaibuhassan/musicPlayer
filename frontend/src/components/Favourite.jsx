import React, { useEffect, useState } from "react";

function Favourite() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favData = localStorage.getItem("favouriteSongs");
    if (favData) setFavourites(JSON.parse(favData));
  }, []);

  const removeFavourite = (filename) => {
    const updated = favourites.filter((song) => song.name !== filename);
    setFavourites(updated);
    localStorage.setItem("favouriteSongs", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6 px-4">
      <h2 className="text-3xl font-bold text-purple-300 mb-6"> Favourite Songs</h2>
      {favourites.length === 0 ? (
        <p className="text-gray-400">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {favourites.map((song, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-400 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <p className="mb-3 text-lg font-semibold text-purple-300 break-all">
                {song.name.replace(/^\d+-/, "")}
              </p>
              <audio controls src={song.url} className="mb-4 w-full max-w-xs rounded-md border border-purple-300" />
              <button
                onClick={() => removeFavourite(song.name)}
                className="px-4 py-2 text-sm border border-purple-400 rounded-full text-purple-300 hover:bg-purple-500 hover:text-white transition"
              >
                Remove Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourite;
