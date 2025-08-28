// components/Layout.js
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";


function Layout() {

  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const [user, setUserinfo] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 loader state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // 👈 check if token exists
    if (!token) {
      // navigate("/register");
      return;
    }

    axiosInstance
      .get(`/api/getUserInfo`)
      .then((res) => {
        if (res?.data) {
          setUserinfo(res.data);
        } else {
          navigate("/register");
        }
      })
      .catch((err) => {
        console.error("Auth Error:", err);
        navigate("/register");
      })
      .finally(() => {
        setLoading(false); // 👈 loading false after response
      });
  }, [backUrl, navigate]);


 

  

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
     {user && <Header />}
      <main className="flex-grow ">
      <ToastContainer position="top-center" autoClose={2000} />

        <Outlet />
      </main>
      {user && <Footer />}
    </div>
  );
}

export default Layout;
