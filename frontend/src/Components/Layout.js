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
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 loader state
  const navigate = useNavigate();

  

    useEffect(() => {
    
  
      axiosInstance
        .get("/api/me") // ✅ sirf /me call
        .then((res) => {
          if (res.data?.success) {
            setIsAuth(true);
          } 
        })
        .catch(() => console.log("/login"))
        .finally(() => setLoading(false));
    }, [navigate]);


 

  

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
     {isAuth && <Header />}
      <main className="flex-grow ">
      <ToastContainer position="top-center" autoClose={2000} />

        <Outlet />
      </main>
      {isAuth && <Footer />}
    </div>
  );
}

export default Layout;
