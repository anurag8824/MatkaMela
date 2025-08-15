import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";


export default function ManageUsers() {
  const { id } = useParams();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("msg");
    if (message) setMsg(message);

    // Fetch user data
    const fetchUsers = async () => {
      try {
        let url = "/api/users";
        if (id) url = `/api/users/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [id, location.search]);

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

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title">User's List</h3>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Wallet</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.ID}>
                        <td>{user.NAME}</td>
                        <td>{user.MOBILE}</td>
                        <td>{user.WALLET}</td>
                        <td>
                          <Link to={`/user_edit/${user.ID}`}>
                            <i className="fa fa-pen"></i>
                          </Link>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to={`/user_transactions/${user.ID}`}>
                            <i className="fa fa-receipt"></i>
                          </Link>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Link to={`/user_bet/${user.ID}`}>
                            <i className="fa fa-rupee-sign"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
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
    </div>
  );
}
