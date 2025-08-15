import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';

const Jodi = () => {
    const backUrl = process.env.REACT_APP_BACKEND_URL;

    const [bets, setBets] = useState(Array(99).fill("")); // 99 inputs ka array

    const gameId = useParams().id
    console.log(gameId,"pppp")

    // Input change handler
    const handleInputChange = (index, value) => {
      const updatedBets = [...bets];
      updatedBets[index] = value;
      setBets(updatedBets);
    };

    const handlePlaceBet = async () => {
        // Sirf filled inputs ka array banao
        const filledBets = bets
          .map((val, index) => ({
            number: String(index + 1).padStart(2, "0"), // 01, 02, ...
            value: val
          }))
          .filter((item) => item.value.trim() !== "");
    
        console.log("Filled Bets:", filledBets); // Send se pehle console
    
        try {
          const res = await axiosInstance.post(`${backUrl}/api/bet-game-jodi`, {filledBets,gameId}, );
          console.log("API Response:", res.data);
          alert("Bet Placed")
        } catch (err) {
          console.error("API Error:", err);
        }
      };

  return (
    <div>     
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 99 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-1"
        >
          {/* Number */}
          <div className="number bg-[#094c73] text-white flex items-center justify-center w-full h-[52px] border border-[#094c73] text-center">
            {String(i + 1).padStart(2, "0")}
          </div>

          {/* Input */}
          <input
            type="number"
            inputmode="numeric"
            value={bets[i]}
            onChange={(e) => handleInputChange(i, e.target.value)}
            className="w-full h-[33px] text-center border bg-transparent focus:outline-none"
          />
        </div>
      ))}
    </div>
     {/* Place Bet Button */}
     <button
        onClick={handlePlaceBet}
        className="mt-4 w-full bg-green-600 text-white py-2 text-lg rounded hover:bg-green-700"
      >
        Place Bet
      </button>
    
    
    </div>
  )
}

export default Jodi