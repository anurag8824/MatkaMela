// components/Layout.js
import { Outlet , useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Utils/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";


function Layout() {

  const [isAdmin, setIsAdmin] = useState(false);
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {


        const res = await axiosInstance.get(`${backUrl}/admin/admin-detail`);

        if (res.data && res.data.user.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Admin check failed", err);
        setIsAdmin(false);
        navigate("/public/administrator/login");
      }
    };

    checkAdmin();
  }, [backUrl]);


  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
     {isAdmin && <Header />}
      <main className="flex-grow ">
      <ToastContainer position="top-center" autoClose={2000} />

        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
