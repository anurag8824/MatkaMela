import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const GameLoad = () => {
  const [bets, setBets] = useState([]);
  const [filteredBets, setFilteredBets] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // default = today
  );
  const [selectedGame, setSelectedGame] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-game-load"); 
        setBets(res.data.bets || []);
      } catch (err) {
        console.error("Error fetching bets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  // 🔹 Fetch games list
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axiosInstance.get(`/api/get-games`);
        setGames(res.data || []);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchGames();
  }, []);


    // 🔹 Apply filters (by default only today)
    useEffect(() => {
        let temp = [...bets];
    
        if (applyFilter) {
          // When user clicks Search button → filter by date + game
          if (selectedDate) {
            temp = temp.filter((b) => b.date_time.startsWith(selectedDate));
          }
          if (selectedGame) {
            temp = temp.filter((b) => b.game_id === parseInt(selectedGame));
          }
        } else {
          // Default → only today's bets
          const today = new Date().toISOString().split("T")[0];
          temp = temp.filter((b) => b.date_time.startsWith(today));
        }
    
        setFilteredBets(temp);
      }, [bets, selectedDate, selectedGame, applyFilter]);

  // 🔹 Helper to group bets by type
const groupByType = (types) => {
  const filtered = filteredBets?.filter((b) => types.includes(b.type));
  const map = {};
  let total = 0;
  filtered.forEach((b) => {
    map[b.number] = (map[b.number] || 0) + b.point;
    total += b.point;
  });
  return { map, total };
};

// 🔹 Merge Jodi + Crossing + CopyPaste together
const jodi = groupByType(["Jodi", "Crossing", "CopyPaste"]);
const andarHaraf = groupByType(["AndarHaraf"]);
const baharHaraf = groupByType(["BaharHaraf"]);

  const grandTotal = jodi.total + andarHaraf.total + baharHaraf.total;

  // Fixed numbers for AndarHaraf & BaharHaraf
  const harafNumbers = ["000","111","222","333","444","555","666","777","888","999"];

  if (loading) return <p className="p-4">Loading bets...</p>;

  return (
    <div className="p-4 space-y-10">

        {/* 🔹 Filters */}
        <div className="flex flex-wrap gap-4 items-end border-b pb-4">
        <div>
          <label className="block text-sm font-medium">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Game</label>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Games</option>
            {games.map((g) => (
              <option key={g.ID} value={g.ID}>
                {g.NAME}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setApplyFilter(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

   
      {/* Jodi Section */}
      <div>
      <h2 className="text-xl font-bold mb-4">All Load</h2>
        <h2 className="text-xl font-bold mb-4">
          Jodi (Total Points: {jodi.total})
        </h2>
        <div className="grid md:grid-cols-10 grid-cols-5 gap-2">
          {Array.from({ length: 100 }, (_, i) => {
            const num = i.toString().padStart(2, "0"); // 00–99
            return (
              <div
                key={num}
                className={`border rounded-lg p-2 text-center shadow-sm ${
                  jodi.map[num] ? "bg-yellow-100" : "bg-white"
                }`}
              >
                <p className="font-bold">{num}</p>
                <p className="text-blue-600 font-medium">
                  {jodi.map[num] || ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AndarHaraf Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          AndarHaraf (Total Points: {andarHaraf.total})
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {harafNumbers.map((num) => (
            <div
              key={num}
              className={`border rounded-lg p-2 text-center shadow-sm ${
                andarHaraf.map[num] ? "bg-green-100" : "bg-white"
              }`}
            >
              <p className="font-bold">{num}</p>
              <p className="text-green-600 font-medium">
                {andarHaraf.map[num] || ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BaharHaraf Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          BaharHaraf (Total Points: {baharHaraf.total})
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {harafNumbers.map((num) => (
            <div
              key={num}
              className={`border rounded-lg p-2 text-center shadow-sm ${
                baharHaraf.map[num] ? "bg-red-100" : "bg-white"
              }`}
            >
              <p className="font-bold">{num}</p>
              <p className="text-red-600 font-medium">
                {baharHaraf.map[num] || ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grand Total */}
      <div className="text-center text-2xl font-bold mt-6">
        Grand Total: {grandTotal}
      </div>
    </div>
  );
};

export default GameLoad;
