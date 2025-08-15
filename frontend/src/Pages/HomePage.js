import React, { useEffect, useState } from "react";
import IntroSlider from "../Components/Content/IntroSlider";
import TrendingGallery from "../Components/Content/TrendingProduct";
import HomeGallery from "../Components/Content/HomeGallery";
import HighlightMarquee from "../Components/HighlightMarquee";
import { MdOutlineChat } from "react-icons/md";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { IoGameController } from "react-icons/io5";
import HomeMarket from "./HomeMarket";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const HomePage = () => {
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


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const mobile = localStorage.getItem("mobile");

    if (!token || !mobile) {
      navigate("/login"); // send to login if not authenticated
    }
  }, [navigate]);

  return (
    <div className="">
      {/* <HighlightMarquee /> */}

      <div className="flex w-full mt-2 justify-between text-nowrap">
        {/* Left Side Buttons - aligned to the left end */}
        <div className="flex flex-col gap-4 items-start">
          <a
            href="/Depositchat"
            className="w-44 flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800"
          >
            <span className="mr-2 text-xl">
              <MdMarkUnreadChatAlt />
            </span>
            <span>Deposit Chat</span>
          </a>

          <a
            href="/Withdrawalchat"
            className="w-44 flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800"
          >
            <span className="mr-2 text-xl">
              <MdOutlineChat />
            </span>
            <span>Withdraw Chat</span>
          </a>
        </div>

        {/* Right Side Buttons - aligned to the right end */}
        <div className="flex flex-col gap-4 items-end">
          <a
            href="https://khelomatka.com/api/pages/other_games.php"
            target="_blank"
            className="w-44 flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800"
          >
            <span className="mr-2 text-xl">
              <IoGameController />
            </span>
            <span>Other Game</span>
          </a>

          <a
            href="/Home"
            className="w-44 flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-800"
          >
            <span className="mr-2 text-xl">
              <RiRefreshFill />
            </span>
            <span>Refresh</span>
          </a>
        </div>
      </div>




      <div style={{ backgroundImage: "url(/images/home-back.jpeg)" }} class="w-full bg-yellow-100 border-4 border-[#4481eb] text-center py-2 px-2 mt-2 shadow-md">
        <h6 class="text-lg sm:text-base font-semibold text-white">🔥 भरोसे का एक ही नाम 🔥</h6>
        <h6 class="text-lg sm:text-base font-semibold text-white">🙏 matkamela.com 🙏</h6>
        <h6 class="text-sm sm:text-xs mt-2 text-white">
          <span id="date">07-08-2025 Thu 03:15:50 PM</span>
        </h6>
      </div>
    

      <div class="w-full hidden bg-[#ffd53c] hover:bg-[#ccc] border border-yellow-300 px-3 py-2 shadow-sm">
        {/* <!-- Market Name --> */}
        <div class="text-center mb-1">
          <h3 class="text-base font-semibold text-yellow-800 tracking-wide">
            MORNING STAR
          </h3>
        </div>

        {/* <!-- Market Result Numbers --> */}
        <div class="flex justify-center items-center gap-2 text-gray-800 text-base font-semibold">
          <span>44</span>
          <span>-</span>
          <span>15</span>
        </div>

        {/* <!-- Market Timings --> */}
        <ul class="flex justify-center items-center flex-wrap gap-3 text-xs text-gray-700 mt-1">
          <li class="text-center">
            <span class="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">Open Time</span>
            <span class="block">1:00 AM</span>
          </li>
          <li>|</li>
          <li class="text-center">
            <span class="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">Close Time</span>
            <span class="block">11:00 AM</span>
          </li>
          <li>|</li>
          <li class="text-center">
            <span class="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">Result Time</span>
            <span class="block">11:15 AM</span>
          </li>
        </ul>
      </div>


      <div className="w-full bg-[#ffd53c]  border border-yellow-300 rounded-md shadow-sm mb-2 text-center relative overflow-hidden">
  

  {/* Result Text */}
  <h5 className="text-base font-medium text-yellow-900 relative z-10">Result</h5>

  {/* Market Name and Result Number */}
  <div className="relative z-10 text-white font-bold text-base rounded-t-none p-4 rounded-[10px] overflow-hidden border-0 bg-gradient-to-br from-[#eecda3] via-[#ef629f] to-[#1d2671] bg-[length:400%_400%] animate-gradientresult">
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 bg-white rounded-full absolute animate-ping opacity-70"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
      ></div>
    ))}
  </div>
  <p className="text-white font-bold text-base mb-1">DEV DARSHAN</p>
  <span className="font-bold text-lg text-white">53</span>
</div>

</div>


      

<HomeMarket markets={games} />








    </div>
  );
};

export default HomePage;
