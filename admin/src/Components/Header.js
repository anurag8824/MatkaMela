import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';

import { FiMenu } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt, FaUsers, FaCogs, FaGamepad } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaTrophy ,FaWhatsapp } from "react-icons/fa";
import { FaPercentage } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCreditCard, FaUserShield } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { use } from 'react';



const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    link: "/public/administrator/dashboard",
  },
  {
    title: "Users",
    icon: <FaUsers />,
    children: [
      {
        title: "Active Users",
        link: "/public/administrator/user/active-user-list",
      },
      {
        title: "Inactive Users",
        link: "/public/administrator/user/inactive-user-list",
      },
      {
        title: "Today Users",
        link: "/public/administrator/user/today-user-list",
      },
      // {
      //   title: "Today Online Users",
      //   link: "/public/administrator/user/online-user-list",
      // },
      // {
      //   title: "Users Game Report",
      //   link: "/public/administrator/user-game-report-list",
      // },
      // {
      //   title: "Users Reffer Report",
      //   link: "/public/administrator/user/user-reffer-report",
      // },
    ],
  },
  {
    title: "Withdraw Management",
    icon: <FaMoneyBillWave />, // aap chahe toh koi aur suitable icon use kar sakte ho
    children: [
      {
        title: "Pending",
        link: "/public/administrator/withdraw/pending",
      },
      {
        title: "Success",
        link: "/public/administrator/withdraw/approved",
      },
      {
        title: "Cancelled",
        link: "/public/administrator/withdraw/cancelled",
      },
    ],
  },
  {
    title: "Deposit Management",
    icon: <FaWallet />,
    children: [
      {
        title: "Pending",
        link: "/public/administrator/deposit/pending",
      },
      {
        title: "Success",
        link: "/public/administrator/deposit/approved",
      },
      {
        title: "Cancelled",
        link: "/public/administrator/deposit/cancelled",
      },
    ],
  },
  {
    title: "Game Load",
    icon: <FaCreditCard />,
    link: "/public/administrator/admin-game_load_list",
  },
  {
    title: "Manage Result",
    icon: <FaTrophy />,
    children: [
      {
        title: "Update Number",
        link: "/public/administrator/result/update-number",
      },
      {
        title: "Winning Number",
        link: "/public/administrator/result/winning-number",
      },
    ],
  },
  {
    title: "User Commission",
    icon: <FaPercentage />,
    children: [
      {
        title: "User Commission ",
        link: "/public/administrator/user/commission-list",
      },
      {
        title: "Commission Pay List ",
        link: "/public/administrator/user/commission-pay-list",
      },
    ],
  },
  {
    title: "Game Management",
    icon: <FaGamepad />,
    children: [
      {
        title: "Game Name List",
        link: "/public/administrator/game/game-name-list",
      },
      // {
      //   title: "Bid History List",
      //   link: "/public/administrator/game/bid-history-list",
      // },
      {
        title: "Declare Result List",
        link: "/public/administrator/game/declare-result-list",
      },
      {
        title: "Winning Report List",
        link: "/public/administrator/game/winning-report-list",
      },
    ],
  },
  {
    title: "Payment Gateway",
    icon: <FaCreditCard />,
    link: "/public/administrator/upload-qr",
  },
  {
    title: "User Reffer List",
    icon: <FaUsers />,
    link: "/public/administrator/user/user-reffer-list",
  },

  {
    title: "Edit Whatsapp",
    icon: <FaWhatsapp />,
    link: "/public/administrator/edit-whatsapp",
  },
  // {
  //   title: "User Wallet Data",
  //   icon: <FaWallet />,
  //   link: "/public/administrator/user-wallet-data",
  // },
  // {
  //   title: "Web Setting Manage",
  //   icon: <FaCogs />,
  //   link: "/public/administrator/web-setting-manage",
  // },
  // {
  //   title: "SubAdmin",
  //   icon: <FaUserShield />,
  //   link: "/public/administrator/subadmin",
  // },


];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [open, setOpen] = useState(false);


  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    localStorage.removeItem("id");

    navigate("/public/administrator/login");
    window.location.reload();
  };




  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow">
      {/* Top Bar */}



      <div className="w-full bg-[##094c73] px-3 shadow-md">
        <div className="flex justify-between items-center">
          {/* Left: Hamburger + Badge + Home */}
          <div className="flex items-center gap-2">
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            {/* <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">4</span> */}
            <Link to={"/"} className="text-sm font-semibold">Home</Link>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <img
              src="/images/blacklogo.png"
              alt="logo"
              className="h-16"
            />
          </div>

          {/* Right: Points + Bell */}
          <div className="flex relative items-center gap-3">

          <button
        onClick={() => setOpen(!open)}
        className="flex  items-center justify-center text-black focus:outline-none"
      >
        <FaUser className="text-xl" />
      </button>

      {open && (
        <div className="absolute top-5 right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border p-2 z-50">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/public/administrator/change-password"); // 👈 apni change password route
            }}
            className="w-full text-nowrap text-left px-3 py-2 rounded hover:bg-gray-100 bg-gray-300 text-sm"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100  text-sm text-red-600"
          >
            Logout
          </button>
        </div>
      )}

          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-blak bg-opacity-40 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white z-50 shadow-md"
            onClick={(e) => e.stopPropagation()} // prevent sidebar from closing when clicked inside
          >
            <div className="profileimage relative bg-white py-4 px-2 rounded shadow-md w-full max-w-xs">
              {/* Close Button */}
              <button onClick={() => setIsSidebarOpen(false)} type="button" className="absolute top-2 right-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
                ×
              </button>

              {/* <IoMdCloseCircle /> */} 

              {/* Profile Top */}
              <div className="flex items-center justify-between mb-4">
                <div className="profilephoto">
                  <img src="/images/blacklogo.png" alt="Profile" className=" h-8 rounded-full" />
                </div>
                {/* <a href="/Profile" className="text-blue-50 font-medium text-sm hover:underline">Edit Profile</a> */}
              </div>

              {/* <div className="w-64 hiddenj bg-gray- text-black h-screen fixed overflow-y-auto"> */}

              <ul className="space-y-1 mt-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <>
                        {/* Dropdown Parent */}
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="flex items-center justify-between w-full px-1 py-2 hover:bg-gray-200"
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            {item.title}
                          </div>
                          <FaCaretDown
                            className={`transition-transform text-gray-500 duration-100 ${openDropdown === index ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {/* Dropdown Items */}
                        {openDropdown === index && (
                          <ul className="pl-10 space-y-1  bg-gray-7050">
                            {item.children.map((child, i) => (
                              <li key={i}>
                                <Link
                                  to={child.link}
                                  className="block py-2 hover:bg-gray-200 px-2 rounded"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      // Normal Link (without dropdown)
                      <Link
                        to={item.link}
                        className="flex items-center px-1 py-2 hover:bg-gray-200"
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              {/* </div> */}

              {/* Profile Details */}


              {/* Menu List */}
              <ul className="space-y-3 hidden bg-red-500">
                {[
                  { href: "/", text: "Dashboard", icon: "tachometer-alt" },
                  { href: "/public/administrator/users", text: "Manage Users", icon: "users" },
                  { href: "/public/administrator/manage_result", text: "Manage Result", icon: "poll" },
                  { href: "/public/administrator/manage_starline", text: "Manage Starline ", icon: "flag" },
                  { href: "/public/administrator/manage_guess", text: "Manage Guessing", icon: "question" },
                  { href: "/public/administrator/bets", text: "Manage Bets", icon: "rupee-sign" },
                  { href: "/public/administrator/manage_games", text: "Manage Games", icon: "gamepad" },
                  { href: "/public/administrator/transactions", text: "All Transactions", icon: "file-invoice" },
                  { href: "/public/administrator/report", text: "Report", icon: "chart-line" },
                  { href: "/public/administrator/winner", text: "Winner", icon: "trophy" },
                  { href: "/public/administrator/payment", text: "Latest Payments", icon: "rupee-sign" },
                  { href: "/public/administrator/settings", text: "Settings", icon: "cogs" },
                  { href: "/public/administrator/refresh", text: "Refresh Result", icon: "sync-alt" },
                  { href: "/public/administrator/reset_password", text: "Password Reset", icon: "key" },
                  { href: "/public/administrator/logout", text: "Logout", icon: "sign-out-alt", logout: true },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3  py-1 rounded-md bg-white
          ${item.logout ? 'text-red-600 font-semibold' : 'text-gray-700'}`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className={`fas fa-${item.icon} text-lg`}></i>
                      </div>
                      <div className="flex-1 relative">{item.text}</div>
                    </Link>
                  </li>
                ))}





                {/* Social Media */}
                <li className="p-0 mt-4">
                  <div className="w-full flex justify-center gap-4">
                    <div className="text-blue-600 text-xl">
                      <a href="#"><i className="bi bi-facebook" /></a>
                    </div>
                    <div className="text-pink-600 text-xl">
                      <a href="#"><i className="bi bi-instagram" /></a>
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