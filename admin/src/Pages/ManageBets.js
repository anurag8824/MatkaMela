import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageBets() {
  const [bets, setBets] = useState([
    {
      "ID": 101,
      "USER_ID": "15",
      "NUMBER": "123",
      "NUMBER1": "456",
      "DATE_TIME": "12/08/2025",
      "DATE": "12/08/2025",
      "AMOUNT": "200",
      "GAME_ID": "37",
      "GAME_NAME": "Kalyan",
      "GAME": "14",
      "TYPE": "Half Sangam",
      "RESULT": "",
      "STATUS": "ACTIVE"
    }
  ]
  );
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("msg");
    if (message) setMsg(message);

    fetch("/api/manage-bets")
      .then((res) => res.json())
      .then((data) => setBets(data))
      .catch((err) => console.error("Error fetching bets:", err));
  }, []);

  const formatNumberField = (bet) => {
    let { TYPE, NUMBER, NUMBER1, GAME } = bet;
    if (TYPE === "Full Sangam") {
      return `Open: ${NUMBER}\nClose: ${NUMBER1}`;
    }
    if (TYPE === "Half Sangam" && GAME === "close") {
      return `Close Patti: ${NUMBER}\nOpen Ank: ${NUMBER1}`;
    }
    if (TYPE === "Half Sangam" && GAME === "open") {
      return `Open Patti: ${NUMBER}\nClose Ank: ${NUMBER1}`;
    }
    return NUMBER;
  };

  const formatGameTime = (bet) => {
    if (bet.GAME_ID === "37") {
      let g = parseInt(bet.GAME, 10);
      if (g < 12) return `${g} AM`;
      if (g > 12) return `${g - 12} PM`;
      if (g === 12) return "12 PM";
    }
    return bet.GAME || "";
  };

  const handleDelete = (bet) => {
    if (!window.confirm("Are you sure you want to delete this bet?")) return;

    fetch(`/api/delete-bet?id=${bet.USER_ID}&b_id=${bet.ID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Bet deleted successfully");
        setBets((prev) => prev.filter((b) => b.ID !== bet.ID));
      })
      .catch((err) => console.error("Error deleting bet:", err));
  };

  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {msg && <span style={{ color: "red" }}>{msg}</span>}
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Manage Bets</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title">Manage Bets</h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction</th>
                    <th>Date</th>
                    <th>Market</th>
                    <th>Game</th>
                    <th>Number</th>
                    <th>Amount</th>
                    <th>Result</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.map((bet) => {
                    let result = bet.RESULT;
                    if (bet.STATUS === "DELETED" && !result) {
                      result = "DELETED";
                    }
                    return (
                      <tr key={bet.ID}>
                        <td>#{bet.ID}</td>
                        <td>{bet.DATE_TIME}</td>
                        <td>{bet.DATE}</td>
                        <td>
                          {bet.GAME_NAME} {formatGameTime(bet)}
                        </td>
                        <td>{bet.TYPE}</td>
                        <td style={{ whiteSpace: "pre-line" }}>
                          {formatNumberField(bet)}
                        </td>
                        <td>{bet.AMOUNT}</td>
                        <td>{result}</td>
                        <td>
                          {!result && bet.STATUS !== "DELETED" && (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(bet)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
