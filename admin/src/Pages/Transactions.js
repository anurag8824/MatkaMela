import React, { useState, useEffect } from "react";

export default function Transactions({ userId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let url = userId
      ? `/api/transactions?userId=${userId}`
      : `/api/transactions`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [userId]);

  return (
    <div className="content-wrapper p-3">
      {/* Page Header */}
      <div className="content-header mb-3">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <span style={{ color: "red" }}>
                {/* message show karna ho to yaha pass karo */}
              </span>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">All Transactions</li>
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
                  <h3 className="card-title m-0">All Transactions</h3>
                </div>
                <div className="card-body p-0">
                  <div className="p-3">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Transaction</th>
                          <th>Name</th>
                          <th>Game</th>
                          <th>Amount</th>
                          <th>Balance</th>
                          <th>Bet ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.length > 0 ? (
                          transactions.map((tx, index) => (
                            <tr key={index}>
                              <td>{tx.date}</td>
                              <td>
                                <a href={`/users/${tx.user_id}`}>
                                  {tx.user_name}
                                </a>
                              </td>
                              <td>
                                {tx.game_name} {tx.remark}
                              </td>
                              <td>{tx.amount}</td>
                              <td>{tx.balance}</td>
                              <td>
                                #
                                <a
                                  href={`/user_bet/${tx.user_id}?b_id=${tx.bet_id}`}
                                >
                                  {tx.bet_id}
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No transactions found
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
