import React, { useState } from 'react'
import { FaUniversity } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import axiosInstance from '../../Utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


const AddPoint = () => {
  const [amount, setAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  const handleAddPoints = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter amount");
      return;
    }

    if (amount < 100) {
      toast.error("Minimum deposit amount of 100");
      return;
    }

    try {
      // ✅ Pehle API call karte hain deposit entry create karne ke liye
      const res = await axiosInstance.post(`/api/user-deposit`, {
        utr_number: "",   // blank
        amount: amount,   // jo user ne select kiya hai
        type: "manual",
        status: "pending",
      });

      if (res.data.success) {
        toast.success("Deposit entry created ✅");
      } else {
        toast.error(res.data.message || "Failed to create deposit entry");
        return; // agar fail hua toh navigate mat karo
      }

      navigate(`/deposit/${amount}`);

    }catch (error) {
      console.error("Error creating deposit entry:", error);
      toast.error("Something went wrong while creating deposit entry");
    }
};

    return (
      <div> {/* Input with icon */}

        <div className="relative mb-4">
          <FaUniversity className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-10 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Quick amount buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[100, 200, 300, 500, 1000, 2000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className="border rounded py-2 bg-gray-100 hover:bg-gray-200 text-sm"
            >
              {amt}
            </button>
          ))}
        </div>

        {/* Red info text */}
        <p className="text-red-500 text-center text-sm mb-4">
          Your Amount will be deposit in 5 to 10 minutes
        </p>

        {/* Action buttons */}
        <div className='flex gap-1 '>
          <button onClick={handleAddPoints} className="w-full bg-[#094c73] text-white py-2 rounded ">
            Add Points
          </button>
          <button onClick={() => setShowPopup(true)} className="w-full hidden bg-[#094c73] text-white py-2 rounded">
            Transfer Points
          </button>
        </div>


        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-4 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <IoClose size={24} />
              </button>

              {/* Logo */}
              <div className="flex justify-center mb-3">
                <img
                  src="/images/blacklogo.png"
                  alt="logo"
                  className="h-12"
                />
              </div>

              {/* Info Text */}
              <p className="text-center text-sm text-gray-600 mb-4">
                Please enter details to transfer points
              </p>

              {/* Mobile Input */}
              <input
                type="number"
                placeholder="Enter Mobile Number"
                className="w-full border rounded px-3 py-2 mb-3"
              />

              {/* Amount Input */}
              <input
                type="number"
                placeholder="Enter Amount"
                className="w-full border rounded px-3 py-2 mb-3"
              />

              {/* OTP Row */}
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  placeholder="Enter OTP"
                  className="flex-1 border rounded px-3 py-2"
                />
                <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                  Send OTP
                </button>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Submit
              </button>
            </div>
          </div>
        )}

      </div>
    )
  }

  export default AddPoint