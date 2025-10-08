import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { toast } from "react-toastify";

const Manual = () => {

  const gameId = useParams().id
  const backUrl = process.env.REACT_APP_BACKEND_URL;



  // 10 rows banate hain, har row ke liye initial state
  const [rows, setRows] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      jodiInputs: Array(5).fill(""),
      points: ""
    }))
  );


  const [loading, setLoading] = useState(false); // ✅ loading state


  // Jodi value change
  const handleJodiChange = (rowIndex, inputIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].jodiInputs[inputIndex] = value;
    setRows(updatedRows);
  };

  // Points change
  const handlePointsChange = (rowIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].points = value;
    setRows(updatedRows);
  };

  // Total calculate for one row
  const calculateTotal = (row) => {
    const filledCount = row.jodiInputs.filter((val) => val.trim() !== "").length;
    return row.points && filledCount
      ? Number(row.points) * filledCount
      : 0;
  };

  // Place Bet
  const handlePlaceBet = async () => {
    const dataToSend = rows.map((row) => ({
      rowId: row.id,
      jodiValues: row.jodiInputs,
      point: row.points,
      total: calculateTotal(row)
    }));

    console.log("Data to send:", dataToSend); // Send se pehle check

    try {
      setLoading(true);
      const res = await axiosInstance.post(`${backUrl}/api/bet-game-manual`, { dataToSend, totalPoints, gameId });
      console.log("API Response:", res.data);
      toast.success("Bet Placed Successfully ✅");
      // ✅ Reset rows after bet
      setRows(
        Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          jodiInputs: Array(5).fill(""),
          points: ""
        }))
      );
      window.location.reload();
    } catch (err) {
      console.error("API Error:", err);
      toast.error(err.response.data.message || "Error placing bet");
    }
    finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  // Total points of all rows
  const totalPoints = rows.reduce(
    (sum, row) => sum + calculateTotal(row),
    0
  );



  return (
    <div className="">


      {/* Top bar */}
      <div className="flex justify-between mb-4 p-2 border rounded bg-gray-100">
        <div>
          <strong>Points Remaining:</strong> 1000
        </div>
        <div>
          <strong>Total Points:</strong> {totalPoints}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover w-full border">
          <thead className="tablehead bg-gray-200">
            <tr>
              <th>Row</th>
              <th>Jodi</th>
              <th>Point</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="padding-table">
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td className="text-center">{row.id}</td>
                <td className="flex gap-1">
                  {row.jodiInputs.map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={val}
                      maxLength={2}
                      onChange={(e) =>
                        handleJodiChange(rowIndex, idx, e.target.value)
                      }
                      onKeyDown={(e) => {
                        // prevent letters and symbols except digits, backspace, delete, arrows
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight" &&
                          e.key !== "Tab"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      className="w-14 h-7 border border-gray-400 rounded text-center text-sm focus:outline-none focus:border-blue-500"
                    />
                  ))}
                </td>
                <td>
                  <input
                    type="number"
                    value={row.points}
                    min="0"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || Number(val) >= 0) {
                        handlePointsChange(rowIndex, val);
                      }
                    }}
                    onWheel={(e) => e.target.blur()} // scroll disable
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className="w-20 h-7 border border-gray-400 rounded text-center text-sm focus:outline-none focus:border-blue-500"
                  />
                </td>
                <td>
                  <input
                    readOnly
                    type="text"
                    value={calculateTotal(row)}
                    className="w-20 h-7 border border-gray-400 rounded text-center text-sm bg-gray-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Place Bet Button */}
      <button
        onClick={handlePlaceBet}
        disabled={loading} // ✅ Disable while loading
        className={`mt-4 w-full text-white py-2 text-lg rounded 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
        `}
      >
        {loading ? "Placing Bet..." : "Place Bet"}
      </button>
    </div>
  );
};

export default Manual;
