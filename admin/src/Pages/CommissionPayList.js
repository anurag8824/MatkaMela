import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function CommissionPayList() {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchCommissions();
  }, []);

  // ✅ Fetch Commissions with optional date filter
  const fetchCommissions = async (date = "") => {
    try {
      const url = date
        ? `api/game-commission?date=${date}`
        : "api/game-commission";
      const res = await axiosInstance.get(url);
      if (res.data.success) {
        // const pendingData = res.data.data.filter(c => c.Pay === "pending");
        const pendingData = res.data.data

        setCommissions(pendingData);
      }
    } catch (err) {
      console.error("Error fetching commissions:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle date filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      fetchCommissions(selectedDate);
    }
  };

  // ✅ Handle single row Pay
  const handleSinglePay = async (c) => {
    try {
      await axiosInstance.post("api/pay-commission", {
      payList:{  ID: c.ID, // 👈 capital ID
        phone: c.phone,
        earn: c.earn,
        pay: c.Pay,}
      });
      alert(`Commission paid for BetID: ${c.betId}`);
      fetchCommissions(selectedDate);
    } catch (err) {
      console.error("Error paying commission:", err);
    }
  };

  // ✅ Handle select checkbox toggle
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }

    // agar saari rows select ho gayi toh selectAll true karo
    if (
      commissions.length > 0 &&
      selectedRows.length + 1 === commissions.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  // ✅ Handle Select All
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      const allIds = commissions.map((c) => c.ID);
      setSelectedRows(allIds);
      setSelectAll(true);
    }
  };

  // ✅ Handle bulk pay
  const handleBulkPay = async () => {
    if (selectedRows.length === 0) {
      alert("⚠️ Select entries first to pay");
      return;
    }

    try {
      const selectedData = commissions.filter((c) =>
        selectedRows.includes(c.ID)
      );
      const payload = selectedData.map((c) => ({
        ID: c.ID, // 👈 capital ID
        phone: c.phone,
        earn: c.earn,
        pay: c.Pay,
      }));

      await axiosInstance.post("api/pay-commission", {payList : payload});
      alert(`Paid commission for ${payload.length} entries`);
      setSelectedRows([]);
      setSelectAll(false);
      fetchCommissions(selectedDate);
    } catch (err) {
      console.error("Error in bulk pay:", err);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Commission Records</h1>

      {/* Date Filter */}
      <form onSubmit={handleFilterSubmit} className="mb-4 flex gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Filter
        </button>
        <button
          type="button"
          onClick={handleBulkPay}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Pay Selected ({selectedRows.length})
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2 border">Bet ID</th>
              <th className="px-4 py-2 border">Bet By</th>
              <th className="px-4 py-2 border">ReferBy (Phone)</th>
              <th className="px-4 py-2 border">Point</th>
              <th className="px-4 py-2 border">Earn</th>
              {/* <th className="px-4 py-2 border">Game</th> */}
              {/* <th className="px-4 py-2 border">Status</th> */}
              <th className="px-4 py-2 border">Pay</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.ID} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(c.ID)}
                    onChange={() => handleSelectRow(c.ID)}
                  />
                </td>
                <td className="px-4 py-2 border">{c.betId}</td>
                <td className="px-4 py-2 border">{c.betuser}</td>
                <td className="px-4 py-2 border">{c.phone}</td>
                <td className="px-4 py-2 border">{c.point}</td>
                <td className="px-4 py-2 border">{c.earn}</td>
                {/* <td className="px-4 py-2 border">{c.GAME}</td> */}
                {/* <td className="px-4 py-2 border">{c.STATUS}</td> */}
                <td className="px-4 py-2 border">{c.Pay}</td>
                <td className="px-4 py-2 border">
                  {new Date(c.DATE_TIME).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  {c.Pay === "pending" ?  <button
                    onClick={() => handleSinglePay(c)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Pay
                  </button> : "Paid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
