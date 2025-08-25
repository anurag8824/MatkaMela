import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../Utils/axiosInstance";
import { generateUPIQRCode } from "./upiQr";

const Deposit = () => {
  const { money } = useParams(); // amount from URL params
  const [qr, setQr] = useState("");
  const [upi, setUpi] = useState("");
  const [mname, setMname] = useState("");

  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch UPI ID from API
  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-upi-id");// <-- replace with real QR API
        // axios.get me response data res.data me milta hai
        if (res.data) {
          setMname(res.data.name || "");
          setUpi(res.data.upiId || "");
        }

      } catch (err) {
        console.error("QR Fetch Error:", err);
      }
    };

    fetchQr();
  }, []);


  useEffect(() => {
    const createQR = async () => {
      if (upi && money && mname) {   // run only when values are available
        const qrUrl = await generateUPIQRCode(upi, money, mname);
        setQr(qrUrl);
      }
    };
    createQR();
  }, [upi, money, mname]); // dependencies to re-run when these change


  const copyToClipboard = () => {
    navigator.clipboard.writeText(upi);
    alert("UPI ID Copied!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!utr || utr.length < 6) {
      alert("Enter a valid UTR number");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/user-deposit`, {
        utr_number: utr,
        amount: money,
        type: "manual",
        status: "pending",
      });

      // axios me data direct res.data me hota hai
      if (res.data.success) {
        alert("Deposit Submitted Successfully ✅");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-red-600 text-center border-b pb-2">
          Welcome to Matka Mela
        </h2>

        <div className="bg-gray-50 p-3 rounded-lg mt-4 space-y-2">
          <p className="text-sm">Name: <span className="font-medium">{mname}</span></p>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              UPI ID: <span className="font-medium">{upi}</span>
            </p>
            <button
              onClick={copyToClipboard}
              className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          {qr ? (
            <img src={qr} alt="QR Code" className="mx-auto w-48 h-48" />

          ) : (
            <img src={`${backUrl}/qrImage/qrscanner.jpg`} alt="QR Code" className="mx-auto w-48 h-48" />

          )}
          <p className="text-sm text-red-600 mt-2">
            Pay <b>{money}₹</b> using UPI ID or QR Code and enter your UTR number below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block text-sm font-medium">
            Unique Transaction Reference (UTR) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="6 to 12 digit UTR Number"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          // minLength={6}
          // maxLength={12}
          // required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
