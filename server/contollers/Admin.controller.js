import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const ADMIN_USER = {
    username: "admin",
    password: "12345",
    role: "admin",


};


export const AdminLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        // token generate
        const token = jwt.sign(
            { username: ADMIN_USER.username, role: ADMIN_USER.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            success: true,
            message: "Admin login successful",
            role: ADMIN_USER.role,
            username: ADMIN_USER.username,
            token,
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password",
        });
    }
};

export const getAdminDetails = (req, res) => {
    const { username, role } = req.user;
    // console.log(req.user, "reqqkss user");
    return res.json({
        success: true,
        message: "Admin details fetched successfully",
        user: { username, role },
    });
};



export const editGame = async (req, res) => {
    const {
        ID,
        NAME,
        TIME1,
        TIME2,
        PAGE,
        GUESS,
        HIGHLIGHT,
        PANEL_RESULT,
        JODI_RESULT,
        DAYS,
        AUTO_GUESS,
        COLOR,
        PLAY,
        HOLIDAY,
        INACTIVE,
        REMARK2
    } = req.body;

    // console.log("➡️ Incoming body:", req.body);

    if (!ID) {
        console.log("❌ Game ID missing in request body");
        return res.status(400).json({ error: "Game ID is required" });
    }

    try {
        // Step 1: Check karo game exist karta hai ya nahi
        const [rows] = await req.db.query("SELECT * FROM games WHERE ID = ?", [ID]);
        // console.log("✅ Fetched game:", rows);

        if (rows.length === 0) {
            console.log("❌ No game found with ID:", ID);
            return res.status(404).json({ error: "Game not found" });
        }

        // Step 2: Update query
        const updateSql = `
            UPDATE games SET
                NAME = ?,
                TIME1 = ?,
                TIME2 = ?,
                PAGE = ?,
                GUESS = ?,
                HIGHLIGHT = ?,
                PANEL_RESULT = ?,
                JODI_RESULT = ?,
                DAYS = ?,
                AUTO_GUESS = ?,
                COLOR = ?,
                PLAY = ?,
                HOLIDAY = ?,
                INACTIVE = ?,
                REMARK2 = ?
            WHERE ID = ?
        `;

        const values = [
            NAME,
            TIME1,
            TIME2,
            PAGE,
            GUESS,
            HIGHLIGHT,
            PANEL_RESULT,
            JODI_RESULT,
            DAYS,
            AUTO_GUESS,
            COLOR,
            PLAY,
            HOLIDAY,
            INACTIVE,
            REMARK2,
            ID,
        ];

        // console.log("➡️ Update query values:", values);

        const [result] = await req.db.query(updateSql, values);
        // console.log("✅ Update result:", result);

        return res.json({ message: "Game updated successfully", result });
    } catch (error) {
        console.log("❌ Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};






// ✅ Approve / Cancel Deposit API
export const approveDeposits = async (req, res) => {
    const { method } = req.body; // "approved" | "cancelled"
    console.log(req.body, "req body in approve deposits");
    try {
        let deposits = [];

        // Single object aaya hai
        if (!Array.isArray(req.body.deposits)) {
            deposits = [req.body];
        } else {
            deposits = req.body.deposits;
        }

        try {
            for (let dep of deposits) {
                const { ID, USER_ID, AMOUNT } = dep;

                if (method === "approved") {
                    // 1️⃣ User ke wallet balance ko update karna
                    const updateWalletSql = `
              UPDATE users 
              SET WALLET = WALLET + ? 
              WHERE MOBILE = ?
            `;
                    await req.db.query(updateWalletSql, [parseFloat(AMOUNT), USER_ID]);
                }

                // 2️⃣ Deposit entry ka status update karna
                const updateDepositSql = `
            UPDATE PAYMENT_QUEUE 
            SET STATUS = ? 
            WHERE ID = ?
          `;
                await req.db.query(updateDepositSql, [method, ID]);
            }

            return res.json({
                success: true,
                message:
                    method === "approved"
                        ? "Deposits approved and wallet updated ✅"
                        : "Deposits cancelled successfully ❌",
            });
        } catch (err) {
            console.error("Transaction Error:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to update deposits ❌",
            });
        }
    } catch (err) {
        console.error("Approve Deposit API Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error ❌",
        });
    }
};



const qrFolder = path.join(process.cwd(), "qrImage");

// ✅ Controller: Upload / Update QR
export const UpdateQr = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "QR Image uploaded successfully", file: "qrscanner.jpg" });
};

// ✅ Controller: Get QR Image
export const GetQr = (req, res) => {
    const filePath = path.join(qrFolder, "qrscanner.jpg");
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "QR image not found" });
    }
};



export const GetAllUsers = async (req, res) => {
    try {
      // Users table se specific fields fetch karna
      const [rows] = await req.db.query(
        'SELECT id, mobile, wallet, refer_by, state FROM users'
      );
  
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };


  export const updateWallet = async (req, res) => {
    try {
      const { mobile, amount, type } = req.body;
  
      if (!mobile || !amount || !type) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Pehle user ko find karo
      const [users] = await req.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
  
      if (users.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = users[0];
      let newWallet = parseFloat(user.WALLET); // current wallet
      console.log("Current wallet:", newWallet);
      const amt = parseFloat(amount);
  
      if (type.toLowerCase() === "deposit") {
        newWallet += amt; // deposit -> add amount
      } else if (type.toLowerCase() === "withdraw") {
        newWallet -= amt; // withdraw -> subtract amount
        if (newWallet < 0) newWallet = 0; // if wallet goes negative
      } else {
        return res.status(400).json({ error: "Invalid type. Must be 'deposit' or 'withdraw'" });
      }
  
      // Update wallet in DB
      await req.db.query("UPDATE users SET wallet = ? WHERE mobile = ?", [newWallet, mobile]);
  
      return res.status(200).json({
        message: `${type} successful`,
        wallet: newWallet,
        user: { id: user.id, mobile: user.mobile }
      });
    } catch (err) {
      console.error("Error updating wallet:", err);
      res.status(500).json({ error: "Failed to update wallet" });
    }
  };

  // POST /admin/toggle-user-state
export const toggleUserState = async (req, res) => {
    try {
      const { mobile } = req.body;
  
      if (!mobile) {
        return res.status(400).json({ error: "Mobile number is required" });
      }
  
      // Find user by mobile
      const [users] = await req.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
  
      if (users.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = users[0];
  
      // Toggle state
      const newState = user.state.toLowerCase() === "active" ? "deactive" : "active";
  
      // Update in DB
      await req.db.query("UPDATE users SET state = ? WHERE mobile = ?", [newState, mobile]);
  
      return res.status(200).json({ message: "State updated successfully", state: newState });
    } catch (err) {
      console.error("Error toggling state:", err);
      res.status(500).json({ error: "Failed to update state" });
    }
  };
  