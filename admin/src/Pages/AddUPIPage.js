import React, { useState , useEffect } from "react";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";

const AddUPIPage = () => {
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

   // Fetch existing UPI details on mount
   useEffect(() => {
    const fetchUPIDetails = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-upi-id"); // 👈 yeh aapka GET API h
        if (res.data) {
          setName(res.data.name || "");
          setUpiId(res.data.upiId || "");
        }
      } catch (err) {
        console.error("Failed to fetch UPI details:", err);
      }
    };

    fetchUPIDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/admin/update-upi-id", {
        name,
        upiId,
      });

      setMessage("✅ UPI details submitted successfully!");
      setName("");
      setUpiId("");
    } catch (err) {
      setMessage("❌ Failed to submit. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grajy-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add UPI Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* UPI ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl shadow hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddUPIPage;
