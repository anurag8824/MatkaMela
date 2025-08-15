import React, { useEffect, useState } from "react";

export default function ReportPage() {
  const [date, setDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch(`/api/report?date=${date}`)
      .then((res) => res.json())
      .then((data) => setReportData(data))
      .catch((err) => console.error("Error fetching report:", err));
  }, [date]);

  return (
    <div className="content-wrapper p-3">
      {/* Page Header */}
      <div className="content-header mb-3">
        <div className="container-fluid">
          <div className="row mb-2 align-items-center">
            <div className="col-sm-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="date"
                  className="form-control d-inline-block w-auto me-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Change Date
                </button>
              </form>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Report</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h3 className="card-title m-0">Report</h3>
                </div>
                <div className="card-body p-0">
                  <div className="p-3">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Market</th>
                          <th>Total</th>
                          <th>Single</th>
                          <th>Jodi</th>
                          <th>1 Patti</th>
                          <th>2 Patti</th>
                          <th>3 Patti</th>
                          <th>P/L</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.length > 0 ? (
                          reportData.map((row, idx) => (
                            <tr key={idx}>
                              <td>{row.game_name}</td>
                              <td>{row.total}</td>
                              <td>{row.single}</td>
                              <td>{row.jodi}</td>
                              <td>{row.single_patti}</td>
                              <td>{row.double_patti}</td>
                              <td>{row.triple_patti}</td>
                              <td>{row.p_l}</td>
                              <td>
                                <a
                                  href={`/report1?date=${date}&game=${row.game_id}`}
                                >
                                  <i className="fa fa-eye"></i>
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
