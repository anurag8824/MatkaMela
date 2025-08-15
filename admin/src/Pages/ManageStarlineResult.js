import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ManageStarlineResult() {
  const location = useLocation();
  const [date, setDate] = useState("");
  const [results, setResults] = useState({});
  const [msg, setMsg] = useState("");

  // Format hours to AM/PM
  const formatHour = (h) => {
    if (h < 12) return `${h} AM`;
    if (h === 12) return `12 PM`;
    return `${h - 12} PM`;
  };

  // Get hours list
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 → 20

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("msg");
    const urlDate = searchParams.get("date");

    if (message) setMsg(message);
    const today = new Date().toISOString().split("T")[0];
    setDate(urlDate || today);

    if (urlDate || today) {
      fetch(`/api/starline-results?date=${urlDate || today}`)
        .then((res) => res.json())
        .then((data) => {
          const resultMap = {};
          data.forEach((item) => {
            resultMap[item.HOUR] = item.RESULT;
          });
          setResults(resultMap);
        })
        .catch((err) => console.error("Error fetching results:", err));
    }
  }, [location.search]);

  const handleSubmit = (hour) => {
    const formData = {
      time: hour,
      date: date,
      result: results[hour] || "",
    };

    fetch("/api/starline-result-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Result updated");
      })
      .catch((err) => console.error("Error updating result:", err));
  };

  return (
    <div className="content-wrapper p-3">
      {/* Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Manage Starline Result</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Starline Result</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {msg && <div className="text-danger mb-3">{msg}</div>}

      {/* Date Picker */}
      <form className="row mb-3">
        <div className="col-lg-4">
          <input
            type="date"
            className="form-control"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-lg-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `?date=${date}`;
            }}
          >
            Select Date
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td style={{ width: "100px" }}>{formatHour(hour)}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={results[hour] || ""}
                    max="999"
                    onChange={(e) =>
                      setResults({ ...results, [hour]: e.target.value })
                    }
                  />
                </td>
                <td style={{ width: "120px" }}>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleSubmit(hour)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
