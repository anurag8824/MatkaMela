import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
        //   alert('No token found. Please login.');
          return;
        }

        const res = await axios.get(`${backUrl}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res,"resssdf")

        setUser(res.data.user);
      } catch (error) {
        console.log('Error fetching profile:', error);
        // alert('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
   window.location.reload()
  };

 


//   if (loading) return <p className="text-center">Loading...</p>;

//   if (!user) return <p className="text-center text-red-500">Not authenticated</p>;

  return (
    // <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    //   <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
    //   <p><strong>Email:</strong> {user.email}</p>
    //   {/* <p><strong>Phone:</strong> {user.phone}</p> */}
    // </div>

<div>
  {user ?  <div className="relative">
  <button
    onClick={() => setShowDetails(!showDetails)}
    className="text-xl text-blue-600"
  >
    <FaUserCircle />
  </button>

  {showDetails && (
    <div className="absolute z-50 top-10 right-0 bg-white shadow-lg p-4 rounded-lg">
      <div className="text-sm space-y-2">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  )}
</div>
 :     <Link to="/register" className="hover:text-blue-600">Account</Link>}
   </div>
  );
}
