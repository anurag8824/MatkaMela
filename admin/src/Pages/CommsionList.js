import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function CommissionList() {
  const [data, setData] = useState([]);
  const [expandedRefer, setExpandedRefer] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [search, setSearch] = useState(""); // 🔍 search state
  const [date, setDate] = useState(""); // 👈 new state

  const fetchReferredUsers = async (selectedDate = "") => {
    try {
      const res = await axiosInstance.get("/api/commission-list", {
        params: selectedDate ? { date: selectedDate } : {}
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching referred users:", err);
    }
  };

  useEffect(() => {

    fetchReferredUsers();
  }, []);

  const handleDateSubmit = (e) => {
    e.preventDefault();
    fetchReferredUsers(date);
  };

  const filteredData = data.filter((item) =>
    item.referBy?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-1">
      <h2 className="text-xl text-center font-bold mb-4">Commission User List</h2>

<div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
      {/* 🔍 Search Input */}
      <div className="flex justify-center mb-3 gap-2">
        <input
          type="text"
          placeholder="Search by ReferBy"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2 text-sm"
        />

        <button className="btn bg-success text-white">Search User</button>
      </div>


      {/* ✅ Date Filter */}
      <form
        onSubmit={handleDateSubmit}
        className="flex justify-center mb-3 gap-2"
      >
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
        <button
          type="submit"
          className="btn bg-success text-white"
        >
          Filter by Date
        </button>
      </form>

      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1 text-left">Sr.no.</th>
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">User</th>
              <th className="border px-2 py-1 text-left">Total Earn</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((refer, idx) => (
              <>
                {/* ReferBy Row */}
                <tr
                  key={idx}
                  className="cursor-pointer hover:bg-gray-50"
                // onClick={() =>
                //   setExpandedRefer(expandedRefer === idx ? null : idx)
                // }
                >
                  <td className="border px-2 py-1 ">
                    {idx + 1}
                  </td>
                  <td className="border px-2 py-1 ">
                    {refer.name}
                  </td>
                  <td className="border px-2 py-1 ">
                    {refer.referBy}
                  </td>
                  <td className="border px-2 py-1 text-green-600">
                    ₹{refer.totalEarn}
                  </td>
                </tr>

                {/* Expanded -> Users Table */}
                {expandedRefer === idx && (
                  <tr>
                    <td colSpan={2} className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full border text-xs ml-2 my-2">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="border px-2 py-1">Referred Users</th>
                              <th className="border px-2 py-1">Total Earn</th>
                            </tr>
                          </thead>
                          <tbody>
                            {refer.users.map((user, uidx) => (
                              <>
                                {/* User Row */}
                                <tr
                                  key={uidx}
                                  className="cursor-pointer hover:bg-gray-50"
                                  onClick={() =>
                                    setExpandedUser(
                                      expandedUser === `${idx}-${uidx}`
                                        ? null
                                        : `${idx}-${uidx}`
                                    )
                                  }
                                >
                                  <td className="border px-2 py-1">
                                    {user.mobile}
                                  </td>

                                  <td className="border px-2 py-1 text-blue-600">
                                    ₹{user.totalEarn}
                                  </td>
                                </tr>

                                {/* Expanded -> Bets Table */}
                                {expandedUser === `${idx}-${uidx}` && (
                                  <tr>
                                    <td colSpan={3} className="p-0">
                                      <div className="overflow-x-auto">
                                        <table className="w-full border text-xs ml-1 my-2">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th className="border px-2 py-1">
                                                Date
                                              </th>
                                              <th className="border px-2 py-1">
                                                Point
                                              </th>
                                              <th className="border px-2 py-1">
                                                Earning
                                              </th>
                                              <th className="border px-2 py-1">
                                                Game
                                              </th>
                                              <th className="border px-2 py-1">
                                                Type
                                              </th>
                                              <th className="border px-2 py-1">
                                                Status
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {user.lossBets.map((bet, bidx) => (
                                              <tr key={bidx} className="text-center">
                                                <td className="border px-2 py-1">
                                                  {new Date(
                                                    bet.DATE_TIME
                                                  ).toLocaleString()}
                                                </td>
                                                <td className="border px-2 py-1">
                                                  {bet.POINT}
                                                </td>
                                                <td className="border px-2 py-1 text-green-600">
                                                  ₹{bet.earning}
                                                </td>
                                                <td className="border px-2 py-1">
                                                  {bet.GAME}
                                                </td>
                                                <td className="border px-2 py-1">
                                                  {bet.TYPE}
                                                </td>
                                                <td className="border px-2 py-1 text-red-500">
                                                  {bet.STATUS}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
