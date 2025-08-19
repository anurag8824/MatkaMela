import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import axiosInstance from "../../Utils/axiosInstance"

export default function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Admin Login API
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backUrl}/admin/login`, formData);
      const { token, username , role } = res.data;
      console.log(res);

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role );

      alert('Admin login successful');
      window.location.href = "/";
    } catch (err) {
      alert('Admin login failed');
      console.error(err);
    }
  };

  

  return (
    <div className='bg-[#094c73] h-screen pt-20'>
      <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4 ">
          <img
            src="/images/blacklogo.png"
            alt="Logo"
            className=" h-20 rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="px-3 text-gray-500">
              👤
            </span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <span className="px-3 text-gray-500">
              🔒
            </span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-2 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
