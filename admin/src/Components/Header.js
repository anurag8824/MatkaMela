import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';

import { FiMenu } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt, FaUsers, FaCogs, FaGamepad } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";


import { BsBellFill } from 'react-icons/bs';



const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    link: "https://admin.dsmatka.com/public/administrator/dashboard",
  },
  {
    title: "Users",
    icon: <FaUsers />,
    children: [
      {
        title: "Active Users",
        link: "https://admin.dsmatka.com/public/administrator/user/active-user-list",
      },
      {
        title: "Inactive Users",
        link: "https://admin.dsmatka.com/public/administrator/user/inactive-user-list",
      },
      {
        title: "Today Users",
        link: "https://admin.dsmatka.com/public/administrator/user/today-user-list",
      },
      {
        title: "Today Online Users",
        link: "https://admin.dsmatka.com/public/administrator/user/online-user-list",
      },
      {
        title: "Users Game Report",
        link: "https://admin.dsmatka.com/public/administrator/user-game-report-list",
      },
      {
        title: "Users Reffer Report",
        link: "https://admin.dsmatka.com/public/administrator/user/user-reffer-report",
      },
    ],
  },
  {
    title: "Games",
    icon: <FaGamepad />,
    children: [
      { title: "All Games", link: "#" },
      { title: "Game Reports", link: "#" },
    ],
  },
  {
    title: "Settings",
    icon: <FaCogs />,
    children: [
      { title: "General Settings", link: "#" },
      { title: "Payment Settings", link: "#" },
    ],
  },
];


const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };






  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow">
      {/* Top Bar */}
   


      <div className="w-full bg-[##094c73] px-3 py-2 shadow-md">
        <div className="flex justify-between items-center">
          {/* Left: Hamburger + Badge + Home */}
          <div className="flex items-center gap-2">
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">4</span>
            <span className="text-sm font-semibold">Home</span>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <img
              src="/images/blacklogo.png"
              alt="logo"
              className="h-10"
            />
          </div>

          {/* Right: Points + Bell */}
          <div className="flex items-center gap-3">
            
            <a href="#" className="relative text-black">
              <FaUser className="text-xl" />
             
            </a>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-blak bg-opacity-40 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white z-50 shadow-md"
            onClick={(e) => e.stopPropagation()} // prevent sidebar from closing when clicked inside
          >
            <div className="profileimage relative bg-white p-4 rounded shadow-md w-full max-w-xs">
  {/* Close Button */}
  <button onClick={() => setIsSidebarOpen(false)} type="button" className="absolute top-2 right-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
    ×
  </button>

  {/* Profile Top */}
  <div className="flex items-center justify-between mb-4">
    <div className="profilephoto">
      <img   src="/images/blacklogo.png" alt="Profile" className=" h-6 rounded-full" />
    </div>
    {/* <a href="/Profile" className="text-blue-50 font-medium text-sm hover:underline">Edit Profile</a> */}
  </div>

  <div className="w-64 hidden bg-gray-800 text-white h-screen fixed overflow-y-auto">
      
      <ul className="space-y-1 mt-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.children ? (
              <>
                {/* Dropdown Parent */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </div>
                  <FaChevronDown
                    className={`transition-transform ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Items */}
                {openDropdown === index && (
                  <ul className="pl-10 space-y-1 bg-gray-700">
                    {item.children.map((child, i) => (
                      <li key={i}>
                        <a
                          href={child.link}
                          className="block py-2 hover:bg-gray-600 px-2 rounded"
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              // Normal Link (without dropdown)
              <a
                href={item.link}
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>

  {/* Profile Details */}


  {/* Menu List */}
  <ul className="space-y-3">
  {[
    { href: "/", text: "Dashboard", icon: "tachometer-alt" },
    { href: "/users", text: "Manage Users", icon: "users" },
    { href: "/manage_result", text: "Manage Result", icon: "poll" },
    { href: "/manage_starline", text: "Manage Starline ", icon: "flag" },
    { href: "/manage_guess", text: "Manage Guessing", icon: "question" },
    { href: "/bets", text: "Manage Bets", icon: "rupee-sign" },
    { href: "/manage_games", text: "Manage Games", icon: "gamepad" },
    { href: "/transactions", text: "All Transactions", icon: "file-invoice" },
    { href: "/report", text: "Report", icon: "chart-line" },
    { href: "/winner", text: "Winner", icon: "trophy" },
    { href: "/payment", text: "Latest Payments", icon: "rupee-sign" },
    { href: "/settings", text: "Settings", icon: "cogs" },
    { href: "/refresh", text: "Refresh Result", icon: "sync-alt" },
    { href: "/reset_password", text: "Password Reset", icon: "key" },
    { href: "/logout", text: "Logout", icon: "sign-out-alt", logout: true },
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
