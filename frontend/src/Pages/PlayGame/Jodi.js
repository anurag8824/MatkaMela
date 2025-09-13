import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';

const Jodi = () => {
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const [bets, setBets] = useState(Array(99).fill("")); // 99 inputs ka array
  const [totalPoints, setTotalPoints] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const gameId = useParams().id
  console.log(gameId, "pppp")

  // Input change handler
  const handleInputChange = (index, value) => {
    const updatedBets = [...bets];
    updatedBets[index] = value;
    setBets(updatedBets);
  };

  const maxPoints = 1000;

  useEffect(() => {
    const total = bets.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    setTotalPoints(total);
    setRemainingPoints(maxPoints - total);
  }, [bets]);


  const handlePlaceBet = async () => {
    // Sirf filled inputs ka array banao
    const filledBets = bets
      .map((val, index) => {
        let number;
        if (index === 99) {
          number = "00"; // ✅ last index pe "00"
        } else {
          number = String(index + 1).padStart(2, "0"); // 01, 02 ... 99
        }

        return {
          number,
          value: val,
        };
      })
      .filter((item) => item.value.trim() !== "");

    console.log("Filled Bets:", filledBets); // Send se pehle console

    try {
      setLoading(true); //
      const res = await axiosInstance.post(`${backUrl}/api/bet-game-jodi`, { filledBets, gameId, totalPoints },);
      console.log("API Response:", res?.data);
      toast.success("Bet Placed Successfully ✅");
      window.location.reload(); // reload page on success

    } catch (err) {
      console.error("API Error:", err);
      toast.error(err.response.data.message || "Error placing bet");
    } finally {
      setLoading(false); // ✅ Stop loading
    }

  };
 

  return (
    <div>
    
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-4">
        <div className="text-xs font-semibold">
          Total Points: <span className="text-blue-600">{totalPoints}</span>
        </div>
        <div className="text-xs hidden font-semibold">
          Points Remaining: <span className="text-red-600">{remainingPoints}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">



        {Array.from({ length: 100 }).map((_, i) => {
          // 0 ko "00" banana hai, baaki ko 01..99
          const number = i === 99 ? "00" : String(i + 1).padStart(2, "0");

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1"
            >
              {/* Number */}
              <div className="number bg-[#094c73] text-white flex items-center justify-center w-full h-[52px] border border-[#094c73] text-center">
                {number}
              </div>

              {/* Input */}
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={bets[i]}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) {
                    handleInputChange(i, val);
                  }
                }}
                onKeyDown={(e) => {
                  // "e" (exponential), "+", "-" block karna
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full h-[33px] text-center border bg-transparent focus:outline-none"
              />
            </div>
          );
        })}

      </div>
      {/* Place Bet Button */}
      <button
        onClick={handlePlaceBet}
        disabled={loading} // ✅ disable while loading
        className={`mt-4 w-full text-white py-2 text-lg rounded 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
        `}
      >
        {loading ? "Placing Bet..." : "Place Bet"} {/* ✅ show loading text */}
      </button>


    </div>
  )
}

export default Jodi