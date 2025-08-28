import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function CommissionList() {
  const [data, setData] = useState([]);
  const [expandedRefer, setExpandedRefer] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchReferredUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/commission-list");
        setData(res.data.data || []);
      } catch (err) {
        console.error("Error fetching referred users:", err);
      }
    };
    fetchReferredUsers();
  }, []);

  return (
    <div className="p-1">
      <h2 className="text-xl font-bold mb-4">Commission List</h2>

      <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1 text-left">User</th>
            <th className="border px-2 py-1 text-left">Total Earn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((refer, idx) => (
            <>
              {/* ReferBy Row */}
              <tr
                key={idx}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  setExpandedRefer(expandedRefer === idx ? null : idx)
                }
              >
                <td className="border px-2 py-1 font-semibold">
                  {refer.referBy}
                </td>
                <td className="border px-2 py-1 text-green-600 font-medium">
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
