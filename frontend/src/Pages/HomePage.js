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
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import { Share2, Gift, Coins } from 'lucide-react';




const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const [isAuth, setIsAuth] = useState(false);


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
    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance
      .get("/api/me") // ✅ sirf /me call
      .then((res) => {
        if (res.data?.success) {
          setIsAuth(true);
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const [userinfo, setUserinfo] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`${backUrl}/api/getUserInfo`)
      .then((res) => {
        console.log("User Info:", res?.data);
        const usi = res.data;
        setUserinfo(usi);
        // res.data = { mobile: "...", wallet: ... }
      })
      .catch((err) => {
        console.error(err);
        // alert("Error fetching user info");
      });
  }, []);

  const [results, setResults] = useState([]);
  const [yesterdayResult, setYesterdayResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get("/api/game-result-history");
        const allResults = res.data.data || [];

        // Get yesterday’s date (in YYYY-MM-DD format)
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 2);
        const yesterdayStr = yesterday.toISOString().split("T")[0]; // e.g. "2025-10-10"

        // Find the object where GAME_ID === "5" and DATE matches yesterday
        const result = allResults.find((item) => {
          const itemDate = new Date(item.DATE).toISOString().split("T")[0];
          return item.GAME_ID === "5" && itemDate === yesterdayStr;
        });

        setResults(allResults);
        setYesterdayResult(result || null);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, []);

  console.log("Yesterday's Result for GAME_ID 5:", yesterdayResult);




  return (
    <div className="bg-[#343c44]">
      {/* <HighlightMarquee /> */}


      <div style={{ backgroundImage: "url(/images/name.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className="w-full bg-yellow-100 border-4 border-[#4481eb] text-center py-2 px-2 mt-2 shadow-md">
        <p className="text-xl sm:text-lg font-semibold text-white">NAME: {userinfo?.name}</p>
        <p className="text-xl sm:text-lg font-semibold text-white">REFER_ID: {userinfo?.mobile}</p>
      </div>

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
        <spna className="font-bold"> नोट -: मटका मेला के जो नियम है वह एक बार जरूर देखें धन्यवाद!!</spna>
        <h6 className="text-sm sm:text-xs mt-2 text-white">
          <span id="date">{dateTime}</span>
        </h6>
      </div>



      <div className="w-full bg-[#fff]  border border-yellow-300 rounded-md shadow-sm mb-2 text-center relative overflow-hidden">


        {/* Result Text */}
        <h5 className="text-lg border-white border-dashed border-1 font-medium bg-theme text-white relative z-10">Result</h5>

        {/* Market Name and Result Number */}
        <div style={{ backgroundImage: "url(/images/congratulations.gif)", }}
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
          {/* <p className="text-blue-950 font-bold text-xl">{games[7]?.NAME}</p>
          <span className="font-bold text-xl text-blue-950">{games[7]?.RESULT1 ? games[7]?.RESULT1 : "-"}</span> */}
          {(() => {
            if (!games || games?.length === 0) return <p>No Results</p>;

            // latest RESULT_TIME find karna
            const latestGame = games?.reduce((latest, game) => {
              if (!latest) return game;
              return new Date(game.RESULT_TIME) > new Date(latest.RESULT_TIME) ? game : latest;
            }, null);

            // Decide which result to show
            let displayResult;
            if (latestGame?.ID == 5) {
              displayResult = yesterdayResult?.RESULT1 ?? "-";
            } else {
              displayResult = latestGame?.RESULT1 ? latestGame?.RESULT1 : yesterdayResult?.RESULT1 ?? "-";
            }

            return (
              <>
                <p className="text-blue-950 font-bold text-xl">{latestGame?.NAME ?? "No Game"}</p>
                <span className="font-bold text-xl text-blue-950">{displayResult}</span>
              </>
            );
          })()}




        </div>



      </div>

      <div className="relative group  ">
        {/* Main Banner Container */}
        <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-0.5 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02]">

          {/* Inner Content */}
          <div style={{ background: "linear-gradient(15deg, rgb(113 9 238), rgb(241 15 15))" }} className=" backdrop-blur-sm rounded-xl p-1 relative overflow-hidden">

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-blue-50/50 to-indigo-50/50 opacity-50"></div>

            {/* Floating Icons */}
            <div className="absolute top-2 right-2 text-yellow-400 animate-bounce">
              <Coins className="w-5 h-5" />
            </div>
            <div className="absolute bottom-2 left-2 text-green-400 animate-pulse">
              <Gift className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">

              {/* Icon Container */}


              {/* Main Text */}
              <h2 className="text-xl text-white font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                शेयर Share & Earn
              </h2>

              {/* Subtitle */}
              <p className="text-gray-50 text-sm font-medium">
                Refer friends and earn amazing rewards!
              </p>

              {/* CTA Button */}
              <button className="group relative inline-flex items-center justify-center px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 overflow-hidden">

                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Button Content */}
                <Link to={"refercode"} className="relative flex items-center gap-2">
                  <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Start Earning
                </Link>
              </button>

            </div>

          </div>

        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>

      </div>
      <h5 className="py-2 text-center rounded font-medium bg-theme text-white relative z-10">Live Result of {new Date().toLocaleDateString()}</h5>



      <HomeMarket markets={games} result={yesterdayResult} />








    </div>
  );
};

export default HomePage;
