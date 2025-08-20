import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance";

const DepositHistory = () => {
  const [depositList, setDepositList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await axiosInstance.get("/api/user-deposit-list", {
        });

        if (res.data.success) {
          setDepositList(res.data.data);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error("Deposit List Fetch Error:", err);
        alert("Failed to fetch deposit list ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  if (loading) return <p>Loading deposits...</p>;

  return (
    <div className="p-1 ">
      <h2 className="text-xl text-center font-bold mb-3">Deposit History</h2>
      {depositList.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <div className="overflow-x-scroll ">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-theme text-white">
              <th className="border p-2">ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Txn ID</th>
              <th className="border p-2">Mode</th>
              <th className="border p-2">Status</th>

              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {depositList.map((row) => (
              <tr key={row.id}>
                <td className="border p-2">{row.ID}</td>
                <td className="border p-2">{row.USER_ID}</td>
                <td className="border p-2">₹{row.AMOUNT}</td>
                <td className="border p-2">{row.TXN_ID}</td>
                <td className="border p-2">{row.MODE}</td>
                <td className="border p-2">{row.STATUS ? row.STATUS : "Pending"}</td>

                <td className="border p-2">{new Date(row.TIME).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default DepositHistory;
