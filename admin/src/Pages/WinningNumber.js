import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const WinningNumber = () => {
  const [games, setGames] = useState([]);
  const [holidays, setHolidays] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [result, setResult] = useState("");
  const [bets, setBets] = useState([]); 
  const [selectedBets, setSelectedBets] = useState([]); // ✅ Selected rows
  const [selectAll, setSelectAll] = useState(false); // ✅ Select all
  const [statusType, setStatusType] = useState(""); // ✅ Dropdown type

  // ✅ Games fetch karna
  const fetchGames = async () => {
    try {
      const res = await axiosInstance.get(`/api/get-games`);
      setGames(res.data);
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

  // ✅ Form submit (fetch bets)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedGame || !result) {
      alert("Please fill all fields ❌");
      return;
    }
    try {
      const res = await axiosInstance.post(`/admin/winning-numbers`, {
        gameId: selectedGame,
        date: selectedDate,
        result: result,
      });
      setBets(res.data.data);
      setSelectedBets([]); // reset
      setSelectAll(false);
    } catch (err) {
      console.error("Error fetching bets", err);
      alert("Failed to fetch bets ❌");
    }
  };

  // ✅ Row select
  const handleRowSelect = (bet) => {
    if (selectedBets.find((b) => b.ID === bet.ID)) {
      setSelectedBets(selectedBets.filter((b) => b.ID !== bet.ID));
    } else {
      setSelectedBets([...selectedBets, bet]);
    }
  };

  // ✅ Select All
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBets([]);
      setSelectAll(false);
    } else {
      setSelectedBets(bets);
      setSelectAll(true);
    }
  };

  // ✅ Final submit for selected rows with type
  const handleFinalSubmit = async () => {
    if (!statusType) {
      alert("Please select Paid/Unpaid/Lost/UnLost ❌");
      return;
    }
    if (selectedBets.length === 0) {
      alert("Please select at least one row ❌");
      return;
    }

    const payload = {
      type: statusType,
      finalBets: selectedBets,
    };

    console.log("Payload sending:", payload);

    try {
      const res = await axiosInstance.post(`/api/update-bets-status`, payload);
      alert("Bets updated successfully ✅");
      console.log(res.data);
    } catch (err) {
      console.error("Error updating bets", err);
      alert("Failed to update bets ❌");
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
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />

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

        <input
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Enter Result"
          className="border p-2 rounded w-40"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Result
        </button>
      </form>

      {/* 🔹 Bulk Action */}
      {bets.length > 0 && (
        <div className="mt-4 border p-4 rounded shadow">
          <label>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />{" "}
            Select All
          </label>
          <br />
          <select
            value={statusType}
            onChange={(e) => setStatusType(e.target.value)}
            className="border p-2 rounded mt-2"
          >
            <option value="">Select</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="lost">Lost</option>
            <option value="unLost">UnLost</option>
          </select>
          <br />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            onClick={handleFinalSubmit}
          >
            Submit
          </button>
        </div>
      )}

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
                {/* <th className="px-4 py-2 border">Result</th> */}
                <th className="px-4 py-2 border">Select</th>

              </tr>
            </thead>
            <tbody>
              {bets.map((bet) => (
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
                  <td className={`px-4 py-2 border ${bet.STATUS === "Win" ? "text-green-600 font-semibold" : bet.STATUS === "Loss"  ? "text-red-600 font-semibold"  : ""}`}>{bet.STATUS}</td>
                  {/* <td className="px-4 py-2 border">{bet.RESULT}</td> */}
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={selectedBets.some((b) => b.ID === bet.ID)}
                      onChange={() => handleRowSelect(bet)}
                    />
                  </td>
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
