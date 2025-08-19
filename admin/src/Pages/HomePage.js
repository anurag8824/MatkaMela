import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

export default function HomePage() {
  const [stats, setStats] = useState({
    user_count: 0,
    total_wallet: 0,
    bet_count: 0,
    payment_count: 0,
    with_count: 0,
  });

  useEffect(() => {
    fetch("/api/dashboard") // Backend se stats fetch karega
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching dashboard:", err));
  }, []);


  const cards = [
    { title: "Customer Balance", value: "33873.55", icon: "fa-users" },
    { title: "Add Money", value: "2640", icon: "fa-coins" },
    {
      title: "Withdraw Money",
      icon: "fa-users",
      value: "2489.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            PENDING RS: <span className="counter-anim">0</span>
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            SUCCESS RS: <span className="counter-anim">4010</span>
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            CANCEL RS: <span className="counter-anim">0</span>
          </span>
        </>
      ),
    },
    { title: "Total Bidding", value: "5395", icon: "fa-users" },
    { title: "Commission", value: "200.35", icon: "fa-users" },
    { title: "Winning Amount", value: "2705", icon: "fa-users" },
    { title: "Profit", value: "2489.65", icon: "fa-money-bill" },
    {
      title: "Disawar",
      icon: "fa-users",
      value: "2489.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            Bidding Rs. 25
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Wining Rs. 0
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Total Bal . 25
          </span>
        </>
      ),
    },
    {
      title: "Delhi Bazar",
      icon: "fa-users",
      value: "489.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            Bidding Rs. 1867
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Wining Rs. 2420
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Total Bal . -553
          </span>
        </>
      ),
    },
    {
      title: "Shree Ganesh",
      icon: "fa-users",
      value: "29.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            Bidding Rs. 2155
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Wining Rs. 0
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Total Bal . 2155
          </span>
        </>
      ),
    },
    {
      title: "Faridabad",
      icon: "fa-users",
      value: "439.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            Bidding Rs. 400
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Wining Rs. 0
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Total Bal . 400
          </span>
        </>
      ),
    },
    {
      title: "Ghaziabad",
      icon: "fa-users",
      value: "19.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            Bidding Rs. 66
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Wining Rs. 0
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Total Bal . 66
          </span>
        </>
      ),
    },
    {
      title: "Gali",
      icon: "fa-users",
      value: "989.65",
      extra: (
        <>
          <span className="weight-500 uppercase-font txt-light font-13">
            Bidding Rs. 35
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Wining Rs. 0
          </span>
          <br />
          <span className="weight-500 uppercase-font txt-light font-13">
            Total Bal . 35
          </span>
        </>
      ),
    },
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



      <div className="row">


      
       <div className="col-md-12 mb-3">
        <form method="get">
          <div className="d-flex align-items-center mb-5">
            <div>
              <input
                type="date"
                name="select_date"
                defaultValue="2025-08-19"
                className="form-control"
                placeholder="Select Date"
                id="cdate"
                required
              />
            </div>
            <div>
              <button className="btn btn-success m-0 ms-2">Search</button>
            </div>
            <div>
              <a
                href="https://admin.dsmatka.com/public/administrator/dashboard"
                className="btn btn-success m-0 ms-2"
              >
                Refresh Today
              </a>
            </div>
          </div>
        </form>
      </div>





      {cards?.map((card, index) => (
      
  
     
      <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-1 ">
        <div className="card bg-[#673e0e] text-white py-3  ">
          <div className="card-body">
            <div className="d-flex items-center justify-content-between ">
              <Link to="/">
                <div className="pl-0 pr-0 data-wrap-left">
                  <span className="weight-500 uppercase txt-light block font-16">
                    {card?.title}
                  </span>
                  <span className="txt-light block counter">
                    <span className="counter-anim">{card?.value}</span>
                  </span>
                </div>
               
              </Link>

              <div className="pl-0 pr-0 data-wrap-right text-3xl">
                  <i className={`fa ${card?.icon} txt-light  data-right-rep-icon`}></i>
                </div>
            </div>
          </div>
        </div>
      </div>
       
    ) )}

    

      {/* Repeat same structure for other cards... */}
    </div>


      
    </div>
  );
}
