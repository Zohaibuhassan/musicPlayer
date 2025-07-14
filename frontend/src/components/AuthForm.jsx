// components/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function AuthForm({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState({ error: '', success: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/${mode}`;
    try {
      const res = await axios.post(url, formData);
      setMessage({ error: '', success: `${mode === 'login' ? 'Logged in' : 'Registered'} successfully!` });

      if (mode === 'login') {
        localStorage.setItem('token', res.data.token);
        onLoginSuccess && onLoginSuccess(res.data.user);
      }
    } catch (err) {
      setMessage({ error: err.response?.data?.message || `${mode} failed`, success: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">{mode}</h2>
        {message.error && <p className="text-red-400 mb-4">{message.error}</p>}
        {message.success && <p className="text-green-400 mb-4">{message.success}</p>}

        {mode === 'register' && (
          <div className="mb-4 flex items-center border-b border-gray-600">
            <FaUser className="mr-3" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="bg-transparent text-white w-full py-2 focus:outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-4 flex items-center border-b border-gray-600">
          <FaEnvelope className="mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-transparent text-white w-full py-2 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6 flex items-center border-b border-gray-600">
          <FaLock className="mr-3" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent text-white w-full py-2 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="w-full bg-purple-400 py-2 rounded hover:bg-purple-500">
          {mode === 'login' ? 'LOGIN' : 'REGISTER'}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-purple-400 underline"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setMessage({ error: '', success: '' });
            }}
          >
            {mode === 'login' ? "Don't have an account? Register" : 'Already registered? Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
