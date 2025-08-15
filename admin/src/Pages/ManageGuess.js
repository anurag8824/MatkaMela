import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ManageGuess() {
  const [games, setGames] = useState([
    {
      "ID": 1,
      "NAME": "Game 1",
      "open1": "12",
      "open2": "34",
      "open3": "56",
      "open4": "78",
      "jodi1": "11",
      "jodi2": "22",
      "jodi3": "33",
      "jodi4": "44",
      "patti1": "123",
      "patti2": "234",
      "patti3": "345",
      "patti4": "456"
    }
  ]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("msg");
    if (message) setMsg(message);

    fetch("/api/manage-guess")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  const handleChange = (gameId, field, value) => {
    setGames((prevGames) =>
      prevGames.map((g) =>
        g.ID === gameId ? { ...g, [field]: value } : g
      )
    );
  };

  const handleSubmit = (game) => {
    fetch("/api/guess-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Guess updated successfully");
      })
      .catch((err) => console.error("Error updating guess:", err));
  };

  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Manage Guess</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Manage Guess</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {msg && (
        <div className="alert alert-success alert-dismissible fade show">
          {msg}
          <button
            type="button"
            className="close"
            onClick={() => setMsg("")}
          >
            <span>&times;</span>
          </button>
        </div>
      )}

      {/* Games List */}
      <div className="container-fluid">
        <div className="row">
          {games.map((game) => (
            <div key={game.ID} className="col-12 mb-4 p-3 border rounded">
              <h5 className="mb-3">{game.NAME}</h5>

              <div className="row">
                {/* Open */}
                {["open1", "open2", "open3", "open4"].map((field, i) => (
                  <div key={field} className="col-lg-3 mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`Open ${i + 1}`}
                      value={game[field] || ""}
                      onChange={(e) =>
                        handleChange(game.ID, field, e.target.value)
                      }
                    />
                  </div>
                ))}

                {/* Jodi */}
                {["jodi1", "jodi2", "jodi3", "jodi4"].map((field, i) => (
                  <div key={field} className="col-lg-3 mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`Jodi ${i + 1}`}
                      value={game[field] || ""}
                      onChange={(e) =>
                        handleChange(game.ID, field, e.target.value)
                      }
                    />
                  </div>
                ))}

                {/* Patti */}
                {["patti1", "patti2", "patti3", "patti4"].map((field, i) => (
                  <div key={field} className="col-lg-3 mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`Patti ${i + 1}`}
                      value={game[field] || ""}
                      onChange={(e) =>
                        handleChange(game.ID, field, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="text-right">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(game)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
