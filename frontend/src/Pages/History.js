import React, { useEffect, useState } from "react";

import ParticleCursorTrail from "../Productpage";
import axiosInstance from "../Utils/axiosInstance";

const History = () => {
  const [bets, setBets] = useState([]);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchBetHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // auth token

        const res = await axiosInstance.get(
          `${backUrl}/api/bet-game-history`,
          {}
        );

        setBets(res?.data?.bets);
      } catch (error) {
        console.error("Error fetching bet history:", error);
      }
    };

    fetchBetHistory();
  }, [backUrl]);

  return (
    <div>
      <div class="bg-white p-3 rounded shadow-sm">
        <div class="d-flex justify-content-between flex-wrap gap-3">
          {/* <!-- Pending Bet --> */}
          <div class="flex-fill text-center">
            <a value="1" class="btn btn-primary w-100 active" href="/History">
              Pending Bet
            </a>
            <p class="mt-2 small border border-danger text-danger p-2 rounded">
              जिन गेम का रिजल्ट नही आया वो PENDING BET में दिखेंगी।
            </p>
          </div>

          {/* <!-- Declared Bet --> */}
          <div class="flex-fill text-center">
            <a
              value="2"
              class="btn btn-outline-primary w-100"
              href="/History-declared"
            >
              Declared Bet
            </a>
            <p class="mt-2 small border border-danger text-danger p-2 rounded">
              जिन गेम का रिजल्ट आ गया है वो DECLARED BET में दिखेंगी।
            </p>
          </div>
        </div>

        <div class="table-responsive">
          <div class="table  table-history">
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Number </th>
                  <th>Points </th>
                  <th>Status </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
        {bets.length > 0 ? (
          bets?.map((bet, index) => (
            <tr key={bet.id}>
              <td>{index + 1}</td>
              <td>{new Date(bet.date_time).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })}</td>
              <td>{bet.game}</td>
              <td>{bet.type}</td>
              <td>{bet.number}</td>
              <td>{bet.point}</td>
              <td>{bet.status}</td>
              <td>
                <button className="btn btn-sm btn-primary">View</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No data available or something went wrong.</td>
          </tr>
        )}
      </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
