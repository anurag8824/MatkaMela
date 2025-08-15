import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password:"",
    address: "",
    email: "",
    image: null,
  });

  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("phone", formData.phone);
    payload.append("password", formData.password);
    payload.append("address", formData.address);
    payload.append("email", formData.email);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    

    try {
   
        const response = await axios.post(`${backUrl}/api/register`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Success:", response);
        alert(response.data.message);
      } catch (err) {
        console.error("Error:", err);
        alert("Error submitting the form");
      }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
        <p className="text-center text-sm mt-4">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
    Login
  </Link>
</p>
      </form>
    </div>
  );
}
