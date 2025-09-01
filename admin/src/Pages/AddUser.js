import axios from "axios";
import React, { useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function AddUser() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        referby: "",
        dob: "",
    });

    const [loading, setLoading] = useState(false);

    const backUrl = process.env.REACT_APP_BACKEND_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post(`/admin/admin-add-user`, formData);

            alert(response.data.message || "User added successfully");
            setFormData({ name: "", phone: "", referby: "", dob: "" }); // clear form
            
        } catch (err) {
            console.error("Error adding user:", err);
            alert(err.response?.data?.message || "Failed to add user");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin: Add User</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Refer By(Optional)</label>
                    <input
                        name="referby"
                        type="text"
                        placeholder="Enter refer code/number"
                        value={formData.referby}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <input
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-lg transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                >
                    {loading ? "Please wait..." : "Add User"}
                </button>
            </form>
        </div>
    );
}
