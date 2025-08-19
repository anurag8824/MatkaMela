import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import axios from "axios";

const PlayMenu = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${backUrl}/api/get-games`);
        setGames(res.data); // API se aayi list
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
  return (
    <div className="row px-2">
    {games.map((game) => (
      <Link to={`/play-game/${game.ID}`} key={game.id} className="col-md-12">
        <div className="bg-[#094c73] rounded-md mt-1 p-1">
          <div className="flex justify-between items-center">
            <p className="text-white">{game.NAME}</p>
            <div className="flex items-center">
              <button
                type="button"
                className="text-sm px-2 py-1 bg-[#406980] text-white rounded hover:bg-blue-700"
              >
                {game.status === "active" ?  "Coming Soon" : "Play Now"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  );
};

export default PlayMenu;
