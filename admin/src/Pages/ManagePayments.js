import React, { useEffect, useState } from "react";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [msg, setMsg] = useState("");

  // Replace with your actual API endpoint
  const fetchPayments = async () => {
    try {
      // Example fetch, replace URL with your backend API
      const res = await fetch("/api/payments?limit=10");
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;

    try {
      // Replace with your actual delete API
      const res = await fetch(`/api/payments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMsg("Payment deleted successfully.");
        setPayments(payments.filter((p) => p.ID !== id));
      } else {
        setMsg("Failed to delete payment.");
      }
    } catch (error) {
      setMsg("Error deleting payment.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {msg && <span className="text-danger">{msg}</span>}
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="index.php">Home</a>
                </li>
                <li className="breadcrumb-item active">Manage Payments</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header border-transparent bg-gradient-primary d-flex justify-content-between align-items-center">
                  <h3 className="card-title">Payment List</h3>
                  <a href="edit_payment.php" className="text-white">
                    Add Fake Payment <i className="fa fa-plus"></i>
                  </a>
                </div>

                <div className="card-body p-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Mode</th>
                              <th>Amount</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.length > 0 ? (
                              payments.map(({ ID, NAME, MODE, AMOUNT }) => (
                                <tr key={ID}>
                                  <td>{NAME}</td>
                                  <td>{MODE}</td>
                                  <td>{AMOUNT}</td>
                                  <td>
                                    <button
                                      className="btn btn-link p-0 text-danger"
                                      onClick={() => deletePayment(ID)}
                                      title="Delete Payment"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center">
                                  No payments found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional footer if needed */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
