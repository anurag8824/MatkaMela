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
  const navigate = useNavigate();

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
        navigate("/login");
      });
  }, []);

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
