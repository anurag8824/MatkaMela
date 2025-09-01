import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { useParams } from "react-router-dom";

const DepositHistory = () => {
  const [depositList, setDepositList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const { type } = useParams(); // status filter (Pending, Approved, etc.)

  // ✅ Fetch Data
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await axiosInstance.get("/api/user-deposit-list");
        if (res.data.success) {
          setDepositList(res.data.data);
          setFilteredList(res.data.data);
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

  // ✅ Apply filters when type/date/mobile changes
  useEffect(() => {
    let temp = [...depositList];

    // 1. Status filter
    if (type) {
      temp = temp.filter((item) => (item.STATUS || "pending") === type);
    }

    // 2. Date filter
    if (selectedDate) {
      temp = temp.filter(
        (item) =>
          new Date(item.TIME).toISOString().split("T")[0] === selectedDate
      );
    }

    // 3. Mobile filter
    if (searchMobile) {
      temp = temp.filter((item) =>
        item.USER_ID.includes(searchMobile.trim())
      );
    }

    setFilteredList(temp);
  }, [type, selectedDate, searchMobile, depositList]);

  // ✅ Select / Deselect Rows
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredList.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredList.map((row) => row.ID));
    }
  };

  // ✅ Approve Single Entry
  const approveDeposit = async (row, method) => {
    try {
      await axiosInstance.post("/admin/approve-deposits", { ...row, method });
      alert(`Deposit ${method} ✅`);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to approve deposit ❌");
    }
  };

  // ✅ Bulk Approve
  const bulkApprove = async (method) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one entry!");
      return;
    }
    try {
      const selectedData = filteredList.filter((row) =>
        selectedRows.includes(row.ID)
      );
      await axiosInstance.post("/admin/approve-deposits", { deposits: selectedData, method });
      alert("Selected deposits approved ✅");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Bulk approval failed ❌");
    }
  };

  if (loading) return <p>Loading deposits...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl text-center font-bold mb-3">
        Deposit Management List
      </h2>

      {/* 🔹 Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="btn btn-success"> Search</button>
        <input
          type="text"
          placeholder="Search by Mobile"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
          className="border p-2 rounded"
        />
        {type === "pending" ? <button
          onClick={() => bulkApprove("approved")}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Approve
        </button> : ""}

        {type === "pending" ? <button
          onClick={() => bulkApprove("cancelled")}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Cancel
        </button> : ""}

        {type === "approved" ? <button
          onClick={() => bulkApprove("reverse")}
          className="bg-red-600 text-white px-3 py-1 rounded hidden"
        >
          Reverse
        </button> : ""}
      </div>

      {/* 🔹 Table */}
      {filteredList.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <div className="overflow-x-scroll">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-theme text-">
                <th className="border p-2">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === filteredList.length &&
                      filteredList.length > 0
                    }
                    onChange={handleSelectAll}
                  /> <span className="text-xs">Sr.</span>
                </th>
                <th className="border p-2">ID</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Txn ID</th>
                <th className="border p-2">Mode</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((row, idx) => (
                <tr key={row.ID}>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.ID)}
                      onChange={() => handleSelectRow(row.ID)}
                    /> {idx + 1}
                  </td>
                  <td className="border p-2">{row.ID}</td>
                  <td className="border p-2">{row.USER_ID}</td>
                  <td className="border p-2">₹{row.AMOUNT}</td>
                  <td className="border p-2">{row.TXN_ID}</td>
                  <td className="border p-2">{row.MODE}</td>
                  <td className="border p-2">{row.STATUS || "Pending"}</td>
                  <td className="border p-2">
                    {new Date(row.TIME).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {type === "pending" ? <button
                      onClick={() => approveDeposit(row, "approved")}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button> :

                      <div>  {type === "cancelled" ? type : <button onClick={() => approveDeposit(row, "reverse")} className="bg-red-600 text-white px-2 py-1 rounded">Reverse</button>}</div>

                    }
                  </td>

                  <td className="border p-2">
                    {type === "pending" ? <button
                      onClick={() => approveDeposit(row, "cancelled")}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button> : type}
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

export default DepositHistory;
