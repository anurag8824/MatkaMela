// components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow ">
      <ToastContainer position="top-center" autoClose={2000} />

        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
