import React, { useState, useEffect } from "react";
import axios from "axios"
import axiosInstance from "../Utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditResult = ({ initialId = "", apiBase }) => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [remark, setRemark] = useState("");
  const [rId, setRId] = useState("");
  const [pattiOptions, setPattiOptions] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


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

  const today = new Date().toISOString().split("T")[0]; // 👉 YYYY-MM-DD
  const [date, setDate] = useState(today);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Selected game ka name nikalna
    const selectedGame = games.find((game) => game.ID === selectedGameId);
    console.log(selectedGame, "fff")


    const payload = {
      r_id: rId,
      gameId: selectedGameId,
      game_name: selectedGame ? selectedGame.NAME : "",
      openResult: result1,
      closeResult: result2,
      remark, // agar remark bhi bhejna hai to
      resultDate: date,
    };

    try {
      const { data } = await axiosInstance.post(`${backUrl}/api/bet-game-result`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Result updated successfully!");
      console.log("Response:", data);
      window.location.href = '/public/administrator/result/update-number'; // Redirect to manage results page
    } catch (error) {
      console.error("Error updating result:", error);
      alert("Something went wrong while updating the result!");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };


  return (
    <div className="container my-4">

      <label className="block text-sm font-medium text-gray-600 mb-2">
        Select Date:
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />


      <form onSubmit={handleSubmit} className="row g-3">
        {/* Game Selector */}
        <div className="col-lg-2">
          <label className="form-label fw-bold">Market</label>
          <select
            className="form-select"
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(Number(e.target.value))}
            required
          >
            <option value="" disabld>
              Select Market
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
          <label className="form-label fw-bold">Result </label>
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
            placeholder="Declare Result "
            maxLength={2}
            required
          />
        </div>

        {/* Result 2 Input */}
        {/* <div className="col-lg-2">
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
</div> */}


        {/* Update Button */}
        <div className="col-lg-4 d-flex align-items-end">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}  // disable while loading
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditResult;
