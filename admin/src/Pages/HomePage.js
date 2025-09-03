import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axiosInstance from "../Utils/axiosInstance";

export default function HomePage() {

  const [dashboardData, setDashboardData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };



  const fetchDashboardData = async (date = "") => {
    try {
      const url = date
        ? `/admin/admin-dashboard-data?date=${date}`
        : "/admin/admin-dashboard-data";

      const res = await axiosInstance.get(url);

      if (res.data.success) {
        setDashboardData(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Dashboard Data Fetch Error:", err);
      alert("Failed to fetch dashboard data ❌");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const today = getToday();
    setSelectedDate(today);
    fetchDashboardData(today);
  }, []);

 


  const cards = [
    { title: "Customer Balance", value: dashboardData?.customerBalance, icon: "fa-users" },
    {
      title: "Add Money", value: "", icon: "fa-coins", extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            PENDING RS: <span className="counter-anim">{dashboardData?.deposits?.pending}</span>
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            SUCCESS RS: <span className="counter-anim">{dashboardData?.deposits?.approved}</span>
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            CANCEL RS: <span className="counter-anim">{dashboardData?.deposits?.cancelled}</span>
          </span>
        </>)
    },
    {
      title: "Withdraw Money",
      icon: "fa-users",
      value: dashboardData?.withdrawnMoney,
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            PENDING RS: <span className="counter-anim">{dashboardData?.withdraws?.pending}</span>
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            SUCCESS RS: <span className="counter-anim">{dashboardData?.withdraws?.approved}</span>
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            CANCEL RS: <span className="counter-anim">{dashboardData?.withdraws?.cancelled}</span>
          </span>
        </>
      ),
    },
    { title: "Total Bidding", value: dashboardData?.totalBetting, icon: "fa-users" },
    { title: "Commission", value: dashboardData?.totalCommission, icon: "fa-users" },
    { title: "User Winning Amount", value: dashboardData?.totalWinAmount, icon: "fa-users" },
    { title: "Panel Profit", value: dashboardData?.totalProfit, icon: "fa-money-bill" },
    // {
    //   title: "Disawar",
    //   icon: "fa-users",
    //   value: "2489.65",
    //   extra: (
    //     <>
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Bidding Rs. 25
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Wining Rs. 0
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Total Bal . 25
    //       </span>
    //     </>
    //   ),
    // },

  ];

  // 🔹 Dynamic cards (gamesData se)
  const gameCards = dashboardData?.gamesData?.map((game) => ({
    title: game?.GAME,
    value: `Total Bid: ${game?.totalBid}`,
    icon: "fa-gamepad",
    extra: (
      <>
        <span>Bidding Rs: {game.totalBid}</span><br />
        <span>Winning Rs: {game.totalWin}</span><br />
        <span>Total Rs: {game?.totalBid - game?.totalWin}</span>

      </>
    )
  })) || [];


  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header mb-3">
        <div className="container-fluid">
          <h1 className="m-0 text-dark">Dashboard</h1>
        </div>
      </div>




      <div className="col-md-12 mb-3">





        <div >
          <div className="d-flex align-items-center mb-5">
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <button onClick={() => fetchDashboardData(selectedDate)}
                className="btn btn-success m-0 ms-2">Search</button>
            </div>
            <div>
              <button
                 onClick={() => {
          const today = getToday();
          setSelectedDate(today); // ✅ input me bhi update ho
          fetchDashboardData(today);
        }}
                className="btn btn-success m-0 ms-2"
              >
                Refresh Today
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        {[...cards, ...gameCards]?.map((card, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
            <div className="card bg-[#673e0e] text-white py-1 h-44 flex flex-col justify-between rounded-xl shadow-md">
              <div className="card-body flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <Link className="flex-1" to="/">
                    <div>
                      <span className="block text-sm uppercase font-semibold opacity-80">
                        {card?.title}
                      </span>
                      <span className="block text-2xl font-bold mt-1">
                        {card?.value}
                      </span>
                    </div>
                  </Link>

                  <div className="text-3xl ml-3">
                    <i className={`fa ${card?.icon} text-white`}></i>
                  </div>
                </div>

                {/* 🔹 Extra content always aligned at bottom */}
                {card?.extra && (
                  <div className=" text-xs opacity-90 leading-5">
                    {card.extra}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>




    </div>
  );
}
