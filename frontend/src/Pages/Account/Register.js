import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import PWAInstallButton from "../../Components/PWAInstallButton";
import DownLoadApk from "../../Components/DownloadApk";

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

      toast.success(response.data.message || "OTP sent successfully");
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

      toast.success("Registered successfully");
      navigate("/login"); // Redirect to home or dashboard
    } catch (err) {
      console.error("Error registering:", err);
      alert("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('images/register.jpg')" }} // 👈 apna background image path yahan dalen
    >

      {/* Dark Overlay */}
      <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }} className="absolute inset-0 "></div>



      {/* Main Content */}
      <div className="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
        <div class="border-dotted border-2 border-black text-center ring-offset-4 mb-3 mx-3 ring-4 ring-[#094c73] text-base text-red-500 bg-white font-medium px-1 rounded-md">
          <h2>फरीदाबाद , गाजियाबाद , गली और दिसावर गेम खेलने के वाले नीचे से एप्लीकेशन डाउनलोड करे । यहां मिलता है आपको सबसे ज्यादा रेट 10 के 980 और सबसे फास्ट एंड सैफ पेमेंट ।</h2>
        </div>
        <div className="flex justify-center mb-6">
          <img
            src="/images/blacklogo.png"
            alt="Logo"
            className="h-20 w-auto rounded-full border-48 border-white8 shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Register
        </h2>

        {/* Step 1 */}
        {step === 1 && (
          <><form onSubmit={handleSendOtp} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input
                name="phone"
                type="text"
                placeholder="Enter mobile number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
            </div>

            {/* Refer Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Refer Number (optional)</label>
              <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-3 text-gray-500">
                  <FiUser size={18} />
                </span>
                <input
                  name="referby"
                  type="number"
                  placeholder="Refer code"
                  value={formData.referby}
                  onChange={handleChange}
                  className="w-full px-3 py-2 outline-none" />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"}`}
            >
              {loading ? "Please wait..." : "Send OTP"}
            </button>




            <p className="text-center text-sm mt-4 text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
            <PWAInstallButton />


          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Enter OTP</label>
              <input
                name="otp"
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center tracking-widest focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white shadow-md"
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
