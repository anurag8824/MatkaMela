import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function ManageResult() {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState("");
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Get success message from URL
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("msg");
    if (message) setMsg(message);

    // Fetch games with today's result
    const fetchGames = async () => {
      try {
        const res = await fetch(`${backUrl}/api/get-games`); 
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };

    fetchGames();
  }, [location.search]);

  return (
    <div className="content-wrapper p-3">
      {/* Page Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Manage Result</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Manage Result</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Alert message */}
      {msg && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {msg} !
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {/* Add Result Button */}
      <div className="mb-3">
        <Link to="/edit_result" className="btn btn-primary">
          Add Result
        </Link>
      </div>

      {/* Results Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-primary text-white text-center">
            <tr>
              <th>Game</th>
              <th>Result 1</th>
              <th>Result 2</th>
              <th>Today's<br />Result</th>
              <th>Old<br />Result</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 ? (
              games.map((game) => (
                <tr key={game.ID}>
                  <td>{game.NAME}</td>
                  <td>{game.RESULT1 || ""}</td>
                  <td>{game.RESULT2 || ""}</td>
                  <td className="text-center">
                    <Link to={`/public/administrator/edit-result/${game.ID}/${game.PAGE}`}>
                      <i className="fa fa-pen"></i>
                    </Link>
                  </td>
                  <td className="text-center">
                    <Link to={`/update_result/${game.ID}`}>
                      <i className="fa fa-pen"></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No games found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
