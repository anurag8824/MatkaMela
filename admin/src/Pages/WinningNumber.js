import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";

const WinningNumber = () => {
  const [games, setGames] = useState([]);
  const [holidays, setHolidays] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [result, setResult] = useState("");
  const [bets, setBets] = useState([]); // ✅ Bets state


  // ✅ Games fetch karna
  const fetchGames = async () => {
    try {
      const res = await axiosInstance.get(`/api/get-games`);
      setGames(res.data);

      // holiday checkboxes ke liye state banani thi (future ke liye useful hai)
      const holidayState = {};
      res.data.forEach((g) => {
        holidayState[g.id] = g.holiday === "checked";
      });
      setHolidays(holidayState);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // ✅ Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedGame || !result) {
      alert("Please fill all fields ❌");
      return;
    }
    console.log("Submitting:", {
      gameId: selectedGame,
      date: selectedDate,
      result: result,
    });

    try {
      const res = await axiosInstance.post(`/admin/winning-numbers`, {
        gameId: selectedGame,
        date: selectedDate,
        result: result,
      });
      setBets(res.data.data); // ✅ Store bets in state
    } catch (err) {
      console.error("Error fetching bets", err);
      alert("Failed to fetch bets ❌");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">
       Winning Numbers
      </h2>

      {/* 🔹 Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-4 border p-4 rounded shadow-md"
      >
        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Games Dropdown */}
        {/* Games Dropdown */}
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Game</option>
          {games.map((game) => (
            <option key={game.ID} value={game.ID}>
              {game.NAME}
            </option>
          ))}
        </select>


        {/* Result Input */}
        <input
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Enter Result"
          className="border p-2 rounded w-40"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Result
        </button>
      </form>


      {/* 🔹 Bets Table */}
      {bets.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Date Time</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Point</th>
                <th className="px-4 py-2 border">Number</th>
                <th className="px-4 py-2 border">Game Type</th>
                <th className="px-4 py-2 border">Game</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Result</th>
              </tr>
            </thead>
            <tbody>
              {bets?.map((bet) => (
                <tr key={bet.ID} className="text-center">
                  <td className="px-4 py-2 border">{bet.ID}</td>
                  <td className="px-4 py-2 border">
                    {new Date(bet.DATE_TIME).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{bet.PHONE}</td>
                  <td className="px-4 py-2 border">{bet.POINT}</td>
                  <td className="px-4 py-2 border">{bet.NUMBER}</td>
                  <td className="px-4 py-2 border">{bet.TYPE}</td>
                  <td className="px-4 py-2 border">{bet.GAME}</td>
                  <td className="px-4 py-2 border">{bet.STATUS}</td>
                  <td className="px-4 py-2 border">{bet.RESULT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WinningNumber;

