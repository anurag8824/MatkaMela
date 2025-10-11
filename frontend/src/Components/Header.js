import React, { useEffect, useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import Profile from './Profile';

import { FiMenu } from 'react-icons/fi';
import { BsBellFill } from 'react-icons/bs';
import axiosInstance from '../Utils/axiosInstance';
import PWAInstallButton from './PWAInstallButton';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const backUrl = process.env.REACT_APP_BACKEND_URL;
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

  const navigate = useNavigate();

  const handleLogout = () => {
    // yaha apna logout ka logic dal
    localStorage.removeItem("token"); // example
    localStorage.removeItem("id"); // example
    localStorage.removeItem("mobile"); // example
    window.location.href = "/login";
    
  };



  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow">
      {/* Top Bar */}



      <div className="w-full bg-[#094c73] px-3 shadow-md">
        <div className="flex justify-between items-center">
          {/* Left: Hamburger + Badge + Home */}
          <div className="flex items-center gap-2">
            <FiMenu
              className="text-2xl text-white cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            {/* <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">4</span> */}
            <Link to={"/"} className="text-sm text-white font-semibold">Home</Link>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <img
              src="/images/whitelogo.png"
              alt="logo"
              className="h-16"
            />
          </div>

     


          {/* Right: Points + Bell */}
          <div className="flex items-center gap-3">

          {/* <PWAInstallButton /> */}
            <div className="flex items-center gap-1">
              <img
                src="https://img.icons8.com/emoji/48/coin-emoji.png"
                alt="points"
                className="h-4"
              />
              <span className="text-sm text-white font-medium">{userinfo?.wallet} /-</span>
            </div>
            <a href="/Notification" className="relative hidden text-white">
              <BsBellFill className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                6
              </span>
            </a>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-blak bg-opacity-40 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-[#094c73] z-50 shadow-md"
            onClick={(e) => e.stopPropagation()} // prevent sidebar from closing when clicked inside
          >
            <div className="profileimage relative bg-[#094c73] p-4 rounded shadow-md w-full max-w-xs">
              {/* Close Button */}
              <button onClick={() => setIsSidebarOpen(false)} type="button" className="absolute top-2 right-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
                ×
              </button>

              {/* Profile Top */}
              <div className="flex items-center justify-between mb-4">
                <div className="profilephoto">
                  <img src="/images/whitelogo.png" alt="Profile" className=" h-16 rounded-full" />
                </div>
                <Link to="/Profile" className="rounded font-medium text-xs text-blue-50 hover:underline">Edit Profile</Link>
              </div>

              {/* Profile Details */}
              <div className="profiledetails mb-6">
                <h3 className="text-lg font-semibold"></h3>
                <h4 className="text-sm text-gray-50"><strong>ID:</strong> {userinfo?.mobile}</h4>
              </div>

              {/* Menu List */}
              <ul className="space-y-3 text-sm text-black  font-medium">
                {/* App Details */}
                {/* <li>
                  <Link
                    to="/Appdetails"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://khelomatka.com/static/media/appdetails.0e422e8a94661f3c55ed.png"
                        alt="App Details"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">App Details</div>
                  </Link>
                </li> */}

                {/* My Play History */}
                <li>
                  <Link
                    to="/History"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://img.icons8.com/plasticine/100/receipt.png"
                        alt="My Play History"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">My Play History</div>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/result-history"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://img.icons8.com/clouds/100/hourglass.png"
                        alt="Refer List"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">Result History</div>
                  </Link>
                </li>

                {/* Game Posting with badge */}
                {/* <li>
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://khelomatka.com/static/media/gameposting.b5a258886a00aa612ee9.png"
                        alt="Game Posting"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 relative">
                      Game Posting
                      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        4
                      </span>
                    </div>
                  </Link>
                </li> */}

                {/* Refer & Earn */}
                <li>
                  <Link
                    to="/refercode"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-yellow-300 text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://img.icons8.com/external-microdots-premium-microdot-graphic/64/external-earn-business-finance-vol1-microdots-premium-microdot-graphic.png"
                        alt="Refer & Earn"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">Refer & Earn</div>
                  </Link>
                </li>

                {/* Refer List */}
                <li>
                  <Link
                    to="/refer-list"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://img.icons8.com/bubbles/100/list.png"
                        alt="Refer List"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">Refer List</div>
                  </Link>
                </li>

                {/* Terms and Condition */}
                <li>
                  <Link
                    to="/Termsandcondition"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://img.icons8.com/stickers/100/term.png"
                        alt="Terms And Condition"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">Terms And Condition</div>
                  </Link>
                </li>

                {/* Share */}
                {/* <li>
                  <Link
                    to="/refercode"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://khelomatka.com/static/media/share.f76fa3b208b7e6391c3f.png"
                        alt="Share"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">Share</div>
                  </Link>
                </li> */}

                {/* Rate Our App */}
                {/* <li>
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-white text-black"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://khelomatka.com/static/media/rateapp.3f577497e55ad6e9d698.png"
                        alt="Rate Our App"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">Rate Our App</div>
                  </Link>
                </li> */}

                {/* Logout with function */}
                <li>
                  <button
                    onClick={handleLogout}
                    className=" w-full flex items-center gap-3 px-3 py-2 rounded-md bg-white text-red-600 font-semibold"
                  >
                    <div className="w-6 h-6">
                      <img
                        src="https://img.icons8.com/bubbles/100/exit.png"
                        alt="Logout"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-">Logout</div>
                  </button>
                </li>

                {/* Social Media */}
                <li className="p-0 mt-4 ">
                  <div className="w-full flex justify-center gap-4">
                    <div className="text-blue-600 text-xl">
                      <Link to="#">
                        <i className="bi bi-facebook" />
                      </Link>
                    </div>
                    <div className="text-pink-600 text-xl">
                      <Link to="#">
                        <i className="bi bi-instagram" />
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

    </header>
  )
}

export default Header
