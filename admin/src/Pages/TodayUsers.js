import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../Utils/axiosInstance";

export default function TodayUsers() {
  const { id } = useParams();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [msg, setMsg] = useState("");

  // For Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");

  const [mobileFilter, setMobileFilter] = useState(""); // New filter state


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("msg");
    if (message) setMsg(message);

    // Fetch user data using axios
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-users");
        const data = res.data;
        const userList = Array.isArray(data) ? data : [data];
        const deactiveUsers = userList.filter((user) => user.state.toLowerCase() === "deactive");

        setUsers(deactiveUsers);
        setFilteredUsers(deactiveUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [id, location.search]);


  useEffect(() => {
    if (mobileFilter.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.mobile.includes(mobileFilter)
      );
      setFilteredUsers(filtered);
    }
  }, [mobileFilter, users]);


  // Handle open modal
  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setTransactionType(type);
    setAmount("");
    setShowModal(true);
  };

  // Handle submit transaction
  const handleSubmitTransaction = async () => {
    if (!amount) {
      alert("Please enter amount!");
      return;
    }

    try {
      const payload = {
        mobile: selectedUser.mobile,
        amount,
        type: transactionType,
      };

      // call API
      const res = await axiosInstance.post("/admin/admin-update-wallet", payload);

      alert(res.data.message || "Transaction success!");
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Transaction error:", err);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="content-wrapper p-3">
      {/* Page Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              {msg && <span style={{ color: "red" }}>{msg}</span>}
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Manage Users</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="mobileSearch" className="form-label">
          Search Mobile No.
        </label>
        <input
          id="mobileSearch"
          type="text"
          className="form-control"
          placeholder="Enter mobile number..."
          value={mobileFilter}
          onChange={(e) => setMobileFilter(e.target.value)}
        />
      </div>


      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title">User's List</h3>
            </div>

            <div className="card-body overflow-x-scroll">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Mobile</th>
                    <th>Balance</th>
                    <th>Wining</th>
                    <th>Balance</th>
                    <th>Refer By</th>
                    <th>State</th>

                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.length > 0 ? (
                    filteredUsers?.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.mobile}</td>
                        <td>{user.wallet}</td>
                        <td>{"0"}</td>
                        <td>{user.wallet}</td>


                        <td>{user.referby}</td>
                        <td><button onClick={async () => {
                          try {
                            const res = await axiosInstance.post("/admin/toggle-user-state", { mobile: user.mobile });
                            alert(res.data.message);
                            // Update frontend state
                            setUsers((prev) =>
                              prev.map((u) =>
                                u.mobile === user.mobile ? { ...u, state: res.data.state } : u
                              )
                            );
                            setFilteredUsers((prev) =>
                              prev.map((u) =>
                                u.mobile === user.mobile ? { ...u, state: res.data.state } : u
                              )
                            );
                          } catch (err) {
                            console.error("State toggle error:", err);
                            alert("Failed to toggle state!");
                          }
                        }} className="btn btn-sm btn-outline-danger">{user.state}</button></td>

                        <td className="text-center hidden  gap-1 md:flekx">
                          <Link className="btn bg-amber-400" to={`/user_edit/${user.id}`}>
                            <i className="fa fa-pen "></i>
                          </Link>

                          <button
                            className="btn text-white bg-success"
                            onClick={() => handleOpenModal(user, "deposit")}
                          >
                            Deposit
                          </button>
                          <button
                            className="btn text-white bg-danger"
                            onClick={() => handleOpenModal(user, "withdraw")}
                          >
                            Withdraw
                          </button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showModal && selectedUser && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">
                  {transactionType === "deposit" ? "Deposit" : "Withdraw"} Funds
                </h5>

              </div>

              <div className="modal-body">
                <p className="mb-2">
                  <b>User:</b> {selectedUser.mobile}
                </p>
                <p className="mb-2">
                  <b>Wallet:</b> {selectedUser.wallet}
                </p>
                <div className="form-group mt-3">
                  <label>
                    {transactionType === "deposit" ? "Deposit" : "Withdraw"}{" "}
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitTransaction}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
