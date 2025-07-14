import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

function Upload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid audio file.");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      alert("File uploaded successfully!");
      setSelectedFile(null);
      setProgress(0);
      if (onUpload) onUpload();
    } catch (err) {
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white px-4">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-xl border-2 border-dashed border-purple-500 flex flex-col items-center text-center space-y-4">
        <FaCloudUploadAlt className="text-5xl text-purple-400" />

        <h3 className="text-xl font-bold">Select Files Here</h3>

        <label className="cursor-pointer text-sm text-purple-300 border border-purple-500 px-4 py-2 rounded hover:bg-purple-600 hover:text-white transition">
          Browse File to Upload
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <p className="text-gray-400 text-xs">Files Supported: MP3, WAV, M4A</p>

        {selectedFile && (
          <div className="text-purple-300 text-sm">
            {selectedFile.name}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded text-white font-medium disabled:opacity-50 transition"
        >
          Upload
        </button>

        {uploading && (
          <div className="w-full mt-4 bg-purple-800 rounded-full overflow-hidden">
            <div
              className="h-2 bg-purple-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
