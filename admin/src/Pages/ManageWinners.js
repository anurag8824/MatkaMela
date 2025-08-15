import React, { useEffect, useState } from "react";

export default function ManageWinners() {
  const [winners, setWinners] = useState([
    {
      "id": 1,
      "name": "Rahul",
      "game": "Game 1",
      "amount": 100,
      "win_amount": 500,
      "time": "12/August/2025 15:30"
    }
  ]
  );
  const [msg, setMsg] = useState("");

  // Data load function
  const fetchWinners = () => {
    fetch("/api/winners") // Backend se data fetch karega
      .then((res) => res.json())
      .then((data) => setWinners(data))
      .catch((err) => console.error("Error fetching winners:", err));
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  // Delete winner
  const deleteWinner = (id) => {
    if (!window.confirm("Are you sure you want to delete this winner?")) return;
    fetch(`/api/winners/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message || "Winner deleted successfully");
        fetchWinners();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header mb-3">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {msg && <span style={{ color: "red" }}>{msg}</span>}
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Manage Winners</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="card-title m-0">Winner List</h3>
              <a href="/edit_winner" className="text-white">
                Add Winner <i className="fa fa-plus"></i>
              </a>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Winners</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.length > 0 ? (
                    winners.map((w) => (
                      <tr key={w.id}>
                        <td>
                          <b>{w.name}</b> won <b>₹{w.win_amount}</b> in{" "}
                          {w.game} with ₹{w.amount} bet{" "}
                          <span>{w.time}</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteWinner(w.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No winners found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
