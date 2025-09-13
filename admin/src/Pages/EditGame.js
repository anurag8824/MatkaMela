import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";

export default function EditGame() {
  const { id } = useParams(); // URL se game id
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [formData, setFormData] = useState({
    ID: id,   // 👈 ID bhi bhejna hai
    NAME: "",
    TIME1: "",
    TIME2: "",
    RTIME:"",
    POSITION: "",
    RATE: "",
    PAGE: "",
    GUESS: "",
    HIGHLIGHT: "",
    PANEL_RESULT: "",
    JODI_RESULT: "",
    DAYS: "",
    AUTO_GUESS: "",
    COLOR: "",
    PLAY: "",
  });

  // 🔹 Fetch Games List
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axiosInstance.get("/api/get-games"); // game list API
        const selectedGame = res.data.find((g) => g.ID === parseInt(id));
        if (selectedGame) {
          setGame(selectedGame);
          setFormData(selectedGame); // form prefill
        }
      } catch (err) {
        console.error("Error fetching games", err);
      }
    };

    fetchGames();
  }, [id]);

  // 🔹 Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Submit Handler (Update API Call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData , );
    try {
      const res = await axiosInstance.post("/admin/edit-game", formData , {
       
      });
      console.log(res,"ress")
      if (res.status === 200) {
        alert("✅ Game updated successfully!");
        navigate("/public/administrator/game/game-name-list"); // update ke baad redirect karna ho toh
      }
    } catch (err) {
      console.log("Error updating game:", err);
      alert("❌ Failed to update game!");
    }
  };

  if (!game) {
    return <p className="text-center mt-6">Loading game data...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Game - {game.NAME}</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Game Name */}
        <div>
          <label className="block font-semibold">Game Name</label>
          <input
            type="text"
            name="NAME"
            value={formData.NAME}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Time 1 */}
        <div>
          <label className="block font-semibold">Open Time</label>
          <input
            type="time"
            name="TIME1"
            value={formData.TIME1}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Time 2 */}
        <div>
          <label className="block font-semibold">Close Time</label>
          <input
            type="time"
            name="TIME2"
            value={formData.TIME2}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        {/* RTime */}
        <div>
          <label className="block font-semibold">Result Time</label>
          <input
            type="time"
            name="RTIME"
            value={formData.RTIME}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>




        {/* Position */}
        <div>
          <label className="block font-semibold">Position</label>
          <input
            type="number"
            name="POSITION"
            value={formData.POSITION}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

      {/* Rate */}
        <div>
          <label className="block font-semibold">Rate</label>
          <input
            type="number"
            name="RATE"
            value={formData.RATE}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Page */}
        <div>
          <label className="block font-semibold">Page</label>
          <input
            type="text"
            name="PAGE"
            value={formData.PAGE}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Guess */}
        <div>
          <label className="block font-semibold">Guess</label>
          <input
            type="text"
            name="GUESS"
            value={formData.GUESS}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Highlight */}
        <div>
          <label className="block font-semibold">Highlight</label>
          <input
            type="text"
            name="HIGHLIGHT"
            value={formData.HIGHLIGHT}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Panel Result */}
        <div>
          <label className="block font-semibold">Panel Result</label>
          <input
            type="text"
            name="PANEL_RESULT"
            value={formData.PANEL_RESULT}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Jodi Result */}
        <div>
          <label className="block font-semibold">Jodi Result</label>
          <input
            type="text"
            name="JODI_RESULT"
            value={formData.JODI_RESULT}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Days */}
        <div>
          <label className="block font-semibold">Days</label>
          <input
            type="number"
            name="DAYS"
            value={formData.DAYS}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Auto Guess */}
        <div>
          <label className="block font-semibold">Auto Guess</label>
          <input
            type="text"
            name="AUTO_GUESS"
            value={formData.AUTO_GUESS}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block font-semibold">Color</label>
          <input
            type="text"
            name="COLOR"
            value={formData.COLOR}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Play */}
        <div>
          <label className="block font-semibold">Play</label>
          <select
            name="PLAY"
            value={formData.PLAY}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select</option>
            <option value="checked">Checked</option>
            <option value="unchecked">Unchecked</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
