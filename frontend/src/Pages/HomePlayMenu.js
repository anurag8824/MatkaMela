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
    <div className="row px-2 pb-10">
      {games.map((game) => (
        <Link to={`${game.playStatus ? `/play-game/${game.ID}` : ""}`} key={game.id} className="col-md-12">
          <div className="bg-[#094c73] rounded-md mt-1 p-1">
            <div className="flex pt-2 pb-1 justify-between items-center">
            <div> 
            <p className="text-white">{game.NAME}</p>
            </div>
             

              <div className="flex items-center">
                <button
                  type="button"
                  className={`text-sm px-2 py-1  text-white rounded hover:bg-blue-700 ${game.playStatus ? "bg-[#406980]" : "bg-red-500"} `}
                >
                  {game.playStatus ? "Play Games" : "Timed Out"}
                </button>
              </div>
            </div>
            <ul className="flex justify-center border-t border-gray-50 pt-2 items-center flex-wrap gap-3 text-xs text-gray-50 mt-1">
              <li className="text-center">
                <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">
                  Open Time
                </span>
                <span className="block">{game?.TIME1}</span>
              </li>
              <li>|</li>
              <li className="text-center">
                <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">
                  Close Time
                </span>
                <span className="block">{game?.TIME2}</span>
              </li>
              <li>|</li>
              <li className="text-center">
                <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">
                  Result Time
                </span>
                <span className="block">{game?.RTIME}</span>
              </li>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePlayMenu;
