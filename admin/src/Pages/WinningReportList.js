import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const WinningReportList = () => {
  const [results, setResults] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGameId, setSelectedGameId] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");


  // ✅ Fetch games for dropdown
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

  // ✅ Fetch winning bets (with filters)
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get(`/admin/winning-report-list`);
        let data = res.data.results || [];

        // 🟢 Filter by date if selected
        if (selectedDate) {
          data = data.filter((item) =>
            new Date(item.DATE_TIME).toISOString().slice(0, 10) === selectedDate
          );
        }

        // 🟢 Filter by gameId if selected
        if (selectedGameId) {
          data = data.filter((item) => String(item.GAME_ID) === String(selectedGameId));
        }

        // 🟢 Filter by phone
        if (phoneFilter.trim() !== "") {
            data = data.filter((item) =>
              String(item.PHONE)
                .toLowerCase()
                .includes(phoneFilter.toLowerCase())
            );}

        setResults(data);
      } catch (err) {
        console.error("Error fetching winning bets:", err);
      }
    };

    fetchResults();
  }, [selectedDate, selectedGameId, phoneFilter]);

  return (
    <div className="container-fluid my-4">
      <h2 className="mb-3">Winning Report</h2>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">Filter by Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Filter by Game</label>
          <select
            className="form-select"
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
          >
            <option value="">All Games</option>
            {games.map((game) => (
              <option key={game.ID} value={game.ID}>
                {game.NAME}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label fw-bold">Filter by Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone..."
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="table-responsive w-full"
        style={{ maxHeight: "75vh", overflowY: "auto", overflowX: "auto" }}
      >
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>SR.</th>
              <th>Game</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Result</th>
              <th>Win Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {results?.length > 0 ? (
              results.map((item, idx) => (
                <tr key={item.ID}>
                  <td>{idx + 1}</td>
                  <td>{item.GAME}</td>
                  <td>{item.PHONE}</td>
                  <td>{item.TYPE}</td>
                  <td>{item.RESULT}</td>
                  <td>{item.WIN_AMOUNT}</td>
                  <td>{item.STATUS}</td>
                  <td>
                    {new Date(item.DATE_TIME).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No winning bets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinningReportList;
