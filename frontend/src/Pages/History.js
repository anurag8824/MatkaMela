import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const History = () => {
  const [bets, setBets] = useState([]);
  const [filter, setFilter] = useState("pending"); // default tab
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchBetHistory = async () => {
      try {
        const res = await axiosInstance.get(`${backUrl}/api/bet-game-history`);
        setBets(res?.data?.bets || []);
      } catch (error) {
        console.error("Error fetching bet history:", error);
      }
    };

    fetchBetHistory();
  }, [backUrl]);

  // Filter bets based on selected tab
  const filteredBets =
    filter === "pending"
      ? bets.filter((b) => !b.status) // Pending = status null/empty
      : bets.filter((b) => b.status); // Declared = status present

  return (
    <div>
      <div className="bg-white p-3 rounded shadow-sm">
        <div className="d-flex justify-content-between flex-wrap gap-3">
          {/* Pending Bet */}
          <div className="flex-fill text-center">
            <button
              className={`btn w-100 ${filter === "pending" ? "btn-primary" : "btn-outline-primary"
                }`}
              onClick={() => setFilter("pending")}
            >
              Pending Bet
            </button>
            <p className="mt-2 small border border-danger text-danger p-2 rounded">
              जिन गेम का रिजल्ट नही आया वो PENDING BET में दिखेंगी।
            </p>
          </div>

          {/* Declared Bet */}
          <div className="flex-fill text-center">
            <button
              className={`btn w-100 ${filter === "declared" ? "btn-primary" : "btn-outline-primary"
                }`}
              onClick={() => setFilter("declared")}
            >
              Declared Bet
            </button>
            <p className="mt-2 small border border-danger text-danger p-2 rounded">
              जिन गेम का रिजल्ट आ गया है वो DECLARED BET में दिखेंगी।
            </p>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>Number</th>
                <th>Points</th>
                <th className="grid"><span className="text-[10px]">(Bet type)</span>Result</th>
                <th>Win_amount</th>

                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredBets.length > 0 ? (
                filteredBets.map((bet, index) => (
                  <tr key={bet.id}>
                    <td>{index + 1}</td>
                    <td>
  {new Date(bet.date_time).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true          // ✅ AM/PM format
  })}
</td>

                    <td>{bet.game}</td>
                    <td>{bet.type}</td>
                    <td>{bet.number}</td>
                    <td>{bet.point}</td>


                    <td>{bet.result ? bet?.result : "-"}</td>
                    <td>{bet.win_amount}</td>

                    <td>
                      {bet.status ? (
                        <span className={`badge ${bet.status === "Win" ? "bg-success" : "bg-danger"}`}>{bet.status}</span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </td>
                    {/* <td>
                      <button className="btn btn-sm btn-primary">View</button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No {filter} bets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
