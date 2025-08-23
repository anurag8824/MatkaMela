import React, { useState, useEffect } from "react";
import axios from "axios"
import axiosInstance from "../Utils/axiosInstance";

const EditResult = ({ initialId = "", apiBase }) => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [remark, setRemark] = useState("");
  const [rId, setRId] = useState("");
  const [pattiOptions, setPattiOptions] = useState([]);

  console.log(selectedGameId);
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  
 // Fetch games list
useEffect(() => {
    axios
      .get(`${backUrl}/api/get-games`)
      .then((res) => {
        console.log(res)
        setGames(res.data); // Axios already gives parsed JSON in res.data
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
      });
  }, []);
  

  // Fetch patti options
  useEffect(() => {
    fetch(`${apiBase}/patti-options`)
      .then((res) => res.json())
      .then((data) => setPattiOptions(data))
      .catch(console.error);
  }, [apiBase]);

  // Fetch result details for selected game
  useEffect(() => {
    if (selectedGameId) {
      fetch(`${apiBase}/result/${selectedGameId}`)
        .then((res) => res.json())
        .then((data) => {
          setResult1(data.result1 || "");
          setResult2(data.result2 || "");
          setRemark(data.remark || "");
          setRId(data.rId || "");
        })
        .catch(console.error);
    }
  }, [selectedGameId, apiBase]);


const handleSubmit = async (e) => {
  e.preventDefault();

  // Selected game ka name nikalna
  const selectedGame = games.find((game) => game.ID === selectedGameId);

  const payload = {
    r_id: rId,
    gameId: selectedGameId,
    game_name: selectedGame ? selectedGame.NAME : "",
    openResult: result1,
    closeResult: result2,
    remark, // agar remark bhi bhejna hai to
  };

  try {
    const { data } = await axiosInstance.post(`${backUrl}/api/bet-game-result`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("Result updated successfully!");
    console.log("Response:", data);
  } catch (error) {
    console.error("Error updating result:", error);
    alert("Something went wrong while updating the result!");
  }
};


  return (
    <div className="container my-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.php">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="manage_result.php">Manage Result</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Result
          </li>
        </ol>
      </nav>

      <h1 className="mb-4">Manage Result</h1>

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Game Selector */}
        <div className="col-lg-2">
          <label className="form-label fw-bold">Game</label>
          <select
            className="form-select"
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
            required
          >
            <option value="" disabld>
              Select Game
            </option>
            {games.map((game) => (
              <option key={game.ID} value={game.ID}>
                {game.NAME}
              </option>
            ))}
          </select>
        </div>

       {/* Result 1 Input */}
<div className="col-lg-2">
  <label className="form-label fw-bold">Result 1</label>
  <input
    type="number"
    className="form-control"
    value={result1}
    onChange={(e) => {
    const val = e.target.value;
    if (val.length <= 2) {
      setResult1(val);
    }
  }}
    placeholder="Enter Result 1"
    maxLength={2}
    required
  />
</div>

{/* Result 2 Input */}
<div className="col-lg-2">
  <label className="form-label fw-bold">Result 2</label>
  <input
    type="number"
    className="form-control"
    value={result2}
    onChange={(e) => {
    const val = e.target.value;
    if (val.length <= 2) {
      setResult2(val);
    }
  }}
    placeholder="Enter Result 2"
  
  />
</div>


        {/* Update Button */}
        <div className="col-lg-4 d-flex align-items-end">
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditResult;
