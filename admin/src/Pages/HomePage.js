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

  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header mb-3">
        <div className="container-fluid">
          <h1 className="m-0 text-dark">Dashboard</h1>
        </div>
      </div>

      {/* Main content */}
      <section className="content">
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
    </div>
  );
}
