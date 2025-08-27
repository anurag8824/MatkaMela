import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    referby: "",
    otp: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backUrl}/api/send-otp`, {
        name: formData.name,
        phone: formData.phone,
        referby: formData.referby,
      });

      alert(response.data.message || "OTP sent successfully");
      setStep(2); // Move to OTP step
    } catch (err) {
      console.error("Error sending OTP:", err);
        toast.error(err.response.data.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify & Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backUrl}/api/login`, {
        // name: formData.name,
        phone: formData.phone,
        // referby: formData.referby,
        otp: formData.otp,
      });

      alert("Registered successfully");
      navigate("/login"); // Redirect to home or dashboard
    } catch (err) {
      console.error("Error registering:", err);
      alert("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className='bg-[#094c73]  h-screen pt-20'>
       <div class="border-dotted border-2 border-black text-center ring-offset-4 mb-3 mx-3 ring-4 ring-[#094c73] text-lg text-red-500 bg-white font-medium px-1 rounded-md">
        <h2>फरीदाबाद , गाजियाबाद , गली और दिसावर गेम खेलने के वाले नीचे से एप्लीकेशन डाउनलोड करे । यहां मिलता है आपको सबसे ज्यादा रेट 10 के 980 और सबसे फास्ट एंड सैफ पेमेंट ।</h2>
      </div>
   
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">

    <div className="flex justify-center mb-4 ">
          <img
            src="/images/blacklogo.png"
            alt="Logo"
            className=" h-20 rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>
    
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {/* Step 1: Name, Phone, ReferBy */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
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
            <label className="block text-sm font-medium mb-1">Refer Number (optional)</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500">
                <FiUser size={18} />
              </span>
              <input
                name="referby"
                type="number"
                placeholder="Refer code"
                value={formData.referby}
                onChange={handleChange}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Please wait..." : "Send OTP"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
              Login
            </Link>
          </p>
        </form>
      )}

      {/* Step 2: OTP + Register */}
      {step === 2 && (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg text-center tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Please wait..." : "Verify & Register"}
          </button>
        </form>
      )}
    </div>

    </div>
  );
}
