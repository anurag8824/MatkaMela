import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import axios from "axios";

const HomePlayMenu = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${backUrl}/api/get-games`);
        const gamesWithPlay = res?.data?.map((g) => ({
          ...g,
          playStatus: g.PLAY === "checked" ? true : false, // optional boolean mapping
        }));

        setGames(gamesWithPlay);
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
        <Link to={`${game.playStatus ? `/play-game/${game.ID}` : ""}`} key={game.id} className="col-md-12">
          <div className="bg-[#094c73] rounded-md mt-1 p-1">
            <div className="flex justify-between items-center">
              <p className="text-white">{game.NAME}</p>
              <div className="flex items-center">
                <button
                  type="button"
                  className={`text-sm px-2 py-1  text-white rounded hover:bg-blue-700 ${game.playStatus ? "bg-[#406980]" : "bg-red-500"} `}
                >
                  {game.playStatus ? "Play Games" : "Timed Out"}
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePlayMenu;
