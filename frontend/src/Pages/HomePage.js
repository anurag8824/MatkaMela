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

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Format: DD-MM-YYYY Day HH:MM:SS AM/PM
      const options = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const formatted = now.toLocaleString("en-GB", options)
        .replace(",", ""); // remove comma between date & time

      setDateTime(formatted);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${backUrl}/api/get-games`);

        // Response mein games honge with PLAY column
        // Yahi PLAY directly state mein set ho jaayega
        const gamesWithPlay = res?.data?.map((g) => ({
          ...g,
          playStatus: g.PLAY === "checked" ? true : false, // optional boolean mapping
        }));

        setGames(gamesWithPlay); // API se aayi list
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
    <div className="bg-[#343c44]">
      {/* <HighlightMarquee /> */}

      <div className="flexx hidden w-full px-2 pt-2 justify-between text-nowrap">
        {/* Left Side Buttons - aligned to the left end */}
        <div className="flex flex-col gap-2 items-start">
          <a
            href="/Depositchat"
            className="w-44 flex items-center px-4 py-2 
             bg-gradient-to-r from-blue-400 to-blue-600 
             text-white rounded-full transition-all duration-500 
             shadow-[0_0_20px_rgba(100,180,255,0.7)] 
             hover:shadow-[0_0_35px_rgba(120,200,255,0.95)]"
          >
            <span className="mr-2 text-xl">
              <MdMarkUnreadChatAlt />
            </span>
            <span>Deposit Chat</span>
          </a>

          <a
            href="/Withdrawalchat"
            className="w-44 flex items-center px-4 py-2 
             bg-gradient-to-r from-blue-400 to-blue-600 
             text-white rounded-full transition-all duration-500 
             shadow-[0_0_20px_rgba(100,180,255,0.7)] 
             hover:shadow-[0_0_35px_rgba(120,200,255,0.95)]"
          >
            <span className="mr-2 text-xl">
              <MdOutlineChat />
            </span>
            <span>Withdraw Chat</span>
          </a>
        </div>

        {/* Right Side Buttons - aligned to the right end */}
        <div className="flex flex-col gap-2 items-end">
          <a
            href="https://khelomatka.com/api/pages/other_games.php"
            target="_blank"
            className="w-44 flex items-center px-4 py-2 
             bg-gradient-to-r from-blue-400 to-blue-600 
             text-white rounded-full transition-all duration-500 
             shadow-[0_0_20px_rgba(100,180,255,0.7)] 
             hover:shadow-[0_0_35px_rgba(120,200,255,0.95)]"
          >
            <span className="mr-2 text-xl">
              <IoGameController />
            </span>
            <span>Other Game</span>
          </a>

          <a
            href="/"
            className="w-44 flex items-center px-4 py-2 
             bg-gradient-to-r from-blue-400 to-blue-600 
             text-white rounded-full transition-all duration-500 
             shadow-[0_0_20px_rgba(100,180,255,0.7)] 
             hover:shadow-[0_0_35px_rgba(120,200,255,0.95)]"
          >
            <span className="mr-2 text-xl">
              <RiRefreshFill />
            </span>
            <span>Refresh</span>
          </a>
        </div>
      </div>




      <div style={{ backgroundImage: "url(/images/home-back.jpeg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="w-full bg-yellow-100 border-4 border-[#4481eb] text-center py-2 px-2 mt-2 shadow-md">
        <h6 className="text-lg sm:text-base font-semibold text-white">🔥 भरोसे का एक ही नाम 🔥</h6>
        <h6 className="text-lg sm:text-base font-semibold text-white">🙏 matkamela.shop 🙏</h6>
        <h6 className="text-sm sm:text-xs mt-2 text-white">
          <span id="date">{dateTime}</span>
        </h6>
      </div>


      <div className="w-full hidden bg-[#ffd53c] hover:bg-[#ccc] border border-yellow-300 px-3 py-2 shadow-sm">
        {/* <!-- Market Name --> */}
        <div className="text-center">
          <h3 className="text-base font-semibold text-yellow-800 tracking-wide">
            MORNING STAR
          </h3>
        </div>

        {/* <!-- Market Result Numbers --> */}
        <div className="flex justify-center items-center gap-2 text-gray-800 text-base font-semibold">
          <span>44</span>
          <span>-</span>
          <span>15</span>
        </div>

        {/* <!-- Market Timings --> */}
        <ul className="flex justify-center items-center flex-wrap gap-3 text-xs text-gray-700 mt-1">
          <li className="text-center">
            <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">Open Time</span>
            <span className="block">1:00 AM</span>
          </li>
          <li>|</li>
          <li className="text-center">
            <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">Close Time</span>
            <span className="block">11:00 AM</span>
          </li>
          <li>|</li>
          <li className="text-center">
            <span className="block font-light bg-white text-black rounded-b-none px-[1px] rounded-md">Result Time</span>
            <span className="block">11:15 AM</span>
          </li>
        </ul>
      </div>


      <div className="w-full bg-[#fff]  border border-yellow-300 rounded-md shadow-sm mb-2 text-center relative overflow-hidden">


        {/* Result Text */}
        <h5 className="text-lg border-white border-dashed border-1 font-medium bg-theme text-white relative z-10">Result</h5>

        {/* Market Name and Result Number */}
        <div style={{backgroundImage:"url(/images/congratulations.gif)" ,}} 
        className="relative z-10 text-white font-bold text-base rounded-t-none px-4 py-1 rounded-[10px] overflow-hidden border-0 animate-gradientlresult">

        {/* className="relative z-10 text-white font-bold text-base rounded-t-none px-4 py-1 rounded-[10px] overflow-hidden border-0 bg-gradient-to-br from-[#d2ac79] via-[#ef629f] to-[#040f6b] bg-[length:400%_400%] animate-gradientresult"> */}
          <div className="absolute hidden inset-0 pointer-events-none z-0">
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
          <p className="text-blue-950 font-bold text-xl">DEV DARSHAN</p>
          <span className="font-bold text-xl text-blue-950">53</span>
        </div>



      </div>

      <h5 className="py-2 text-center rounded font-medium bg-theme text-white relative z-10">Live Result of {new Date().toLocaleDateString()}</h5>



      <HomeMarket markets={games} />








    </div>
  );
};

export default HomePage;
