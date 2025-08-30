import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { scheduleCronForGame } from "./cronController.js";





export const AdminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await req.db.query("SELECT mobile, otp FROM SETTINGS LIMIT 1");

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const admin = rows[0];

    if (username === admin.mobile && password === admin.otp) {
      const token = jwt.sign(
        { username: admin.mobile, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        role: "admin",
        username: admin.mobile,
        token,
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("AdminLogin error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const ChangePasswordAdmin = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      // Pehle current password le aao
      const [rows] = await req.db.query("SELECT otp FROM SETTINGS LIMIT 1");
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }
  
      const currentPass = rows[0].otp;
  
      if (oldPassword !== currentPass) {
        return res.status(400).json({ success: false, message: "Old password incorrect" });
      }
  
      // Update new password
      await req.db.query("UPDATE SETTINGS SET otp = ? LIMIT 1", [newPassword]);
  
      res.json({ success: true, message: "Password changed successfully" });
    } catch (err) {
      console.error("ChangePassword error:", err);
      res.status(500).json({ success: false, message: "Server error" });
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




// ✅ Admin Dashboard Data API
export const adminDashboardData = async (req, res) => {
    try {

      const { date } = req.query; // query se date pick karlo
      let dateCondition = "";
      let dateValues = [];
  
      if (date) {
        dateCondition = " AND DATE(TIME) = ? ";
        dateValues.push(date);
      }


        // 1️⃣ Active users ka total wallet balance
        const [userBalanceRows] = await req.db.query(
            `SELECT SUM(WALLET) as totalBalance 
         FROM users 
         WHERE STATE = 'active'`
        );
        const customerBalance = userBalanceRows[0]?.totalBalance || 0;

        // 2️⃣ Deposit status wise sum
        const [depositRows] = await req.db.query(
            `SELECT STATUS, SUM(AMOUNT) as total 
         FROM PAYMENT_QUEUE 
         WHERE 1=1 ${date ? "AND DATE(TIME) = ?" : ""}
         GROUP BY STATUS`,date ? [date] : []
        );

        let depositSummary = {
            approved: 0,
            pending: 0,
            cancelled: 0,
        };
        depositRows.forEach((row) => {
            depositSummary[row.STATUS] = row.total || 0;
        });

        // 3️⃣ Withdraw status wise sum
        const [withdrawRows] = await req.db.query(
            `SELECT STATUS, SUM(AMOUNT) as total 
         FROM WITHDRAW 
          WHERE 1=1 ${date ? "AND DATE(TIME) = ?" : ""}
         GROUP BY STATUS`,date ? [date] : []
        );

        let withdrawSummary = {
            approved: 0,
            pending: 0,
            cancelled: 0,
        };
        withdrawRows.forEach((row) => {
            withdrawSummary[row.STATUS] = row.total || 0;
        });


        // 4️⃣ Total betting (STATUS = NULL)
        const [totalBettingRows] = await req.db.query(
            `SELECT SUM(POINT) as totalBetting
             FROM bets
             WHERE STATUS IS NULL ${date ? "AND DATE(DATE_TIME) = ?" : ""}`, date ? [date] : []
        );
        const totalBetting = totalBettingRows[0]?.totalBetting || 0;

        // 5️⃣ Total Win Amount (SUM of WIN_AMOUNT)
        const [totalWinRows] = await req.db.query(
            `SELECT SUM(WIN_AMOUNT) as totalWinAmount
             FROM bets WHERE 1=1 ${date ? "AND DATE(DATE_TIME) = ?" : ""}`,date ? [date] : []
        );
        const totalWinAmount = totalWinRows[0]?.totalWinAmount || 0;

        // 6️⃣ Total Commission (5% of POINT where STATUS = 'Loss')
        const [commissionRows] = await req.db.query(
            `SELECT SUM(POINT * 0.05) as totalCommission
             FROM bets
             WHERE STATUS = 'Loss' ${date ? "AND DATE(DATE_TIME) = ?" : ""}`,date ? [date] : []
        );
        const totalCommission = commissionRows[0]?.totalCommission || 0;

        // 7️⃣ Total Profit (sum of POINT where STATUS = 'Loss')
        const [profitRows] = await req.db.query(
            `SELECT SUM(POINT) as totalProfit
             FROM bets
             WHERE STATUS = 'Loss' ${date ? "AND DATE(DATE_TIME) = ?" : ""}`,
             date ? [date] : []
        );
        const totalProfit = profitRows[0]?.totalProfit || 0;

        return res.json({
            success: true,
            message: "Admin dashboard data fetched ✅",
            data: {
                customerBalance,
                deposits: depositSummary,
                withdraws: withdrawSummary,
                totalBetting,
                totalWinAmount,
                totalCommission,
                totalProfit,
            },
        });
    } catch (err) {
        console.error("Admin Dashboard Data Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error ❌",
        });
    }
};





export const editGame = async (req, res) => {
    const {
        ID,
        NAME,
        TIME1,
        TIME2,
        RATE,
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
                RATE = ?,
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
            RATE,
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

        await req.db.query(updateSql, values);
        // Step 2: Fetch updated game
        const [rowss] = await req.db.query("SELECT * FROM games WHERE ID = ?", [ID]);
        const updatedGame = rowss[0];
        // console.log(updatedGame, "✅ Game updated successfully:");

        // Step 3: Re-init cronjob with new TIME1/TIME2
        scheduleCronForGame(req.db, updatedGame);

        return res.json({ message: "Game updated successfully", updatedGame });
    } catch (error) {
        console.log("❌ Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const AddNewGame = async (req, res) => {
  try {
    const { name, time1, time2 } = req.body;

    if (!name || !time1 || !time2) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO games (name, time1, time2 , RESULT1, RESULT2) VALUES (?, ?, ?,?,? )";
    const [result] = await req.db.query(query, [name, time1, time2, "",""]);

    res.json({
      message: "Game added successfully",
      gameId: result.insertId,
    });
  } catch (error) {
    console.error("Error inserting game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}





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


// ✅ Approve / Cancel Withdraw API
export const approveWithdraws = async (req, res) => {
    const { method } = req.body; // "approved" | "cancelled"
    console.log(req.body, "req body in approve withdraws");

    try {
        let withdraws = [];

        // Single object aaya hai
        if (!Array.isArray(req.body.withdraws)) {
            withdraws = [req.body];
        } else {
            withdraws = req.body.withdraws;
        }

        try {
            for (let wd of withdraws) {
                const { ID, MOBILE, AMOUNT } = wd;

                if (method === "approved") {
                    // 1️⃣ Wallet balance se paisa minus karna
                    const updateWalletSql = `
              UPDATE users 
              SET WALLET = WALLET - ? 
              WHERE MOBILE = ?
            `;
                    await req.db.query(updateWalletSql, [parseFloat(AMOUNT), MOBILE]);
                }

                // 2️⃣ Withdraw entry ka status update karna
                const updateWithdrawSql = `
            UPDATE WITHDRAW 
            SET STATUS = ? 
            WHERE ID = ?
          `;
                await req.db.query(updateWithdrawSql, [method, ID]);
            }

            return res.json({
                success: true,
                message:
                    method === "approved"
                        ? "Withdraws approved and wallet updated ✅"
                        : "Withdraws cancelled successfully ❌",
            });
        } catch (err) {
            console.error("Transaction Error:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to update withdraws ❌",
            });
        }
    } catch (err) {
        console.error("Approve Withdraw API Error:", err);
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


export const UpdateUPI = async (req, res) => {
    const { upiId, name } = req.body;

  if (!upiId || !name) {
    return res.status(400).json({ error: "UPI ID and name are required" });
  }

  try {
    console.log(upiId, name, "in update upi");

    const [result] = await req.db.query(
      "UPDATE SETTINGS SET gateway = ?, username = ?",
      [upiId, name]
    );

    console.log("DB result:", result);
    return res.json({ message: "UPI ID updated successfully" });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database Error" });
  }
  };

  export const GetUPI = async (req, res) => {
    try {
        const [rows] = await req.db.query(
          "SELECT gateway AS upiId, username AS name FROM SETTINGS"
        );
    
        if (rows.length === 0) {
          return res.status(404).json({ error: "No UPI details found" });
        }
    
        return res.json(rows[0]); // { upiId: "...", name: "..." }
      } catch (err) {
        console.error("DB error in GET /upi:", err);
        return res.status(500).json({ error: "Database Error" });
      }
  }
  


export const GetAllUsers = async (req, res) => {
    try {
        // Users table se specific fields fetch karna
        const [rows] = await req.db.query(
            'SELECT id, mobile, wallet, refer_by, state, refer_by FROM users'
        );

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


export const AdminAddUser = async (req, res) => {
    try {
        const { name, phone, referby, dob } = req.body;
    
        if (!name || !phone || !dob) {
          return res.status(400).json({ message: "Required fields missing" });
        }
    
        // 1. Check if phone already exists
        const [existingUser] = await req.db.query(
          "SELECT * FROM users WHERE MOBILE = ?",
          [phone]
        );
        if (existingUser.length > 0) {
          return res.status(400).json({ message: "User is already registered" });
        }
    
        // 2. Check referby validity (if provided)
        if (referby) {
          if (referby === phone) {
            return res
              .status(400)
              .json({ message: "ReferBy number cannot be same as user's phone" });
          }
    
          const [refUser] = await req.db.query(
            "SELECT * FROM users WHERE MOBILE = ?",
            [referby]
          );
    
          if (refUser.length === 0) {
            return res
              .status(400)
              .json({ message: "Invalid ReferBy number. User does not exist." });
          }
        }
    
        // 3. Insert into users table
        const query = `
          INSERT INTO users (NAME, MOBILE, REFER_BY ) 
          VALUES (?, ?, ?)
        `;
        const values = [name, phone, referby || null, dob];
    
        await req.db.query(query, values);
    
        return res.status(200).json({ message: "User added successfully" });
      } catch (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Server error" });
      }
};


export const getAllBetsGameLoad = async (req, res) => {
    try {
      // SQL query to get all bets (no phone filter)
      const [bets] = await req.db.query(
        `SELECT id, number, point, type, game, game_id, date_time, status, result, phone
         FROM bets
         WHERE type IN ('Jodi', 'AndarHaraf', 'BaharHaraf')
         ORDER BY id DESC`
      );
  
      return res.json({
        message: "All bets fetched successfully",
        bets
      });
    } catch (error) {
      console.error("Error fetching all bets:", error);
      res.status(500).json({ message: "Server error" });
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
        let newWallet = parseFloat(user.WALLET) || 0; // current wallet
        console.log("Current wallet:", newWallet);
        const amt = parseFloat(amount) || 0;

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

export const declareResultList = async (req, res) => {
    try {
      // ✅ sirf required columns select kiye
      const [results] = await req.db.query(
        `SELECT 
          ID,
          GAME_ID,
          GAME_NAME,
          RESULT1,
          RESULT2,
          Jodi,
          Manual,
          andarHaraf,
          baharHaraf,
          Crossing,
          CopyPaste,
          DATE
         FROM RESULT
         ORDER BY ID DESC`
      );
  
      return res.json({
        message: "Results fetched successfully",
        results
      });
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ message: "Server error" });
    }
  };



export const winningReportList = async (req, res) => {
    try {
        const [rows] = await req.db.query(
          `SELECT 
             ID, 
             GAME_ID,
             DATE_TIME, 
             PHONE, 
             GAME, 
             STATUS, 
             RESULT, 
             TYPE, 
             WIN_AMOUNT 
           FROM bets 
           WHERE STATUS = 'Win'
           ORDER BY DATE_TIME DESC`
        );
    
        res.json({ success: true, results: rows });
      } catch (err) {
        console.error("Error fetching winning bets:", err);
        res.status(500).json({ success: false, message: "Server error" });
      }
  };