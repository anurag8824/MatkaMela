import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { toast } from "react-toastify";

const Crossing = () => {
    const backUrl = process.env.REACT_APP_BACKEND_URL;

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [points, setPoints] = useState("");
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false); // ✅

  const gameId = useParams().id

  const totalPoints = bets.reduce((sum, bet) => sum + bet.points, 0);
const pointsRemaining = 1000 - totalPoints;


  // Function to generate all 2-digit combinations from two numbers
  const generateCombinations = (n1, n2) => {
    const digits1 = n1.split("");
    const digits2 = n2.split("");
    let combos = [];

    digits1.forEach((d1) => {
      digits2.forEach((d2) => {
        combos.push(d1 + d2);
      });
    });

    return combos;
  };

  const handleAdd = () => {
    if (!num1 || !num2 || !points) {
      alert("Please fill all fields");
      return;
    }

    const combos = generateCombinations(num1, num2);
    const newBets = combos.map((combo) => ({
      number: combo,
      points: Number(points),
    }));

    setBets((prev) => [...prev, ...newBets]);
    setNum1("");
    setNum2("");
    setPoints("");
  };

  const handleDelete = (index) => {
    setBets((prev) => prev.filter((_, i) => i !== index));
  };

  const placeBet = async () => {
    const payload = {
      bets,
      totalPoints,
      gameId,
    };

    console.log("Sending to API:", payload);

    try {
      setLoading(true); 
      const res = await axiosInstance.post(`${backUrl}/api/bet-game-crossing`, payload);
      console.log("Bet placed:", res.data);
      toast.success("Bet placed successfully ✅");
       // ✅ Reset bets + inputs after success
       setBets([]);
       setNum1("");
       setNum2("");
       setPoints("");
       window.location.reload();
    } catch (err) {
      console.error("Error placing bet:", err);
      toast.error(err.response.data.message || "Error placing bet");
    }finally {
      setLoading(false); // ✅ stop loading
    }
  };

  
  return (
    <div className="p-4">
   
      {/* Top Bar */}
      <div className="flex justify-between mb-4 p-2 border rounded bg-gray-100">
        <div>
          <strong>Points Remaining:</strong> {pointsRemaining}
        </div>
        <div>
          <strong>Total Points:</strong> {totalPoints}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white p-3 rounded shadow-sm">
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="form-label">Number 1</label>
            <input
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              inputMode="numeric"
              maxLength="6"
              placeholder="Number"
              className="form-control border p-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="form-label">Number 2</label>
            <input
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              inputMode="numeric"
              maxLength="6"
              placeholder="Number"
              className="form-control border p-2 w-full"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Points"
            className="form-control border p-2 w-full"
          />
        </div>

        <button
          onClick={handleAdd}
          className="btn btn-primary w-full py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Bets List */}
      {bets.length > 0 && (
        <div className="mt-4 border rounded p-3">
          <h3 className="font-bold mb-2">Your Bets</h3>
          <ul className="space-y-2">
            {bets.map((bet, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {bet.number} - {bet.points} pts
                </span>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Place Bet Button */}
      {bets.length > 0 && (
        <button
          onClick={placeBet}
          disabled={loading} // ✅ disable while loading
          className={`w-full mt-6 text-white py-2 rounded 
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {loading ? "Placing Bet..." : "Place Bet"}
        </button>
      )}
    </div>
  );
};

export default Crossing;
