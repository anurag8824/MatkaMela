import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";

const WithdrawHistory = () => {
  const [withdrawList, setWithdrawList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const res = await axiosInstance.get("/api/user-withdraw-list");

        if (res.data.success) {
          setWithdrawList(res?.data?.data);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error("Withdraw List Fetch Error:", err);
        alert("Failed to fetch withdraw list ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchWithdraws();
  }, []);

  if (loading) return <p>Loading withdraws...</p>;

  return (
    <div className="p-1">
      <h2 className="text-xl text-center font-bold mb-3">Withdraw History</h2>
      {withdrawList?.length === 0 ? (
        <p>No withdraws found.</p>
      ) : (
        <div className="overflow-x-scroll">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-theme text-white">
                <th className="border p-2">ID</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Holder</th>
                <th className="border p-2">Bank</th>
                <th className="border p-2">Account</th>
                <th className="border p-2">IFSC</th>
                <th className="border p-2">UPI</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {withdrawList?.map((row) => (
                <tr key={row.ID}>
                  <td className="border p-2">{row.ID}</td>
                  <td className="border p-2">{row.MOBILE}</td>
                  <td className="border p-2">{row.HOLDER}</td>
                  <td className="border p-2">{row.BANK}</td>
                  <td className="border p-2">{row.ACCOUNT}</td>
                  <td className="border p-2">{row.IFSC}</td>
                  <td className="border p-2">{row.UPI}</td>
                  <td className="border p-2">₹{row.AMOUNT}</td>
                  <td className="border p-2">
                    {row.STATUS ? row.STATUS : "Pending"}
                  </td>
                  <td className="border p-2">
                    {new Date(row.TIME).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WithdrawHistory;
