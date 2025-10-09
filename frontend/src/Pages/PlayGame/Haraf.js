import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { toast } from "react-toastify";

const Haraf = () => {

  const backUrl = process.env.REACT_APP_BACKEND_URL;


  const gameId = useParams().id

  const [andarHaraf, setAndarHaraf] = useState(Array(10).fill(""));
  const [baharHaraf, setBaharHaraf] = useState(Array(10).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (type, index, value) => {
    if (type === "andar") {
      const updated = [...andarHaraf];
      updated[index] = value;
      setAndarHaraf(updated);
    } else {
      const updated = [...baharHaraf];
      updated[index] = value;
      setBaharHaraf(updated);
    }
  };

  const totalPoints =
    andarHaraf.reduce((sum, val) => sum + (Number(val) || 0), 0) +
    baharHaraf.reduce((sum, val) => sum + (Number(val) || 0), 0);

  const placeBet = async () => {
    const andarData = andarHaraf
      .map((points, i) => ({
        number: String(i * 111).padStart(3, "0"),
        points: Number(points) || 0,
      }))
      .filter((item) => item.points > 0);

    const baharData = baharHaraf
      .map((points, i) => ({
        number: String(i * 111).padStart(3, "0"),
        points: Number(points) || 0,
      }))
      .filter((item) => item.points > 0);

    const payload = {
      andarHaraf: andarData,
      baharHaraf: baharData,
      totalPoints,
      gameId
    };

    console.log("Sending to API:", payload);

    try {
      setLoading(true);
      const res = await axiosInstance.post(`${backUrl}/api/bet-game-harraf`, payload);
      console.log("Bet placed:", res.data);
      toast.success("Bet placed successfully ✅");

      // ✅ Reset inputs after success
      setAndarHaraf(Array(10).fill(""));
      setBaharHaraf(Array(10).fill(""));
      window.location.reload();
    } catch (err) {
      console.error("Error placing bet:", err);
      toast.error(err.response.data.message || "Error placing bet");
    }
    finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  const renderGrid = (type, data) => (
    <div className="grid grid-cols-5 gap-2">
      {data.map((val, i) => {
        const numberValue = String(i * 111).padStart(3, "0")
        const displayValue = numberValue.slice(-1)
        return (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-1"
        >
          <div className="number bg-[#094c73] text-white flex items-center justify-center w-full h-[52px] border border-[#094c73] text-center">
          {displayValue}
          </div>
          <input
            type="number"
            value={val}
            min="0"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                handleChange(type, i, value);
              }
            }}
            onWheel={(e) => e.target.blur()} // scroll disable
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full h-[33px] text-center border bg-transparent focus:outline-none"
          />

        </div>)
      })}
    </div>
  );

 

  return (
    <div className="p-4">
   
    
      {/* Top Bar */}
      <div className="flex justify-between mb-4 p-2 border rounded bg-gray-100">
        <div>
          <strong>Points Remaining:</strong> 1000
        </div>
        <div>
          <strong>Total Points:</strong> {totalPoints}
        </div>
      </div>

      {/* Andar Haraf */}
      <h2 className="mb-2 font-bold">Andar Haraf</h2>
      {renderGrid("andar", andarHaraf)}

      {/* Bahar Haraf */}
      <h2 className="my-4 font-bold">Bahar Haraf</h2>
      {renderGrid("bahar", baharHaraf)}

      {/* Place Bet Button */}
      {/* Place Bet Button */}
      <button
        onClick={placeBet}
        disabled={loading} // ✅ Disabled while loading
        className={`w-full mt-6 text-white py-2 rounded 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
        `}
      >
        {loading ? "Placing Bet..." : "Place Bet"}
      </button>
    </div>
  );
};

export default Haraf;
