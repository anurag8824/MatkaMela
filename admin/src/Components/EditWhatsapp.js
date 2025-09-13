import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../Utils/axiosInstance";

const EditWhatsApp = () => {
  const [whatsapp, setWhatsapp] = useState("");

  // Pehle se saved number fetch karo
  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-whatsapp"); // 👈 API call
        if (res.data?.whatsapp) {
          setWhatsapp(res.data.whatsapp);
        }
      } catch (err) {
        console.error("Error fetching WhatsApp:", err);
      }
    };

    fetchWhatsApp();
  }, []);

  const handleUpdate = async () => {
    if (!whatsapp || whatsapp.length < 10) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }

    try {
      const res = await axiosInstance.post("/admin/edit-whatsapp", { whatsapp });
      if (res.data.success) {
        toast.success("WhatsApp updated successfully ✅");
      } else {
        toast.error(res.data.message || "Failed to update WhatsApp");
      }
    } catch (err) {
      console.error("Error updating WhatsApp:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4 text-center">Edit WhatsApp Number</h2>

      <input
        type="text"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        placeholder="Enter WhatsApp Number"
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditWhatsApp;
