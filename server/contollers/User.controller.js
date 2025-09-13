import MsmeApplication from "../models/MsmeApplication.js";
import Users from "../models/User.js";
import UserApplication from "../models/UserApplication.js";
import UserBuy from "../models/UserBuyModel.js";
import bcrypt from "bcrypt"; // ✅ CORRECT spelling
import jwt from "jsonwebtoken"
import { insertAccountEntry } from "./utils/accountHelper.js";

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET, "jswtt")



export const ApplicationForm = async (req, res) => {
  console.log(req.body, req.files, "req body", "req.files");
  try {
    const files = req.files;
    const body = req.body;



    const application = new UserApplication({
      ...body,
      profileImage: files.profileImage?.[0]?.path || '',
      aadharFrontImage: files.aadharFrontImage?.[0]?.path || '',
      aadharBackImage: files.aadharBackImage?.[0]?.path || '',
      panCardImage: files.panCardImage?.[0]?.path || '',
      tenthMarksheetImage: files.tenthMarksheetImage?.[0]?.path || '',
      twelthMarksheetImage: files.twelthMarksheetImage?.[0]?.path || '',
      postGraduateImage: files.postGraduateImage?.[0]?.path || '',
      graduateImage: files.graduateImage?.[0]?.path || '',
      bankCheque: files.bankCheque?.[0]?.path || '',
      technicalCertification: files.technicalCertification?.[0]?.path || '',
      academicCertification: files.academicCertification?.[0]?.path || ''
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const MSMEForm = async (req, res) => {
  try {
    const { name, email, message, subject, phone } = req.body;
    const filePath = req.file?.path || '';

    const application = new MsmeApplication({
      name,
      email,
      message,
      subject,
      phone,
      file: filePath
    });

    await application.save();

    res.status(201).json({ message: 'MSME Application submitted successfully.' });
  } catch (error) {
    console.error('❌ Error submitting MSME application:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


export const UserRegister = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const image = req.file?.path || '';

    const existingUser = await Users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(200).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      image,
    });

    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message, });
  }
};


export const SendOTP = async (req, res) => {
  const { name, phone, referby } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required" });

  try {

    // Validation: referby should not equal phone
    if (referby && referby === phone) {
      return res.status(400).json({ message: "You cannot refer yourself" });
    }

    // If referby provided → check if exists
    if (referby) {
      const [refUser] = await req.db.query(
        "SELECT id FROM users WHERE mobile = ?",
        [referby]
      );
      if (!refUser.length) {
        return res.status(400).json({ message: "Refer number not existed" });
      }
    }




    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Check if user already exists
    const [rows] = await req.db.query(
      "SELECT id FROM users WHERE mobile = ?",
      [phone]
    );

    if (rows.length > 0) {
      // Update existing user's OTP
      await req.db.query(
        "UPDATE users SET otp = ? WHERE mobile = ?",
        [otp, phone]
      );
    } else {
      // Insert new user with mobile + OTP
      await req.db.query(
        "INSERT INTO users (mobile, otp , refer_by , name) VALUES (?, ?, ? ,?)",
        [phone, otp, referby, name]
      );
    }

    // Send OTP via NinzaSMS
    const response = await fetch("https://ninzasms.in.net/auth/send_sms", {
      method: "POST",
      headers: {
        "authorization": "NINZASMSe77e84feddca7b0fd97d515c8d5a97e48a3c7cefaa4dbec88399",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender_id: "15539",
        variables_values: otp.toString(),
        numbers: phone,
        // rout: "waninza" // for WhatsApp OTP
      })
    });

    const result = await response.json();
    console.log("SMS API Response:", result);

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const UserLogin = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: "Phone & OTP required" });

  try {
    // Check OTP in DB
    const [rows] = await req.db.query(
      "SELECT * FROM users WHERE mobile = ? AND otp = ?",
      [phone, otp]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid OTP" });
    }



    const user = rows[0];
    console.log(user, "userrrr")

    // Clear OTP after verification (optional but recommended)
    await req.db.query("UPDATE users SET otp = NULL WHERE mobile = ?", [phone]);

    // Generate JWT
    const token = jwt.sign(
      { id: user.ID, mobile: user.MOBILE },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.ID,
        mobile: user.MOBILE
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const UserShop = async (req, res) => {
  try {
    const {
      name,
      phone,
      address1,
      address2,
      address3,
      address4,
      city,
      pincode,
      productId
    } = req.body;

    console.log(req.user, "req user as tokenn")

    const aadharCardPath = req.files?.aadharCard?.[0]?.path || null;
    const passportPhotoPath = req.files?.passportPhoto?.[0]?.path || null;

    const newOrder = new UserBuy({
      name,
      phone,
      address1,
      address2,
      address3,
      address4,
      city,
      pincode,
      productId,
      aadharCardPath,
      passportPhotoPath,
    });

    await newOrder.save();

    res.status(200).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving user order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const GetAllGame2 = async (req, res) => {
  try {
    // Saare records fetch karna
    const [rows] = await req.db.query('SELECT * FROM games');

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};

export const GetAllGame = async (req, res) => {
  try {
    // Yahan order by me teen cheezein handle ho rahi hain:
    // 1. DISAWAR ko hamesha last me bhejne ke liye CASE
    // 2. Baaki games ko position ke ascending order me
    // 3. NULL position wale ko last me
    const [rows] = await req.db.query(`
      SELECT * FROM games
      ORDER BY 
        CASE WHEN NAME = 'DISAWAR' THEN 2 ELSE 1 END,   -- DISAWAR ko sabse last
        CASE WHEN POSITION IS NULL THEN 1 ELSE 0 END,   -- NULL ko end me
        POSITION ASC                                   -- Baaki ascending order
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};


export const deleteGame = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Game ID is required" });
  }

  try {
    // Pehle check kar lete hain ki game exist karta hai ya nahi
    const [rows] = await req.db.query("SELECT * FROM games WHERE ID = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Game delete karte hain
    await req.db.query("DELETE FROM games WHERE ID = ?", [id]);

    return res.status(200).json({ message: "Game deleted successfully" });
  } catch (err) {
    console.error("Error deleting game:", err);
    return res.status(500).json({ error: "Failed to delete game" });
  }
}


export const deleteUser = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required" });
    }

   
    // 1. Pehle user fetch karo
    const [userRows] = await req.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
    if (userRows.length === 0) {
    
      return res.status(404).json({ error: "User not found" });
    }

    const user = userRows[0];
    const userId = user.ID; // मान लिया users table ka primary key ID hai

    // 2. Dusre users ke REFER_BY ko NULL kar do jinke refer_by = deleted_user.mobile
    await req.db.query("UPDATE users SET REFER_BY = NULL WHERE REFER_BY = ?", [mobile]);

    // 3. Bets delete (phone se match karke)
    await req.db.query("DELETE FROM bets WHERE phone = ?", [mobile]);

    // 4. Bank delete (mobile se match karke)
    await req.db.query("DELETE FROM BANK WHERE mobile = ?", [mobile]);

    // 5. Commission delete (phone se match karke)
    await req.db.query("DELETE FROM commission WHERE phone = ?", [mobile]);

    // 6. Payment Queue delete (user_id se match karke)
    await req.db.query("DELETE FROM PAYMENT_QUEUE WHERE user_id = ?", [mobile]);

    // 7. Withdraw delete (mobile se match karke)
    await req.db.query("DELETE FROM WITHDRAW WHERE mobile = ?", [mobile]);

    // 8. Ab main user delete karo
    await req.db.query("DELETE FROM users WHERE mobile = ?", [mobile]);



    return res.status(200).json({ message: "User and all related data deleted successfully" });
  } catch (err) {
    console.error("Error deleting user and related data:", err);
    return res.status(500).json({ error: "Failed to delete user and related data" });
  }
};





// helpers/walletHelper.js
export const deductWalletBalance = async (db, phone, totalPoints, gameName ) => {
  try {
    // 1. User fetch karo
    const [users] = await db.query("SELECT wallet FROM users WHERE mobile = ?", [phone]);
    if (users.length === 0) {
      throw new Error("User not found");
    }

    const walletBalance = users[0].wallet;

    // 2. Check balance
    if (walletBalance < totalPoints) {
      throw new Error("Insufficient balance");
    }

    // 3. Update wallet
    const newBalance = walletBalance - totalPoints;
    await db.query("UPDATE users SET wallet = ? WHERE mobile = ?", [newBalance, phone]);

    await insertAccountEntry(db, {
      mobile:phone,
      paymode: gameName,       // game ka naam jayega paymode me
      point: totalPoints,      // total bet points
      closing: newBalance,     // deduct hone ke baad wallet balance
      status: "Success",       // bet successfully placed
    });

    return { success: true, newBalance };
  } catch (err) {
    console.log("Error deducting wallet balance:", err);
    throw err;
  }
};

// helpers/gameHelper.js
export const getGameNameById = async (db, gameId) => {
  const [rows] = await db.query(
    "SELECT name FROM games WHERE id = ?",
    [gameId]
  );

  if (rows.length === 0) {
    throw new Error("Game not found");
  }

  return rows[0].name;
};

// helpers/gameHelper.js
export const getGamePlayById = async (db, gameId) => {
  const [rows] = await db.query(
    "SELECT PLAY FROM games WHERE id = ?",
    [gameId]
  );

  if (rows.length === 0) {
    throw new Error("Game not found");
  }

  return rows[0].PLAY;
};




export const BetGameJodi = async (req, res) => {
  console.log(req.user, "autth se middle wale")
  const mobile = req.user.mobile
  console.log(mobile, "user ka number")
  try {
    const { filledBets, gameId, totalPoints } = req.body;
    console.log("Request body jodi:", req.body);

    if (!filledBets || filledBets.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }

    const gameName = await getGameNameById(req.db, gameId);
    const gamePlay = await getGamePlayById(req.db , gameId)
     // ✅ Agar "unchecked" hai toh timeout error dena
     if (gamePlay.toLowerCase() === "unchecked") {
      return res.status(400).json({ success: false, message: "Game play timed out." });
    }

    try {
      await deductWalletBalance(req.db, mobile, totalPoints , gameName);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }


    // Transform data for bulk insert
    const result = filledBets.map(bet => [
      bet.number,           // number column
      Number(bet.value),    // point column
      gameId,               // game_id column
      "Jodi",
      mobile,
      gameName               // type column
    ]);

    console.log("Transformed result for insert:", result);

    // Bulk insert into 'bets' table
    const query = `INSERT INTO bets (number, point, game_id, type, phone , game) VALUES ?`;
    const [insertResult] = await req.db.query(query, [result]);
    console.log("Insert result:", insertResult);

    res.status(200).json({ success: true, insertedRows: insertResult.affectedRows });

  } catch (err) {
    console.error('Error saving jodi bets:', err);
    res.status(500).json({ error: 'Failed to save jodi bets' });
  }
};


export const BetGameManual = async (req, res) => {

  try {
    const rows = req.body.dataToSend;
    const gameID = req.body.gameId
    console.log("Request body:", req.body);
    const mobile = req.user.mobile

    const gameName = await getGameNameById(req.db, gameID);

    const gamePlay = await getGamePlayById(req.db , gameID)
     // ✅ Agar "unchecked" hai toh timeout error dena
     if (gamePlay.toLowerCase() === "unchecked") {
      return res.status(400).json({ success: false, message: "Game play timed out." });
    }

    try {
      await deductWalletBalance(req.db, mobile, req.body.totalPoints , gameName);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    // Transform rows
    const result = [];

    rows.forEach(row => {
      const { rowId, jodiValues, point } = row;

      jodiValues.forEach(value => {
        // if (value) { // Only process non-empty values
        //   result.push({
        //     number: value,
        //     points: Number(point), // Convert to number if needed
        //     rowId: rowId
        //   });
        // }
        if (value) { // Only process non-empty values
          result.push([value, Number(point), gameID, "Manual", mobile, gameName]); // Prepare as array for bulk insert
        }
      });
    });

    console.log("Transformed result:", result);



    if (result.length > 0) {
      // Bulk insert into 'bets' table
      const query = `INSERT INTO bets (number, point , game_id , type, phone,game) VALUES ?`;
      const [insertResult] = await req.db.query(query, [result]); // mysql2 accepts array of arrays
      console.log("Insert result:", insertResult);

      res.status(200).json({ success: true, insertedRows: insertResult.affectedRows });
    } else {
      res.status(200).json({ success: false, message: "No valid numbers to insert." });
    }


  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};


export const BetGameHarraf = async (req, res) => {
  const mobile = req.user.mobile
  try {
    const { andarHaraf, baharHaraf, gameId, totalPoints } = req.body;
    console.log("Request body harraf:", req.body);

    const gameName = await getGameNameById(req.db, gameId);
    const gamePlay = await getGamePlayById(req.db , gameId)
     // ✅ Agar "unchecked" hai toh timeout error dena
     if (gamePlay.toLowerCase() === "unchecked") {
      return res.status(400).json({ success: false, message: "Game play timed out." });
    }

    try {
      await deductWalletBalance(req.db, mobile, totalPoints , gameName);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const result = [];

    // AndarHaraf bets
    if (andarHaraf && andarHaraf.length > 0) {
      andarHaraf.forEach(bet => {
        result.push([
          bet.number,          // number column
          Number(bet.points),  // point column
          gameId,              // game_id column
          "AndarHaraf",
          mobile,
          gameName    // type column
        ]);
      });
    }

    // BaharHaraf bets
    if (baharHaraf && baharHaraf.length > 0) {
      baharHaraf.forEach(bet => {
        result.push([
          bet.number,          // number column
          Number(bet.points),  // point column
          gameId,              // game_id column
          "BaharHaraf",
          mobile,
          gameName       // type column
        ]);
      });
    }

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }

    console.log("Transformed result:", result);

    // Bulk insert
    const query = `INSERT INTO bets (number, point, game_id, type,phone,game) VALUES ?`;
    const [insertResult] = await req.db.query(query, [result]);

    console.log("Insert result:", insertResult);

    res.status(200).json({ success: true, insertedRows: insertResult.affectedRows });

  } catch (err) {
    console.error('Error saving harraf bets:', err);
    res.status(500).json({ error: 'Failed to save harraf bets' });
  }
};


export const BetGameCrossing = async (req, res) => {
  const mobile = req.user.mobile
  try {
    const { bets, gameId, totalPoints } = req.body;
    console.log("Request body crossing:", req.body);

    if (!bets || bets.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }


    const gameName = await getGameNameById(req.db, gameId);
    const gamePlay = await getGamePlayById(req.db , gameId)
     // ✅ Agar "unchecked" hai toh timeout error dena
     if (gamePlay.toLowerCase() === "unchecked") {
      return res.status(400).json({ success: false, message: "Game play timed out." });
    }

    try {
      await deductWalletBalance(req.db, mobile, totalPoints ,gameName);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }


    // Transform data for bulk insert
    const result = bets.map(bet => [
      bet.number,          // number column
      Number(bet.points),  // point column
      gameId,              // game_id column
      "Crossing",           // type column
      mobile,
      gameName
    ]);

    console.log("Transformed result:", result);

    // Bulk insert into 'bets' table
    const query = `INSERT INTO bets (number, point, game_id, type , phone,game) VALUES ?`;
    const [insertResult] = await req.db.query(query, [result]);
    console.log("Insert result:", insertResult);

    res.status(200).json({ success: true, insertedRows: insertResult.affectedRows });

  } catch (err) {
    console.error('Error saving crossing bets:', err);
    res.status(500).json({ error: 'Failed to save crossing bets' });
  }
};


export const BetGameCopyPaste = async (req, res) => {
  const mobile = req.user.mobile
  try {
    const { bets, gameId, totalPoints } = req.body;
    console.log("Request body copy-paste:", req.body);

    if (!bets || bets.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }

    const gameName = await getGameNameById(req.db, gameId);
    const gamePlay = await getGamePlayById(req.db , gameId)
     // ✅ Agar "unchecked" hai toh timeout error dena
     if (gamePlay.toLowerCase() === "unchecked") {
      return res.status(400).json({ success: false, message: "Game play timed out." });
    }

    try {
      await deductWalletBalance(req.db, mobile, totalPoints , gameName);
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    // Transform data for bulk insert
    const result = bets.map(bet => [
      bet.number,           // number column
      Number(bet.points),   // point column
      // bet.paltiType,        // palti_type column
      gameId,               // game_id column
      "CopyPaste",         // type column
      mobile,
      gameName
    ]);

    console.log("Transformed result:", result);

    // Bulk insert into 'bets' table
    const query = `INSERT INTO bets (number, point , game_id, type , phone ,game) VALUES ?`;
    const [insertResult] = await req.db.query(query, [result]);
    console.log("Insert result:", insertResult);

    res.status(200).json({ success: true, insertedRows: insertResult.affectedRows });

  } catch (err) {
    console.error('Error saving copy-paste bets:', err);
    res.status(500).json({ error: 'Failed to save copy-paste bets' });
  }
};


//update win_amount in bets and user of WIN bets 
export const ProcessWinningBets = async (req, updatedBets) => {
  console.log("Processing winning bets:", updatedBets);
  try {
    if (!updatedBets.length) {
      console.log("⚠️ No winning bets to process");
      return;
    }

    // Group wins by user
    let userWins = {};

    for (const bet of updatedBets) {
      // 1. Fetch game rate
      const [gameRows] = await req.db.query("SELECT RATE FROM games WHERE ID = ?", [bet.GAME_ID]);
      if (!gameRows.length) continue;

      const rate = parseFloat(gameRows[0].RATE) || 1.5;
     // 2. Calculate win amount (special case for AndarHaraf & BaharHaraf)
     let winAmount = 0;
     if (bet.TYPE === "AndarHaraf" || bet.TYPE === "BaharHaraf") {
       winAmount = (rate / 10) * bet.POINT;
     } else {
       winAmount = rate * bet.POINT;
     }

      // 2. Update bet with WIN_AMOUNT
      await req.db.query(
        "UPDATE bets SET WIN_AMOUNT = ? WHERE ID = ?",
        [winAmount, bet.ID]
      );

      // 3. Collect user’s total win
      if (!userWins[bet.PHONE]) {
        userWins[bet.PHONE] = { total: 0, game: bet.GAME };;
      }
      userWins[bet.PHONE].total += winAmount;
    }

    console.log(userWins, "user wins collected");

    // 4. Update each user wallet
    for (const mobile in userWins) {
      const { total: winTotal, game } = userWins[mobile];
      // fetch wallet
      const [users] = await req.db.query("SELECT wallet FROM users WHERE mobile = ?", [mobile]);
      if (!users.length) continue;

      let wallet = parseFloat(users[0].wallet);
      if (isNaN(wallet)) wallet = 0;

      const newWallet = wallet + winTotal;

      await req.db.query("UPDATE users SET wallet = ? WHERE mobile = ?", [newWallet, mobile]);

      // update account entry for win amount
       // 🔥 insert into account table
       await insertAccountEntry(req.db, {
        mobile,
        paymode: game,       // bet.GAME se
        point: winTotal.toFixed(2),     // user ka total winning
        closing: newWallet,  // latest wallet balance
        status: "Win"
      });
     

      console.log(`✅ Wallet updated: ${mobile} +${winTotal} → ${newWallet}`);
    }

  } catch (err) {
    console.error("Error processing winning bets:", err);
  }
};

// helper function
const formatDateTime = (isoString) => {
  const d = new Date(isoString);
  const pad = (n) => (n < 10 ? "0" + n : n);

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
};


export const ProcessLossBets = async (req, LossBets) => {
  console.log(LossBets ,"Loss betsfor calicua winnig numerb")
  try {
    if (!LossBets.length) {
      console.log("⚠️ No loss bets to process");
      return;
    }

    for (const bet of LossBets) {
      // 1. Update bet WIN_AMOUNT = 0
      await req.db.query(
        "UPDATE bets SET WIN_AMOUNT = ? WHERE ID = ?",
        [0, bet.ID]
      );

      // 2. Get user info
      const [users] = await req.db.query("SELECT REFER_BY FROM users WHERE mobile = ?", [bet.PHONE]);
      if (!users.length) continue;

      const referBy = users[0].REFER_BY;
      if (!referBy) {
        console.log(`ℹ️ Bet ${bet.ID} user ${bet.PHONE} has no refer_by`);
        continue;
      }

      // 3. Calculate 5% commission
      const commission = (parseFloat(bet.POINT) * 5) / 100;

       // 4. Format DATE_TIME properly
       const formattedDateTime = formatDateTime(bet.DATE_TIME);

      // 4. Insert entry in commission table (wallet update nahi karna)
      const insertQuery = `
        INSERT INTO commission 
        (betId, betuser, DATE_TIME, phone, point, GAME_ID, GAME, Pay, STATUS, earn)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await req.db.query(insertQuery, [
        bet.ID,            // betId
        bet.PHONE,         // betuser
        formattedDateTime,     // DATE_TIME
        referBy,              // phone (refer_by user)
        bet.POINT,            // point
        bet.GAME_ID,           // GAME_ID
        bet.TYPE,             // GAME
        "pending",            // Pay
        bet.STATUS,           // STATUS
        commission            // earn
      ]);

      console.log(`✅ Commission entry created for referBy ${referBy} from bet ${bet.ID}`);
    }
  } catch (err) {
    console.error("Error processing loss bets:", err);
  }
};

//update reversere win_amount in bets and user of WIN bets 
export const ReverseWinningBets = async (req, updatedBets) => {
  console.log("Reverse winning bets:", updatedBets);
  try {
    if (!updatedBets.length) {
      console.log("⚠️ No winning bets to process");
      return;
    }

    // Group wins by user
    let userWins = {};

    for (const bet of updatedBets) {
      // 1. Fetch game rate
      const [gameRows] = await req.db.query("SELECT RATE FROM games WHERE ID = ?", [bet.GAME_ID]);
      if (!gameRows.length) continue;

      const rate = parseFloat(gameRows[0].RATE) || 1.5;
     // 2. Calculate win amount (special case for AndarHaraf & BaharHaraf)
     let winAmount = 0;
     if (bet.TYPE === "AndarHaraf" || bet.TYPE === "BaharHaraf") {
       winAmount = (rate / 10) * bet.POINT;
     } else {
       winAmount = rate * bet.POINT;
     }

     

      // 3. Collect user’s total reversal (store game too)
      if (!userWins[bet.PHONE]) {
        userWins[bet.PHONE] = { total: 0, game: bet.GAME };
      }
      userWins[bet.PHONE].total += winAmount;

       // ✅ Reset WIN_AMOUNT in bets table to 0 (since we are reversing)
       await req.db.query("UPDATE bets SET WIN_AMOUNT = 0 WHERE ID = ?", [bet.ID]);
    }

    // 4. Update each user wallet
    for (const mobile in userWins) {
      const { total: winTotal, game } = userWins[mobile];

      // fetch wallet
      const [users] = await req.db.query("SELECT wallet FROM users WHERE mobile = ?", [mobile]);
      if (!users.length) continue;

      let wallet = parseFloat(users[0].wallet);
      if (isNaN(wallet)) wallet = 0;

         // ensure wallet never goes below 0
      let newWallet = wallet - winTotal;
      if (newWallet < 0) newWallet = 0;

      await req.db.query("UPDATE users SET wallet = ? WHERE mobile = ?", [newWallet, mobile]);

      // update account entry for reversed win amount
      // 🔥 insert into account table for reversal
       await insertAccountEntry(req.db, {
        mobile,
        paymode: game,             // bet.GAME se game ka naam
        point: winTotal.toFixed(2),// reversed amount
        closing: newWallet,        // updated balance
        status: "Loss"             // reversal entry
      });

      console.log(`✅ Wallet updated: ${mobile} +${winTotal} → ${newWallet}`);
    }

  } catch (err) {
    console.error("Error processing winning bets:", err);
  }
};


// ✅ Change status from WIN → LOSS
export const StatustoLossBets = async (req, updatedBets) => {
  console.log("Changing WIN bets to LOSS:", updatedBets);
  try {
    if (!updatedBets.length) {
      console.log("⚠️ No bets to update");
      return;
    }

    for (const bet of updatedBets) {
      await req.db.query(
        "UPDATE bets SET STATUS = 'Loss' WHERE ID = ? AND STATUS = 'Win'",
        [bet.ID]
      );
      console.log(`🔄 Bet ${bet.ID} → WIN → LOSS`);
    }
  } catch (err) {
    console.error("❌ Error changing bets to LOSS:", err);
  }
};

// ✅ Change status from LOSS → WIN
export const StatustoWinBets = async (req, updatedBets) => {
  console.log("Changing LOSS bets to WIN:", updatedBets);
  try {
    if (!updatedBets.length) {
      console.log("⚠️ No bets to update");
      return;
    }

    for (const bet of updatedBets) {
      await req.db.query(
        "UPDATE bets SET STATUS = 'Win' WHERE ID = ? AND STATUS = 'Loss'",
        [bet.ID]
      );
      console.log(`🔄 Bet ${bet.ID} → LOSS → WIN`);
    }
  } catch (err) {
    console.error("❌ Error changing bets to WIN:", err);
  }
};


// ye hai admin jo winniing number se update krega data users ki bets ko 
export const AdminUpdateBetsStatus = async (req, res) => {
  try {
    const { type, finalBets } = req.body;
    console.log("Request body for updating bets:", req.body);

    if (!finalBets || !finalBets.length) {
      return res.status(400).json({ success: false, message: "No bets provided" });
    }

    console.log("📩 Received bets update:", type, finalBets);

    if (type === "paid") {
         // ✅ Separate WIN and LOSS bets
      const winBets = finalBets.filter(bet => bet.STATUS === "Win");
      const lossBets = finalBets.filter(bet => bet.STATUS === "Loss");
     
      if (winBets.length) {
        await ProcessWinningBets(req, winBets);
      }
      if (lossBets.length) {
        await ProcessLossBets(req, lossBets);
      }
    } else if (type === "unpaid") {
      await ReverseWinningBets(req, finalBets);
      console.log("⏸ Unpaid logic hold");
    } else if (type === "lost") {
      await StatustoLossBets(req, finalBets);
    } else if (type === "unLost") {
      await StatustoWinBets(req, finalBets);
    }

    return res.status(200).json({
      success: true,
      message: `Bets updated successfully for type: ${type}`
    });
  } catch (err) {
    console.error("❌ Error updating bets:", err);
    return res.status(500).json({ success: false, message: "Failed to update bets" });
  }
};





export const UpdateBetsWithResults = async (req, resultRow) => {
  try {
    const { GAME_ID, RESULT1, RESULT2, Jodi, Manual, andarHaraf, baharHaraf, Crossing, CopyPaste, DATE } = resultRow;

    console.log(resultRow, "resutl Row")

    // Fetch bets of that gameId & same date
    const betsQuery = `
      SELECT * FROM bets 
      WHERE GAME_ID = ? 
      AND DATE(DATE_TIME) = DATE(?)
    `;
    const [bets] = await req.db.query(betsQuery, [GAME_ID, DATE]);
    console.log(bets, "betss ki non result ")

    if (!bets.length) {
      console.log("No bets found for this game and date.");
      return;
    }

    let updatedBets = [];
    let LossBets = [];

    // Loop all bets & update status
    for (const bet of bets) {
      let expectedResult = null;
      let status = "Loss";

      switch (bet.TYPE) {
        case "Jodi":
          expectedResult = Jodi;
          status = bet.number == Jodi ? "Win" : "Loss";
          break;

        case "Manual":
          expectedResult = Manual; // ex: "56"
          status = bet.number == Manual ? "Win" : "Loss";
          break;

        case "AndarHaraf": {
          // andar = pehla digit (e.g. "5")
          const andarValue = andarHaraf.toString(); // "5"

          // bet.number = e.g. "444" → take first digit
          const betDigit = bet.number[0];

          expectedResult = andarValue; // "5"
          status = betDigit == andarValue ? "Win" : "Loss";
          break;
        }

        case "BaharHaraf": {
          // bahar = last digit (e.g. "6")
          const baharValue = baharHaraf.toString(); // "6"

          const betDigit = bet.number[0]; // e.g. "777" → "7"

          expectedResult = baharValue; // "6"
          status = betDigit == baharValue ? "Win" : "Loss";
          break;
        }

        case "Crossing":
          expectedResult = Crossing; // ex: "56"
          status = bet.number == Crossing ? "Win" : "Loss";
          break;

        case "CopyPaste":
          expectedResult = CopyPaste; // ex: "56"
          status = bet.number == CopyPaste ? "Win" : "Loss";
          break;
      }

      // Update bet row
      const updateQuery = `
        UPDATE bets 
        SET RESULT = ?, STATUS = ? 
        WHERE ID = ?
      `;
      await req.db.query(updateQuery, [expectedResult, status, bet.ID]);

      if (status === "Win") {
        updatedBets.push({
          gameId: GAME_ID,
          betId: bet.ID,
          type: bet.TYPE,
          number: bet.number,
          point: bet.point,
          user: bet.phone,
          expectedResult,
          status
        });
      }

      // isme bhi dekhna hoga ki LossBets me kya kya bhejna hai with kya kya vale name hai 
      if (status === "Loss") {
        LossBets.push({
          gameId: GAME_ID,
          DATE_TIME: bet.DATE_TIME,
          betId: bet.ID,
          type: bet.TYPE,
          number: bet.number,
          point: bet.point,
          user: bet.phone,
          expectedResult,
          status
        });
      }

    }

    console.log(updatedBets, "✅ Updated Bets:");
    console.log(LossBets, "✅ Updated Loss Bets:");


    // Process only win bets for wallet update
    // await ProcessWinningBets(req, updatedBets);

    // await ProcessLossBets(req, LossBets);




  } catch (err) {
    console.error("Error updating bets:", err);
  }
};


export const CalculateGameResults = async (req, res) => {
  console.log(req.body, "chcck")
  try {
    const { openResult, closeResult, gameId, game_name , resultDate } = req.body;
    console.log(req.body, "reqbody")

    if (!resultDate) {
      resultDate = new Date().toISOString().split("T")[0];
    }

    // ✅ Ek hi result declare hota hai
    const result = openResult.toString();

    // ---- JODI ----
    const jodiNumber = result;  // same as result

    // ---- MANUAL ----
    const manualWinningNumbers = result; // same as result

    // ---- HARRAF ----
    const harraf = {
      andarHaraf: result[0],  // first digit
      baharHaraf: result.slice(-1) // last digit
    };

    // ---- CROSSING ----
    const crossingNumbers = result; // same as result

    // ---- COPY-PASTE ----
    const copyPasteResult = result; // same as result


    // ✅ Pehle check karo same GAME_ID + DATE entry exist karti hai ya nahi
    const [existingRows] = await req.db.query(
      `SELECT * FROM RESULT 
       WHERE GAME_ID = ? AND DATE(DATE) = ?`,
      [gameId, resultDate]
    );



    if (existingRows.length > 0) {
      // 🔄 UPDATE karo agar already entry hai
      const updateQuery = `
        UPDATE RESULT 
        SET GAME_NAME = ?, RESULT1 = ?, RESULT2 = ?, 
            Jodi = ?, Manual = ?, andarHaraf = ?, baharHaraf = ?, 
            Crossing = ?, CopyPaste = ?
        WHERE GAME_ID = ? AND DATE(DATE) = ?
      `;

      await req.db.query(updateQuery, [
        game_name,
        result,
        result,
        jodiNumber,
        manualWinningNumbers,
        harraf.andarHaraf,
        harraf.baharHaraf,
        crossingNumbers,
        copyPasteResult,
        gameId,
        resultDate,
      ]);

    } else {
      // 🆕 Agar entry nahi hai toh INSERT karo
      const insertQuery = `
        INSERT INTO RESULT 
        (GAME_ID, GAME_NAME, RESULT1, RESULT2, Jodi, Manual, andarHaraf, baharHaraf, Crossing, CopyPaste, DATE)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await req.db.query(insertQuery, [
        gameId,
        game_name,
        result,
        result,
        jodiNumber,
        manualWinningNumbers,
        harraf.andarHaraf,
        harraf.baharHaraf,
        crossingNumbers,
        copyPasteResult,
        resultDate,
      ]);
    }

    // ✅ Ab naya/latest result nikal lo
    const [insertedRows] = await req.db.query(
      "SELECT * FROM RESULT WHERE GAME_ID = ? AND DATE(DATE) = ? LIMIT 1",
      [gameId, resultDate]
    );

    if (insertedRows.length) {
      await UpdateBetsWithResults(req, insertedRows[0]);
    }


    // ---- Update games table ----
    // Sirf aaj ki date ke liye update karo
    const today = new Date().toISOString().split("T")[0];
    if (resultDate === today) {
    const updateGameQuery = `
     UPDATE games 
     SET RESULT1 = ?, RESULT2 = ? , PLAY = 'unchecked'
     WHERE ID = ?
   `;

    await req.db.query(updateGameQuery, [openResult, openResult, gameId]);

  }

    const resultObj = {
      Jodi: jodiNumber,
      Manual: manualWinningNumbers,
      Harraf: harraf,
      Crossing: crossingNumbers,
      CopyPaste: copyPasteResult,
      date: resultDate
    };

    // console.log("Calculated Game Results:", resultObj);

    res.status(200).json({
      success: true,
      message: "Results calculated and saved successfully",
      results: resultObj
      
    });


  } catch (err) {
    console.error('Error calculating results:', err);
    res.status(500).json({ error: 'Failed to calculate results' });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const [rows] = await req.db.query(
      "SELECT mobile, wallet , name , refer_by FROM users WHERE mobile = ? LIMIT 1",
      [req.user.mobile]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getCommissions = async (req, res) => {
  try {
    const { date } = req.query;
    let query = "SELECT * FROM commission";
    let params = [];

    if (date) {
      // agar date diya gaya hai to filter lagao
      query += " WHERE DATE(DATE_TIME) = ?";
      params.push(date);
    }

    query += " ORDER BY id DESC";

    const [rows] = await req.db.query(query, params);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("Error fetching commission data:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


export const payCommission = async (req, res) => {
  try {
    // ✅ payList hamesha array bana lo (single object bhi ho toh)
    const entries = Array.isArray(req.body.payList)
      ? req.body.payList
      : [req.body.payList];

    console.log(entries, "entries to pay");

    for (const entry of entries) {
      const { ID, phone, earn } = entry;

      // 1️⃣ Commission entry check karo aur sirf pending ko hi allow karo
      const [commissionRows] = await req.db.query(
        "SELECT * FROM commission WHERE ID = ? AND pay = 'pending'",
        [ID]
      );
      if (commissionRows.length === 0) {
        console.log(`Commission ID ${ID} not found or already paid`);
        continue; // skip agar already success ho chuka hai
      }

      // 2️⃣ User wallet update (phone se)
      await req.db.query(
        "UPDATE users SET wallet = wallet + ? WHERE MOBILE = ?",
        [parseFloat(earn), phone]
      );

      // 🔥 account table entry bhi karo
      // fetch updated wallet balance
      const [users] = await req.db.query("SELECT wallet FROM users WHERE mobile = ?", [phone]);
      const closingBalance = users.length ? parseFloat(users[0].wallet) : 0;
      // 4️⃣ Account statement me entry banao
      await insertAccountEntry(req.db, {
        mobile: phone,         // jis user ka hai
        paymode: "Commission", // fixed "Commission"
        point: earn,           // commission amount
        closing: closingBalance, // updated wallet balance
        status: "Success",     // success mark karo
      });

      // 3️⃣ Commission entry update karo
      await req.db.query(
        "UPDATE commission SET pay = 'success' WHERE ID = ?",
        [ID]
      );
    }

    res.json({
      success: true,
      message: "Commission(s) paid successfully",
      count: entries.length,
    });
  } catch (err) {
    console.error("Error in payCommission:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to pay commission" });
  }
};




export const editProfileUser = async (req, res) => {
  try {
    const { name, mobile } = req.body; // new values
    const oldMobile = req.user.mobile; // comes from auth middleware

    if (!name || !mobile) {
      return res.status(400).json({ message: "Name and Mobile required" });
    }

    const sql = "UPDATE users SET name = ?, mobile = ? WHERE mobile = ?";
    const [result] = await req.db.query(sql, [name, mobile, oldMobile]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      name,
      mobile,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserBetHistory = async (req, res) => {
  try {
    const mobile = req.user.mobile; // from JWT middleware

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number missing" });
    }

    // SQL query to get bets by user's mobile
    const [bets] = await req.db.query(
      `SELECT id, number, point, type, game,game_id, DATE_FORMAT(CONVERT_TZ(date_time,'+00:00','+05:30'), '%Y-%m-%d %H:%i:%s') AS date_time, status,result,win_amount
       FROM bets
       WHERE phone = ?
       ORDER BY id DESC`,
      [mobile]
    );

    return res.json({
      message: "Bet history fetched successfully",
      bets
    });
  } catch (error) {
    console.error("Error fetching bet history:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const userAccountStatement = async (req, res) => {
  try {
    const mobile = req.user.mobile; // from JWT middleware

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number missing" });
    }

    // SQL query to get account statement by user's mobile
    const [accounts] = await req.db.query(
      `SELECT *
       FROM account
       WHERE MOBILE = ?
       ORDER BY id DESC`,
      [mobile]
    );

    return res.json({
      message: "Account statement fetched successfully",
      accounts
    });
  } catch (error) {
    console.error("Error fetching account history:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const AddMoney = async (req, res) => {
  try {
    let { amount } = req.body;
    const mobile = req.user?.mobile;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    amount = parseFloat(amount); // ensure number

    if (!mobile) {
      return res.status(401).json({ success: false, message: "Unauthorized: Mobile not found" });
    }

    // Find user by mobile
    const [users] = await req.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);
    if (!users.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = users[0];

    // Ensure wallet is a number
    let wallet = parseFloat(user.wallet);
    if (isNaN(wallet)) wallet = 0;

    const newWalletBalance = wallet + amount;

    // Update wallet
    await req.db.query("UPDATE users SET wallet = ? WHERE mobile = ?", [newWalletBalance, mobile]);

    return res.status(200).json({
      success: true,
      message: "Money added successfully",
      wallet: newWalletBalance
    });

  } catch (err) {
    console.error("Error in AddMoney:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const AddBankDetails = async (req, res) => {

  const mobile = req.user.mobile; // get user mobile
  const { bankname, holder, acnumber, ifsc, upi } = req.body;

  try {
    // Check if the user already has a bank entry
    const [existing] = await req.db.query(
      'SELECT * FROM BANK WHERE mobile = ?',
      [mobile]
    );

    if (existing.length > 0) {
      // Update existing entry
      await req.db.query(
        `UPDATE BANK 
         SET bankname = ?, holder = ?, acnumber = ?, ifsc = ?, upi = ?
         WHERE mobile = ?`,
        [bankname, holder, acnumber, ifsc, upi, mobile]
      );
      return res.json({ message: 'Bank details updated successfully' });
    } else {
      // Insert new entry
      await req.db.query(
        `INSERT INTO BANK (mobile, bankname, holder, acnumber, ifsc, upi) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [mobile, bankname, holder, acnumber, ifsc, upi]
      );
      return res.json({ message: 'Bank details added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}

export const GetBankDetails = async (req, res) => {
  const mobile = req.user.mobile; // get user mobile

  try {
    // Fetch bank details for the user
    const [rows] = await req.db.query(
      'SELECT * FROM BANK WHERE mobile = ?',
      [mobile]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No bank details found' });
    }

    return res.json(rows[0]); // Return the first row
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const UserDeposit = async (req, res) => {
  try {
    const { amount, utr_number, type, status } = req.body;
    const userId = req.user?.mobile;
    console.log(req.user)

    if (!userId || !amount || !type) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const sql = `
      INSERT INTO PAYMENT_QUEUE (USER_ID, AMOUNT, TXN_ID, MODE, STATUS)
      VALUES (?, ?, ?, ?,?)
    `;
    await req.db.query(sql, [userId, amount, utr_number, type, status]);

    return res.json({ success: true, message: "Deposit queued successfully ✅" });
  } catch (err) {
    console.error("Deposit API Error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }

};


export const getDepositList = async (req, res) => {
  try {
    let sql, params;

    if (req.user?.role === "admin") {
      // 🔹 Admin -> sabhi users ka data
      sql = `SELECT 
          ID,
          USER_ID,
          AMOUNT,
          DATE_FORMAT(CONVERT_TZ(TIME,'+00:00','+05:30'), '%Y-%m-%d %H:%i:%s') AS TIME,
          IMAGE,
          MODE,
          STATUS,
          TXN_ID
        FROM PAYMENT_QUEUE 
        ORDER BY ID DESC`;
      params = [];
    } else {
      // 🔹 Normal user -> sirf uska data
      const userId = req.user?.mobile;
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID missing" });
      }
      sql = `SELECT 
          ID,
          USER_ID,
          AMOUNT,
          DATE_FORMAT(CONVERT_TZ(TIME,'+00:00','+05:30'), '%Y-%m-%d %H:%i:%s') AS TIME,
          IMAGE,
          MODE,
          STATUS,
          TXN_ID
        FROM PAYMENT_QUEUE 
        WHERE USER_ID = ? 
        ORDER BY ID DESC`;
      params = [userId];
    }

    const [rows] = await req.db.query(sql, params);

    return res.json({
      success: true,
      message: "Deposit list fetched successfully ✅",
      data: rows,
    });
  } catch (err) {
    console.error("Get Deposit List API Error:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UserWithdraw = async (req, res) => {
  const { acnumber, amount, bankname, holder, ifsc, mobile, status, upi } = req.body;

  // if (!mobile || !amount || !holder || !bankname || !acnumber) {
  //   return res.status(400).json({ message: "Missing required fields" });
  // }

  try {
    // const timeNow = new Date();


     // 1️⃣ User fetch karo
     const [userRows] = await req.db.query(
      `SELECT WALLET FROM users WHERE MOBILE = ?`,
      [mobile]
    ); 

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const userWallet = parseFloat(userRows[0].WALLET);
    const withdrawAmount = parseFloat(amount);

    // 2️⃣ Balance check karo
    if (withdrawAmount > userWallet) {
      return res
        .status(400)
        .json({ message: "You don't have enough balance in wallet ❌" });
    }

    const query = `
      INSERT INTO WITHDRAW 
      (MOBILE, HOLDER, UPI, AMOUNT, STATUS, BANK, IFSC, ACCOUNT)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      mobile,
      holder,
      upi || null,
      amount,
      status || "pending",
      bankname,
      ifsc,
      acnumber,
    ];

    await req.db.query(query, values);

     // 4️⃣ Wallet balance update karo
     const updateWalletSql = `
     UPDATE users 
     SET WALLET = WALLET - ? 
     WHERE MOBILE = ?
   `;
   await req.db.query(updateWalletSql, [withdrawAmount, mobile]);

    // 5️⃣ Latest wallet fetch karo after deduction
    const [walletRows] = await req.db.query(
      "SELECT WALLET FROM users WHERE MOBILE = ?",
      [mobile]
    );
    const latestWallet = walletRows[0]?.WALLET || 0;

    // 6️⃣ Account table entry insert karo
    await insertAccountEntry(req.db, {
      mobile,
      paymode: "Withdraw",
      point: withdrawAmount,
      closing: latestWallet,
      status: "Success",
    });


    res.status(200).json({ message: "Withdraw request stored successfully" });
  } catch (error) {
    console.error("Withdraw insert error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getWithdrawList = async (req, res) => {
  try {
    let sql, params;

    if (req.user?.role === "admin") {
      // 🔹 Admin -> sabhi users ke withdraws
      sql = `SELECT 
          ID,
          MOBILE,
          HOLDER,
          UPI,
          AMOUNT,
          DATE_FORMAT(CONVERT_TZ(TIME,'+00:00','+05:30'), '%Y-%m-%d %H:%i:%s') AS TIME,
          STATUS,
          BANK,
          IFSC,
          ACCOUNT
        FROM WITHDRAW
        ORDER BY ID DESC`;
      params = [];
    } else {
      // 🔹 Normal user -> sirf apne withdraws
      const userMobile = req.user?.mobile;
      if (!userMobile) {
        return res.status(400).json({
          success: false,
          message: "User mobile missing",
        });
      }

      sql = `SELECT 
          ID,
          MOBILE,
          HOLDER,
          UPI,
          AMOUNT,
          DATE_FORMAT(CONVERT_TZ(TIME,'+00:00','+05:30'), '%Y-%m-%d %H:%i:%s') AS TIME,
          STATUS,
          BANK,
          IFSC,
          ACCOUNT
        FROM WITHDRAW
        WHERE MOBILE = ?
        ORDER BY ID DESC`;
      params = [userMobile];
    }

    const [rows] = await req.db.query(sql, params);

    return res.json({
      success: true,
      message: "Withdraw list fetched successfully ✅",
      data: rows,
    });
  } catch (err) {
    console.error("Get Withdraw List API Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


export const GetReferredUsers = async (req, res) => {
  try {
    const mobile = req.user.mobile;

    if (!mobile) {
      return res.status(400).json({ success: false, message: "Mobile number required" });
    }

    // 1. Fetch users referred by this mobile
    const [users] = await req.db.query(
      "SELECT id, mobile, refer_by, wallet FROM users WHERE refer_by = ?",
      [mobile]
    );

    if (!users.length) {
      return res.status(200).json({
        success: true,
        message: "No referred users found",
        data: []
      });
    }

    let finalResult = [];

    // 2. Loop users to fetch their Loss bets
    for (const user of users) {
      const [bets] = await req.db.query(
        `SELECT 
           ID, DATE_TIME, phone, STATUS, GAME, GAME_ID, POINT, TYPE 
         FROM bets 
         WHERE phone = ? AND STATUS = 'Loss'`,
        [user.mobile]
      );

      // 3. Add earning field (5% of point)
      const lossBets = bets.map(bet => ({
        ...bet,
        earning: parseFloat((bet.POINT * 0.05).toFixed(2)) // keep numeric with 2 decimals
      }));

      // 4. Calculate total earning of this user
      const totalEarn = lossBets.reduce((sum, bet) => sum + bet.earning, 0);


      finalResult.push({
        mobile: user.mobile,
        wallet: user.wallet,
        totalEarn: parseFloat(totalEarn.toFixed(2)),
        lossBets
      });
    }

    // console.log("Referred Users with Loss Bets:", finalResult);

    return res.status(200).json({
      success: true,
      message: "Referred users with loss bets fetched successfully",
      data: finalResult
    });

  } catch (err) {
    console.error("Error fetching referred users with bets:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const GetAllReferredUsersAdmin = async (req, res) => {
  try {
    // 1. Fetch all users who have been referred (refer_by not null/empty)
    const { date } = req.query;

    const [users] = await req.db.query(
      "SELECT id, mobile, name, refer_by, wallet FROM users WHERE refer_by IS NOT NULL AND refer_by <> ''"
    );


    if (!users.length) {
      return res.status(200).json({
        success: true,
        message: "No referred users found",
        data: []
      });
    }

    // Group by refer_by
    let groupedResult = {};

    for (const user of users) {

      let betQuery = `
        SELECT ID, DATE_TIME, phone, STATUS, GAME, GAME_ID, POINT, TYPE 
        FROM bets 
        WHERE phone = ? AND STATUS = 'Loss'
      `;
      let params = [user.mobile];

      // 👇 agar date aayi hai to filter lagao
      if (date) {
        betQuery += " AND DATE(DATE_TIME) = ?";
        params.push(date);
      }

      const [bets] = await req.db.query(betQuery, params);

      // Add earning field (5% of point)
      const lossBets = bets.map(bet => ({
        ...bet,
        earning: parseFloat((bet.POINT * 0.05).toFixed(2))
      }));

      // Total earning of this user
      const totalEarn = lossBets.reduce((sum, bet) => sum + bet.earning, 0);

      // Prepare user object
      const userObj = {
        mobile: user.mobile,
        name: user.name,
        wallet: user.wallet,
        totalEarn: parseFloat(totalEarn.toFixed(2)),
        lossBets
      };

      // Group into refer_by
      if (!groupedResult[user.refer_by]) {
        groupedResult[user.refer_by] = {
          referBy: user.refer_by,
          name: user.name,
          users: [],
          totalEarn: 0
        };
      }

      groupedResult[user.refer_by].users.push(userObj);
      groupedResult[user.refer_by].totalEarn += totalEarn;
    }

    // Convert object to array
    const finalResult = Object.values(groupedResult).map(group => ({
      ...group,
      totalEarn: parseFloat(group.totalEarn.toFixed(2))
    }));

    // console.log("Admin Referral Data:", finalResult);

    return res.status(200).json({
      success: true,
      message: "All referred users with loss bets fetched successfully",
      data: finalResult
    });

  } catch (err) {
    console.error("Error fetching admin referral data:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resultHistory = async (req, res) => {
  try {
    // Query to fetch all game results
    const [rows] = await req.db.query(
      `SELECT 
          GAME_ID ,
          GAME_NAME ,
          RESULT1 ,
          RESULT2,
          DATE 
       FROM RESULT
       ORDER BY DATE DESC`
    );

    return res.json({
      success: true,
      message: "Result history fetched ✅",
      data: rows,
    });
  } catch (err) {
    console.error("Result History Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ❌",
    });
  }
};
