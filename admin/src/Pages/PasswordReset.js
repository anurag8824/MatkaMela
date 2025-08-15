import React, { useState } from 'react';

function PasswordReset({ userId, message }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace below with your form submission logic, e.g., API call
    console.log('Reset password for ID:', userId, 'New Password:', password);
    // You might want to send this data via fetch or axios to your backend
  };

  return (
    <div className="container my-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.php">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">Settings</li>
        </ol>
      </nav>

      {message && <div className="alert alert-danger">{message}</div>}

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title mb-0">Reset Password</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={userId} />
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary float-end">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
