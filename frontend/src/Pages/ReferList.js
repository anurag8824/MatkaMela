import { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { FaAngleDown } from "react-icons/fa";

export default function ReferList() {
  const [referUsers, setReferUsers] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchReferredUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/refer-users");
        setReferUsers(res.data.data || []);
      } catch (err) {
        console.error("Error fetching referred users:", err);
      }
    };

    fetchReferredUsers();
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="p-1">
      <h2 className="text-2xl font-bold mb-6 text-center">Referral Commission Report</h2>

      {/* Main Table */}
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-theme text-white">
            <tr>
              <th className="py-3 px-4 text-left">S.No</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Total Earn</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">View</th>

            </tr>
          </thead>
          <tbody>
            {referUsers.map((user, index) => {
              const firstBetDate =
                user.lossBets.length > 0
                  ? new Date(user.lossBets[0].DATE_TIME).toLocaleString()
                  : "N/A";

              return (
                <>
                  {/* Main Row */}
                  <tr
                    key={index}
                    onClick={() => toggleExpand(index)}
                    className="cursor-pointer hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold underline">
                      {user.mobile}
                    </td>
                    <td className="py-3 px-4 font-bold text-green-600">
                      ₹{user.totalEarn}
                    </td>
                    <td className="py-3 px-4">{firstBetDate}</td>
                    <td className="py-3 px-4"><FaAngleDown /></td>


                  </tr>

                  {/* Expanded Detailed Bets */}
                  {expanded === index && (
                    <tr>
                      <td colSpan={5} className="bg-gray-50 p-4">
                        <h3 className="font-semibold mb-2">
                          Detailed Bets for {user.mobile}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-theme text-white">
                              <tr>
                                <th className="py-2 px-3 text-left">Date</th>
                                <th className="py-2 px-3 text-left">Point</th>
                                <th className="py-2 px-3 text-left">Earning</th>
                                <th className="py-2 px-3 text-left">Game</th>
                                <th className="py-2 px-3 text-left">Type</th>
                                <th className="py-2 px-3 text-left">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.lossBets.map((bet, betIndex) => (
                                <tr
                                  key={betIndex}
                                  className="hover:bg-gray-100 transition"
                                >
                                  <td className="py-2 px-3">
                                    {new Date(bet.DATE_TIME).toLocaleString()}
                                  </td>
                                  <td className="py-2 px-3">{bet.POINT}</td>
                                  <td className="py-2 px-3 text-green-600 font-semibold">
                                    ₹{bet.earning}
                                  </td>
                                  <td className="py-2 px-3">{bet.GAME}</td>
                                  <td className="py-2 px-3">{bet.TYPE}</td>
                                  <td className="py-2 px-3">{bet.STATUS}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
