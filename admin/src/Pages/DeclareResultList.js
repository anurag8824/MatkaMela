import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const DeclareResultList = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get(`/admin/declare-result-list`);
        const data = res.data.results || [];
        setResults(data);
        setFilteredResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, []);

  // whenever selectedDate changes, filter results
  useEffect(() => {
    if (!selectedDate) {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((item) => {
        const itemDate = new Date(item.DATE).toISOString().split("T")[0]; // "2025-08-25"
        return itemDate === selectedDate;
      });
      setFilteredResults(filtered);
    }
  }, [selectedDate, results]);

  return (
    <div className="container-fluid my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Declared Results</h2>

        {/* Date filter */}
        <div>
          <label className="me-2 fw-bold">Filter by Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-control d-inline-block"
            style={{ width: "200px" }}
          />
        </div>
      </div>

      <div
        className="table-responsive w-full"
        style={{ maxHeight: "80vh", overflowY: "auto", overflowX: "auto" }}
      >
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>SR.</th>
              <th>Market ID</th>
              <th>Market Name</th>
              <th>Result</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults?.length > 0 ? (
              filteredResults.map((item, idx) => (
                <tr key={item.ID}>
                  <td>{idx + 1}</td>
                  <td>{item.GAME_ID}</td>
                  <td>{item.GAME_NAME}</td>
                  <td>{item.RESULT1}</td>
                  <td>
                    {new Date(item.DATE).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeclareResultList;
