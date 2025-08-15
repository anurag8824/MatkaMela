import React, { useEffect, useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({
    OTP: "",
    OTP_KEY: "",
    RECHARGE: "",
    WITHDRAW: "",
    GATEWAY: "",
    GATEWAY_KEY: "",
    MOBILE: "",
    SINGLE: "",
    JODI: "",
    SINGLE_PATTI: "",
    DOUBLE_PATTI: "",
    TRIPPLE_PATTI: "",
    HALF_SANGAM: "",
    FULL_SANGAM: "",
    GPAY: "",
    PHONEPAY: "",
    PAYTM: "",
    STARLINE: "",
    STARLINE_SINGLE: "",
    STARLINE_DOUBLE: "",
    STARLINE_GAME: "",
    APP_NAME: "",
    GUESS: "",
    BONUS: "",
    REFER: ""
  });

  const [msg, setMsg] = useState("");

  // Simulate fetching settings from API
  useEffect(() => {
    async function fetchSettings() {
      try {
        // Replace with your real API endpoint
        const res = await fetch("/api/settings");
        const data = await res.json();

        // Map API data keys to state keys as needed
        setForm({
          OTP: data.OTP || "",
          OTP_KEY: data.OTP_KEY || "",
          RECHARGE: data.RECHARGE || "",
          WITHDRAW: data.WITHDRAW || "",
          GATEWAY: data.GATEWAY || "",
          GATEWAY_KEY: data.GATEWAY_KEY || "",
          MOBILE: data.MOBILE || "",
          SINGLE: data.SINGLE || "",
          JODI: data.JODI || "",
          SINGLE_PATTI: data.SINGLE_PATTI || "",
          DOUBLE_PATTI: data.DOUBLE_PATTI || "",
          TRIPPLE_PATTI: data.TRIPPLE_PATTI || "",
          HALF_SANGAM: data.HALF_SANGAM || "",
          FULL_SANGAM: data.FULL_SANGAM || "",
          GPAY: data.GPAY || "",
          PHONEPAY: data.PHONEPAY || "",
          PAYTM: data.PAYTM || "",
          STARLINE: data.STARLINE || "",
          STARLINE_SINGLE: data.STARLINE_SINGLE || "",
          STARLINE_DOUBLE: data.STARLINE_DOUBLE || "",
          STARLINE_GAME: data.STARLINE_GAME || "",
          APP_NAME: data.APP_NAME || "",
          GUESS: data.GUESS || "YES",
          BONUS: data.BONUS || "",
          REFER: data.REFER || ""
        });
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    }
    fetchSettings();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your real API endpoint and method
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMsg("Settings updated successfully.");
      } else {
        setMsg("Failed to update settings.");
      }
    } catch (error) {
      setMsg("Error updating settings.");
      console.error(error);
    }
  };

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
                <li className="breadcrumb-item active">Settings</li>
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
                <div className="card-header border-transparent bg-gradient-primary">
                  <h3 className="card-title">Settings</h3>
                </div>
                <div className="card-body p-0">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <label>Mobile</label>
                          <input
                            type="number"
                            className="form-control"
                            name="MOBILE"
                            value={form.MOBILE}
                            onChange={handleChange}
                          />
                          <br />

                          <label>Single</label>
                          <input
                            type="number"
                            className="form-control"
                            name="SINGLE"
                            value={form.SINGLE}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>JODI</label>
                          <input
                            type="number"
                            className="form-control"
                            name="JODI"
                            value={form.JODI}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Single Patti</label>
                          <input
                            type="number"
                            className="form-control"
                            name="SINGLE_PATTI"
                            value={form.SINGLE_PATTI}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Starline Single</label>
                          <input
                            type="number"
                            className="form-control"
                            name="STARLINE"
                            value={form.STARLINE}
                            onChange={handleChange}
                          />
                          <br />

                          <label>UPI ID</label>
                          <input
                            type="text"
                            className="form-control"
                            name="GPAY"
                            value={form.GPAY}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Guess</label>
                          <select
                            name="GUESS"
                            className="form-control"
                            value={form.GUESS}
                            onChange={handleChange}
                          >
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                          </select>
                          <br />

                          <label>Min. Recharge Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            name="RECHARGE"
                            value={form.RECHARGE}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Min. Withdraw Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            name="WITHDRAW"
                            value={form.WITHDRAW}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>OTP</label>
                          <select
                            name="OTP"
                            className="form-control"
                            value={form.OTP || "DVGROUP"}
                            onChange={handleChange}
                          >
                            <option value="DVGROUP">DVGROUP</option>
                            <option value="FAST2SMS">FAST2SMS</option>
                          </select>
                          <br />

                          <label>OTP Key</label>
                          <input
                            type="text"
                            className="form-control"
                            name="OTP_KEY"
                            value={form.OTP_KEY}
                            onChange={handleChange}
                          />
                          <br />
                        </div>

                        <div className="col-lg-6">
                          <label>Double Patti</label>
                          <input
                            type="number"
                            className="form-control"
                            name="DOUBLE_PATTI"
                            value={form.DOUBLE_PATTI}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Tripple Patti</label>
                          <input
                            type="number"
                            className="form-control"
                            name="TRIPPLE_PATTI"
                            value={form.TRIPPLE_PATTI}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Half Sangam</label>
                          <input
                            type="number"
                            className="form-control"
                            name="HALF_SANGAM"
                            value={form.HALF_SANGAM}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>Full Sangam</label>
                          <input
                            type="number"
                            className="form-control"
                            name="FULL_SANGAM"
                            value={form.FULL_SANGAM}
                            onChange={handleChange}
                            required
                          />
                          <br />

                          <label>App File Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="APP_NAME"
                            value={form.APP_NAME}
                            onChange={handleChange}
                          />
                          <br />

                          <label>Payment Method</label>
                          <select
                            name="GATEWAY"
                            className="form-control"
                            value={form.GATEWAY || "MANUAL"}
                            onChange={handleChange}
                          >
                            <option value="MANUAL">MANUAL</option>
                            <option value="UPIGATEWAY">UPIGATEWAY</option>
                          </select>
                          <br />

                          <label>UPI Gateway Key</label>
                          <input
                            type="text"
                            className="form-control"
                            name="GATEWAY_KEY"
                            value={form.GATEWAY_KEY}
                            onChange={handleChange}
                          />
                          <br />

                          <label>First Recharge Bonus (0 for no bonus)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="BONUS"
                            value={form.BONUS}
                            onChange={handleChange}
                          />
                          <br />

                          <label>Refer % on each recharge (0 for no reference bonus)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="REFER"
                            value={form.REFER}
                            onChange={handleChange}
                          />
                          <br />
                        </div>
                      </div>

                      <div className="card-footer clearfix">
                        <button type="submit" className="btn btn-primary float-right">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
}
