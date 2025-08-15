import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance";

const ShopPage = () => {
  const { id } = useParams();
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const products = [
    { name: "Jaggery", id: "1234", url: "/images/p3.jpg", price: "₹120/kg" },
    { name: "Pulses", id: "123454", url: "/images/p5.jpg", price: "₹95/kg" },
    { name: "Sugar", id: "13434", url: "/images/p7.jpg", price: "₹45/kg" },
    { name: "Salt", id: "13234", url: "/images/p9.jpg", price: "₹20/kg" },
    { name: "Atta", id: "1334", url: "/images/p11.jpg", price: "₹35/kg" },
    {
      name: "Basmati Rice",
      id: "14534",
      url: "/images/p12.jpg",
      price: "₹150/kg",
    },
    { name: "Tea", id: "18934", url: "/images/p13.jpg", price: "₹220/kg" },
    {
      name: "Dry Fruits",
      id: "1364",
      url: "/images/p14.jpg",
      price: "₹500/kg",
    },
  ];

  const product = products.find((p) => p.id === id);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    city: "",
    pincode: "",
  });
  const [images, setImages] = useState({ aadhar: null, photo: null });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("aadharCard", images.aadhar);
    data.append("passportPhoto", images.photo);
    data.append("productId", id);

    try {
      const res = await axiosInstance.post(`${backUrl}/api/user-buy`, data);
      console.log(res.data);
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-xl p-6">
        {/* Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.url}
            alt={product.name}
            className="rounded-xl max-h-[400px] object-contain w-full"
          />
        </div>

        {/* Details & Buy */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-green-600 font-semibold mb-4">
              {product.price}
            </p>
            <p className="text-gray-600 mb-6">
              High-quality {product.name} directly from trusted sources. Fresh,
              organic and best for your home needs.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {showForm ? "Close Form" : "Buy Now"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-j bg-opacity-60 flex items-center justify-center px-1 z-50"
         >
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl  shadow-xl">
          
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6"
        > 
          <h2 className="text-2xl font-semibold text-gray-800">
            Checkout Order <span  onClick={() => setShowForm(!showForm)} className="text-xs text-end grid text-red-500 underline hover:cursor-pointer md:hidden">canel</span>
          </h2>
          

          {/* Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                placeholder="Enter phone number"
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Address
            </label>
            <input
              name="address1"
              placeholder="Address Line 1"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
            <input
              name="address2"
              placeholder="Address Line 2"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
            <input
              name="address3"
              placeholder="Address Line 3"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
            <input
              name="address4"
              placeholder="Address Line 4"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                name="city"
                placeholder="Enter city"
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                name="pincode"
                placeholder="Enter pincode"
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aadhar Card Image
              </label>
              <input
                type="file"
                name="aadhar"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passport Size Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-right gap-2 flex">
            <button
              type="submit"
              className="inline-block px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Submit Order
            </button>

            <button
            onClick={() => setShowForm(!showForm)}
              className="inline-block px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
        </div>
        </div>
      )}


      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(item => (
            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
              <img src={item.url} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-green-600 font-medium">{item.price}</p>
                <a
                  href={`/shopnow/${item.id}`}
                  className="text-sm text-indigo-500 hover:underline mt-2 inline-block"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default ShopPage;
