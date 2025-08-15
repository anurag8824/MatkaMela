import React, { useEffect, useState } from "react";
import axios from "axios"

export default function Refresh() {
  const [games, setGames] = useState([{
    "ID": 37,
    "NAME": "Starline Game",
    "PLAY": "checked"
  }
  ]);
  const [msg, setMsg] = useState("");
  const [timeInputs, setTimeInputs] = useState({}); // track time inputs by game id 37 (or others if needed)

  useEffect(() => {
    async function fetchGames() {
      try {
        // Fetch games with same logic as your PHP query
        // Your backend should implement this endpoint accordingly
        const res = await axios.get("/api/games?date=today");
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
        setMsg("Failed to load games.");
      }
    }
    fetchGames();
  }, []);

  // Handle input change for time (only relevant for game ID 37)
  const handleTimeChange = (gameId, value) => {
    setTimeInputs((prev) => ({
      ...prev,
      [gameId]: value
    }));
  };

  // Handle submit for game ID 37 time form
  const handleTimeSubmit = async (e, gameId) => {
    e.preventDefault();
    const time = timeInputs[gameId];
    if (!time || time < 10 || time > 22) {
      alert("Please enter a valid time between 10 and 22");
      return;
    }
    try {
      // Example POST request to your backend to refresh_check1.php equivalent
      const res = await fetch("/api/refresh_check1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, game: gameId })
      });
      if (res.ok) {
        alert("Refreshed successfully.");
      } else {
        alert("Failed to refresh.");
      }
    } catch (error) {
      alert("Error refreshing.");
      console.error(error);
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {msg && <span style={{ color: "red" }}>{msg}</span>}
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="index.php">Home</a>
                </li>
                <li className="breadcrumb-item active">Report</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header border-transparent bg-gradient-primary">
                  <h3 className="card-title">Report</h3>
                </div>
                <div className="card-body p-0">
                  <div className="card-body">
                    <table className="table table-bordered table-striped" id="example2">
                      <thead>
                        <tr>
                          <th>Market</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {games.length === 0 && (
                          <tr>
                            <td colSpan="3" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        )}
                        {games.map(({ ID, NAME }) => {
                          if (ID === 37) {
                            return (
                              <tr key={ID}>
                                <td>{NAME}</td>
                                <td>
                                  <form onSubmit={(e) => handleTimeSubmit(e, ID)}>
                                    <input
                                      type="number"
                                      name="time"
                                      className="form-control"
                                      placeholder="Time (10-22)"
                                      value={timeInputs[ID] || ""}
                                      onChange={(e) => handleTimeChange(ID, e.target.value)}
                                    />
                               
                                    <button type="submit" className="btn btn-primary">
                                      Submit
                                    </button>
                                  </form>
                                </td>
                              </tr>
                            );
                          } else {
                            return (
                              <React.Fragment key={ID}>
                                <tr>
                                  <td>{NAME}</td>
                                  <td>Open</td>
                                  <td>
                                    <a href={`refresh_check.php?game=${ID}&type=open`}>
                                      <i className="fa fa-sync-alt"></i>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>{NAME}</td>
                                  <td>Close</td>
                                  <td>
                                    <a href={`refresh_check.php?game=${ID}&type=close`}>
                                      <i className="fa fa-sync-alt"></i>
                                    </a>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
