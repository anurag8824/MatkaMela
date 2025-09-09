import React, { useEffect } from "react";
import axiosInstance from "../../Utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const WalletHistory = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const fetchWalletHistory = async () => {
      try {
        const response = await axiosInstance.get("/api/wallet-history");
        setAccounts(response.data.accounts);
        console.log("Wallet history:", response.data.accounts);
      } catch (error) {
        console.error("Error fetching wallet history:", error);
        toast.error("Failed to fetch wallet history");
      }
    };

    fetchWalletHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div>
      <div>
      <h2 className="text-xl text-center font-bold mb-3">Wallet History</h2>
      {accounts?.length === 0 ? (
        <p>No Wallet data found.</p>
      ) : (
        <div className="overflow-x-scroll ">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-theme text-white">
                <th className="border p-2" >ID</th>
                <th className="border p-2" >Mobile</th>
                <th className="border p-2">Pay Mode</th>
                <th className="border p-2">Point</th>
                <th className="border p-2">Closing</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {accounts?.map((acc) => (
                <tr key={acc.ID}>
                  <td className="border p-2">{acc.ID}</td>
                  <td className="border p-2">{acc.MOBILE}</td>
                  <td className="border p-2">{acc.paymode}</td>
                  <td className="border p-2">{acc.point}</td>
                  <td className="border p-2">{acc.closing}</td>
                  <td
  className={`border p-2 ${
    acc.status === "Loss" || acc.status === "Cancelled"
      ? "text-red-600 "
      : acc.status === "Win" || acc.status === "Success"
      ? "text-green-600 "
      : ""
  }`}
>
  {acc.status}
</td>

                  <td className="border p-2">{formatDate(acc.DATE)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default WalletHistory;
