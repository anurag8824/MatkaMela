import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import Profile from './Profile';

import { FiMenu } from 'react-icons/fi';
import { BsBellFill } from 'react-icons/bs';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow">
      {/* Top Bar */}
   


      <div className="w-full bg-[#094c73] px-3 py-2 shadow-md">
        <div className="flex justify-between items-center">
          {/* Left: Hamburger + Badge + Home */}
          <div className="flex items-center gap-2">
            <FiMenu
              className="text-2xl cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">4</span>
            <Link to={"/"} className="text-sm font-semibold">Home</Link>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center">
            <img
              src="/images/whitelogo.png"
              alt="logo"
              className="h-10"
            />
          </div>

          {/* Right: Points + Bell */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <img
                src="https://khelomatka.com/static/media/points.8ca46c1daf68863799f4.gif"
                alt="points"
                className="h-4"
              />
              <span className="text-sm font-medium">0 /-</span>
            </div>
            <a href="/Notification" className="relative text-white">
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
      <img   src="/images/whitelogo.png" alt="Profile" className=" h-12 rounded-full" />
    </div>
    <a href="/Profile" className="text-blue-50 font-medium text-sm hover:underline">Edit Profile</a>
  </div>

  {/* Profile Details */}
  <div className="profiledetails mb-6">
    <h3 className="text-lg font-semibold"></h3>
    <h4 className="text-sm text-gray-50"><strong>ID:</strong> 9571788517</h4>
  </div>

  {/* Menu List */}
  <ul className="space-y-3">
    {[
      { href: "/Appdetails", text: "App Details", icon: "appdetails.0e422e8a94661f3c55ed.png" },
      { href: "/History", text: "My Play History", icon: "myplayhistory.a950ec7779a573168f00.png" },
      { href: "/Gameposting", text: "Game Posting", icon: "gameposting.b5a258886a00aa612ee9.png", badge: "4" },
      { href: "/Reffer-Report", text: "Reffer & Earn", icon: "referandearn.cdf27d282b9fb8783ebd.png", highlight: true },
      { href: "/Resulthistory", text: "Result History", icon: "resulthistory.9f8464e933b04b603f3d.png" },
      { href: "/Termsandcondition", text: "Terms And Condition", icon: "termsandcondition.5d0db50b742766e7ff50.png" },
      { href: "/Home", text: "Share", icon: "share.f76fa3b208b7e6391c3f.png" },
      { href: "https://khelomatka.com/", text: "Rate Our App", icon: "rateapp.3f577497e55ad6e9d698.png" },
      { href: "/Home", text: "Logout", icon: "logout.3e41c72418fdc10a2e19.png", logout: true },
    ].map((item, idx) => (
      <li key={idx}>
        <a
          href={item.href}
          className={`flex items-center gap-3 px-3 py-2 rounded-md bg-gray-100 ${
            item.highlight ? 'bg-yellow-300' : ''
          } ${item.logout ? 'text-red-600 font-semibold' : 'text-gray-700'}`}
        >
          <div className="w-6 h-6">
            <img src={`https://khelomatka.com/static/media/${item.icon}`} alt={item.text} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 relative">
            {item.text}
            {item.badge && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </div>
        </a>
      </li>
    ))}

    {/* Social Media */}
    <li className="p-0 mt-4">
      <div className="w-full flex justify-center gap-4">
        <div className="text-blue-600 text-xl">
          <a href="/Home/null"><i className="bi bi-facebook" /></a>
        </div>
        <div className="text-pink-600 text-xl">
          <a href="/Home/null"><i className="bi bi-instagram" /></a>
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
