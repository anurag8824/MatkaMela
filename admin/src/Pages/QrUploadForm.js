import React, { useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import AddUPIPage from "./AddUPIPage";

export default function QrUploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("qrImage", file);

    try {
      const res = await axiosInstance.post(
        "/admin/upload-qr",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ QR uploaded successfully!");
    } catch (err) {
      if (err.response) {
        setMessage(`❌ Error: ${err.response.data.error}`);
      } else {
        setMessage("❌ Something went wrong, try again!");
      }
    }
  };


  return (
    <div>
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">Upload QR Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Upload
          </button>
        </form>

        {message && (
          <p className="text-center text-sm font-medium mt-3">{message}</p>
        )}
      </div>

      <div>
      <AddUPIPage/>

      </div>

    </div>


  );
}
