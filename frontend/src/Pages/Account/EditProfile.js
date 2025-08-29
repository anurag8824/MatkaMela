import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";

export default function EditProfile() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        axiosInstance
            .get(`/api/getUserInfo`)
            .then((res) => {
                const user = res.data;
                setName(user?.name || "");
                setMobile(user?.mobile || "");
            })
            .catch((err) => console.error("Error fetching user info", err));
    }, []);

    const handleLogout = () => {
        // yaha apna logout ka logic dal
        localStorage.removeItem("token"); // example
        localStorage.removeItem("id"); // example
        localStorage.removeItem("mobile"); // example
        window.location.href("/"); // reload the page to reflect changes

    };


    const handleUpdate = () => {
        axiosInstance
            .post(`/api/edit-profile`, { name, mobile })
            .then((res) => {
                alert("Profile updated successfully!");
                // ✅ Check if mobile was changed → logout
                if (res.data.mobile && res.data.mobile !== localStorage.getItem("mobile")) {
                    handleLogout();
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to update profile");
            });
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            <label className="block mb-2 text-gray-600">Update Your Mobile</label>
            <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block mb-2 text-gray-600">Update Your Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
            />

            <button
                onClick={handleUpdate}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
                Update
            </button>
        </div>
    );
}
