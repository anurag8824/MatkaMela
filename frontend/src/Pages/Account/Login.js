import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiPhone, FiUser } from 'react-icons/fi';

export default function Login() {
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({ emailOrPhone: '', otp: '' });
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    
  };


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const mobile = localStorage.getItem("mobile");

    if (token && mobile) {
      navigate("/"); // redirect to home if already logged in
    }
  }, [navigate]);





   // Send OTP API
   const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backUrl}/api/send-otp`, {
        phone: formData.emailOrPhone,
      });
      alert("OTP sent successfully!");
      setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
      console.error(err);
    }
  };

  // Verify OTP (Login)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backUrl}/api/login`, formData);
      const { token, user } = res.data;
      console.log(res)

      localStorage.setItem('token', token);
      localStorage.setItem('mobile', user.mobile);
      localStorage.setItem('id', user.id);


      alert('Login successful');
      window.location.href("/")
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

 



  return (
    <div className='bg-[#094c73]  h-screen pt-20'>
    <div class="border-dotted border-2 border-black text-center ring-offset-4 mb-3 mx-3 ring-4 ring-[#094c73] text-lg text-red-500 bg-white font-medium px-1 rounded-md"><h2>फरीदाबाद , गाजियाबाद , गली और दिसावर गेम खेलने के वाले नीचे से एप्लीकेशन डाउनलोड करे । यहां मिलता है आपको सबसे ज्यादा रेट 10 के 980 और सबसे फास्ट एंड सैफ पेमेंट ।</h2></div>
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
     <div className="flex justify-center mb-4 ">
        <img
          src="/images/blacklogo.png"
          alt="Logo"
          className=" h-20 rounded-full border-4 border-gray-200 shadow-md"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">
        {step === 1 ? "Login" : "Enter OTP"}
      </h2>
     
      <form   onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-4">


     { step === 1 && (<div className="flex items-center border rounded-lg overflow-hidden">
      {/* Icon */}
      <span className="px-3 text-gray-500">
        <FiUser size={18} />
      </span>

      {/* Input */}
      <input
        name="emailOrPhone"
        type="text"
        placeholder="Mobile Number"
        onChange={handleChange}
        required
        className="w-full p-2 outline-none"
      />
    </div>)}


    {step === 2 && (
          <input
            name="otp"
            type="text"
            placeholder="Enter OTP"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg text-center tracking-widest"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {step === 1 ? "Send OTP" : "Verify & Login"}
        </button>
      
      </form>
    </div>
    </div>
  );
}
