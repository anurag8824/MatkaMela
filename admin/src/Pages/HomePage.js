import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axiosInstance from "../Utils/axiosInstance";

export default function HomePage() {
  const [stats, setStats] = useState({
    user_count: 0,
    total_wallet: 0,
    bet_count: 0,
    payment_count: 0,
    with_count: 0,
  });

  const [dashboardData, setDashboardData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");



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


    fetchDashboardData();
  }, []);

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };


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
    // {
    //   title: "Delhi Bazar",
    //   icon: "fa-users",
    //   value: "489.65",
    //   extra: (
    //     <>
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Bidding Rs. 1867
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Wining Rs. 2420
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Total Bal . -553
    //       </span>
    //     </>
    //   ),
    // },
    // {
    //   title: "Shree Ganesh",
    //   icon: "fa-users",
    //   value: "29.65",
    //   extra: (
    //     <>
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Bidding Rs. 2155
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Wining Rs. 0
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Total Bal . 2155
    //       </span>
    //     </>
    //   ),
    // },
    // {
    //   title: "Faridabad",
    //   icon: "fa-users",
    //   value: "439.65",
    //   extra: (
    //     <>
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Bidding Rs. 400
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Wining Rs. 0
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Total Bal . 400
    //       </span>
    //     </>
    //   ),
    // },
    // {
    //   title: "Ghaziabad",
    //   icon: "fa-users",
    //   value: "19.65",
    //   extra: (
    //     <>
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Bidding Rs. 66
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Wining Rs. 0
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Total Bal . 66
    //       </span>
    //     </>
    //   ),
    // },
    // {
    //   title: "Gali",
    //   icon: "fa-users",
    //   value: "989.65",
    //   extra: (
    //     <>
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Bidding Rs. 35
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Wining Rs. 0
    //       </span>
    //       <br />
    //       <span className="weight-500 uppercase-font txt-light font-13">
    //         Total Bal . 35
    //       </span>
    //     </>
    //   ),
    // },
  ];

  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header mb-3">
        <div className="container-fluid">
          <h1 className="m-0 text-dark">Dashboard</h1>
        </div>
      </div>

      {/* Main content */}
      <section className="content hidden">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box bg-light p-3 shadow-sm">
                <span className="info-box bg-info text-red rounded">
                  <i className="fas fa-users fa-2x"></i>
                </span>
                <div className="info-box-content">
                  <Link to="/users" style={{ color: "black" }}>
                    <span className="info-box-text">Users</span>
                    <span className="info-box-number">
                      {stats.user_count}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box bg-light p-3 shadow-sm">
                <span className="info-box-icon bg-success text-red rounded">
                  <i className="fas fa-wallet fa-2x"></i>
                </span>
                <div className="info-box-content">
                  <a href="#" style={{ color: "black" }}>
                    <span className="info-box-text">Total Wallet</span>
                    <span className="info-box-number">
                      {stats.total_wallet}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box bg-light p-3 shadow-sm">
                <span className="info-box-icon bg-danger text-red rounded">
                  <i className="fas fa-clipboard fa-2x"></i>
                </span>
                <div className="info-box-content">
                  <Link to="/bets" style={{ color: "black" }}>
                    <span className="info-box-text">Pending Bet</span>
                    <span className="info-box-number">
                      {stats.bet_count}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box bg-light p-3 shadow-sm">
                <span className="info-box-icon bg-dark text-red rounded">
                  <i className="fas fa-rupee-sign fa-2x"></i>
                </span>
                <div className="info-box-content">
                  <Link to="/payment_queue" style={{ color: "black" }}>
                    <span className="info-box-text">Recharge Queue</span>
                    <span className="info-box-number">
                      {stats.payment_count}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box bg-light p-3 shadow-sm">
                <span className="info-box-icon bg-warning text-red rounded">
                  <i className="fas fa-rupee-sign fa-2x"></i>
                </span>
                <div className="info-box-content">
                  <a href="/with_queue" style={{ color: "black" }}>
                    <span className="info-box-text">Withdraw Queue</span>
                    <span className="info-box-number">
                      {stats.with_count}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



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
                onClick={() => fetchDashboardData(getToday())}
                className="btn btn-success m-0 ms-2"
              >
                Refresh Today
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        {cards?.map((card, index) => (
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
