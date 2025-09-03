import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { useParams } from "react-router-dom";

const WithdrawHistory = () => {
  const [withdrawList, setWithdrawList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const { type } = useParams(); // status filter (Pending, Approved, Cancelled)

  // ✅ Fetch Withdraw List
  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const res = await axiosInstance.get("/api/user-withdraw-list");
        if (res.data.success) {
          setWithdrawList(res.data.data);
          setFilteredList(res.data.data);
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

  // ✅ Apply filters when type/date/mobile changes
  useEffect(() => {
    let temp = [...withdrawList];

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
        item.MOBILE.includes(searchMobile.trim())
      );
    }

    setFilteredList(temp);
  }, [type, selectedDate, searchMobile, withdrawList]);

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

  // ✅ Approve/Cancel Single Withdraw
  const approveWithdraw = async (row, method) => {
    try {
      await axiosInstance.post("/admin/approve-withdraws", { ...row, method });
      alert(`Withdraw ${method} ✅`);
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to update withdraw ❌");
    }
  };

  // ✅ Bulk Approve/Cancel
  const bulkApprove = async (method) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one entry!");
      return;
    }
    try {
      const selectedData = filteredList.filter((row) =>
        selectedRows.includes(row.ID)
      );
      await axiosInstance.post("/admin/approve-withdraws", { withdraws: selectedData, method });
      alert("Selected withdraws updated ✅");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Bulk approval failed ❌");
    }
  };

  if (loading) return <p>Loading withdraws...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl text-center font-bold mb-3">
        Withdraw Management List
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

        {type === "pending" ? (
          <>
            <button
              onClick={() => bulkApprove("approved")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => bulkApprove("cancelled")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : null}
      </div>

      {/* 🔹 Table */}
      {filteredList?.length === 0 ? (
        <p>No withdraws found.</p>
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
                  />{" "}
                  <span className="text-xs">Sr.</span>
                </th>
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
                <th className="border p-2">Action</th>
                <th className="border p-2"></th>

              </tr>
            </thead>
            <tbody>
              {filteredList?.map((row, idx) => (
                <tr key={row.ID}>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.ID)}
                      onChange={() => handleSelectRow(row.ID)}
                    />{" "}
                    {idx + 1}
                  </td>
                  <td className="border p-2">{row.ID}</td>
                  <td className="border p-2">{row.MOBILE}</td>
                  <td className="border p-2">{row.HOLDER}</td>
                  <td className="border p-2">{row.BANK}</td>
                  <td className="border p-2">{row.ACCOUNT}</td>
                  <td className="border p-2">{row.IFSC}</td>
                  <td className="border p-2">{row.UPI}</td>
                  <td className="border p-2">₹{row.AMOUNT}</td>
                  <td className="border p-2">{row.STATUS || "Pending"}</td>
                  <td className="border p-2">
                    {new Date(row.TIME).toLocaleString()}
                  </td>

                  <td className="border p-2 flex gap-2">
                    {type === "pending" ? (
                      <>
                        <button
                          onClick={() => approveWithdraw(row, "approved")}
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => approveWithdraw(row, "cancelled")}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <div>
                    { type === "cancelled" ? type : <button  onClick={() => approveWithdraw(row, "reverse")} className="bg-red-600 text-white px-2 py-1 rounded">Reverse</button>}


                      </div>
                    )}
                  </td>
                  <td className="border p-2">{type}</td>

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
