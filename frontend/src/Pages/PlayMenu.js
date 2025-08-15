import React from "react";
import { Link } from "react-router-dom";

const PlayMenu = () => {
    const games = [
        { id: 1, name: "MORNING STAR", status: "Time Out" },
        { id: 2, name: "EVENING STAR", status: "Time Out" },
        { id: 3, name: "LUCKY 7", status: "Time Out" },
        // Add up to 100 or more here
      ];
  return (
    <div className="row px-2">
    {games.map((game) => (
      <Link to={`/play-game`} key={game.id} className="col-md-12">
        <div className="bg-[#094c73] rounded-md mt-1 p-1">
          <div className="flex justify-between items-center">
            <p className="text-white">{game.name}</p>
            <div className="flex items-center">
              <button
                type="button"
                className="text-sm px-2 py-1 bg-[#406980] text-white rounded hover:bg-blue-700"
              >
                {game.status}
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
