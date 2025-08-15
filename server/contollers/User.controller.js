import MsmeApplication from "../models/MsmeApplication.js";
import Users from "../models/User.js";
import UserApplication from "../models/UserApplication.js";
import UserBuy from "../models/UserBuyModel.js";
import bcrypt from "bcrypt"; // ✅ CORRECT spelling
import jwt from "jsonwebtoken"

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
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required" });

  try {
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
      "INSERT INTO users (mobile, otp) VALUES (?, ?)",
      [phone, otp]
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
        rout: "waninza" // for WhatsApp OTP
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
  const { emailOrPhone, otp } = req.body;
  if (!emailOrPhone || !otp) return res.status(400).json({ message: "Phone & OTP required" });

  try {
    // Check OTP in DB
    const [rows] = await req.db.query(
      "SELECT * FROM users WHERE mobile = ? AND otp = ?",
      [emailOrPhone, otp]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

  

    const user = rows[0];
    console.log(user,"userrrr")

    // Clear OTP after verification (optional but recommended)
    await req.db.query("UPDATE users SET otp = NULL WHERE mobile = ?", [emailOrPhone]);

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


export const GetAllGame = async (req, res) => {
  try {
    // Saare records fetch karna
    const [rows] = await req.db.query('SELECT * FROM GAMES');

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
};




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


export const BetGameJodi = async (req, res) => {
  console.log(req.user,"autth se middle wale")
  const mobile = req.user.mobile
  console.log(mobile,"user ka number")
  try {
    const { filledBets, gameId } = req.body;
    console.log("Request body jodi:", req.body);

    if (!filledBets || filledBets.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }


    const gameName = await getGameNameById(req.db, gameId);


    // Transform data for bulk insert
    const result = filledBets.map(bet => [
      bet.number,           // number column
      Number(bet.value),    // point column
      gameId,               // game_id column
      "Jodi",
      mobile ,
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
          result.push([value, Number(point), gameID, "Manual", mobile,gameName]); // Prepare as array for bulk insert
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
    const { andarHaraf, baharHaraf, gameId } = req.body;
    console.log("Request body harraf:", req.body);
    
    const gameName = await getGameNameById(req.db, gameId);

    const result = [];

    // AndarHaraf bets
    if (andarHaraf && andarHaraf.length > 0) {
      andarHaraf.forEach(bet => {
        result.push([
          bet.number,          // number column
          Number(bet.points),  // point column
          gameId,              // game_id column
          "AndarHaraf"   ,
          mobile  ,
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
          mobile  ,
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
    const { bets, gameId } = req.body;
    console.log("Request body crossing:", req.body);

    if (!bets || bets.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }


    const gameName = await getGameNameById(req.db, gameId);
    

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
    const { bets, gameId } = req.body;
    console.log("Request body copy-paste:", req.body);

    if (!bets || bets.length === 0) {
      return res.status(400).json({ success: false, message: "No bets provided." });
    }

    const gameName = await getGameNameById(req.db, gameId);

    // Transform data for bulk insert
    const result = bets.map(bet => [
      bet.number,           // number column
      Number(bet.points),   // point column
      // bet.paltiType,        // palti_type column
      gameId,               // game_id column
      "CopyPaste" ,         // type column
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



export const CalculateGameResults = async (req, res) => {
  try {
    const { openResult, closeResult, gameId  } = req.body;
    console.log(req.body, "reqbody")

    console.log("Declared Result:", openResult, closeResult);

    const sumDigits = (num) => {
      return num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    };

    // ---- JODI ----
    const jodiFirst = sumDigits(openResult) % 10;
    const jodiSecond = sumDigits(closeResult) % 10;
    const jodiNumber = `${jodiFirst}${jodiSecond}`;

    // ---- MANUAL ----
    const openManual = openResult.toString().slice(-2);  // last 2 digits of opening
    const closeManual = closeResult.toString().slice(-2); // last 2 digits of closing

    // Array of winning manual numbers
    const manualWinningNumbers = [openManual, closeManual].join(",");

    // ---- HARRAF ----
    const harraf = {
      andarHaraf: parseInt(openResult.toString()[0]),
      baharHaraf: parseInt(closeResult.toString().slice(-1))
    };

    // ---- CROSSING ----
    const openLastDigit = openResult.toString().slice(-1);
    const closeLastDigit = closeResult.toString().slice(-1);

    const crossingNumbers = [
      `${openLastDigit}${closeLastDigit}`,
      `${closeLastDigit}${openLastDigit}`
    ].join(",");

    // ---- COPY-PASTE ----
    // let copyPasteResult = [];
    // if (copyPasteBets && Array.isArray(copyPasteBets)) {
    //   copyPasteResult = copyPasteBets.map(bet => ({
    //     ...bet,
    //     status: bet.number === crossingNumber ? "Win" : "Loss"
    //   }));
    // }

    let copyPasteResult = "Loss"; // default

    // Calculate sum of digits ka last digit
    const sumLastDigit = num => {
      const sum = num.toString().split("").reduce((acc, d) => acc + parseInt(d), 0);
      return sum.toString().slice(-1);
    };

    const openSumLast = sumLastDigit(openResult);
    const closeSumLast = sumLastDigit(closeResult);

    // Check conditions && ko dono true honi chahiye 
    if (openLastDigit === closeLastDigit && openSumLast === closeSumLast) {
      copyPasteResult = "Win";
    }

    // ---- Insert into DB ----
    const insertQuery = `
  INSERT INTO result 
  (GAME_ID, RESULT1, RESULT2, Jodi, Manual, andarHaraf, baharHaraf, Crossing, CopyPaste)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;



    const values = [
      gameId,
      openResult,
      closeResult,
      jodiNumber,
      manualWinningNumbers,
      harraf.andarHaraf,
      harraf.baharHaraf,
      crossingNumbers,
      copyPasteResult
    ];

    await req.db.query(insertQuery, values);


    const resultObj = {
      Jodi: jodiNumber,
      Manual: manualWinningNumbers,
      Harraf: harraf,
      Crossing: crossingNumbers,
      CopyPaste: copyPasteResult
    };

    console.log("Calculated Game Results:", resultObj);

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


export const getUserBetHistory = async (req, res) => {
  try {
    const mobile = req.user.mobile; // from JWT middleware

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number missing" });
    }

    // SQL query to get bets by user's mobile
    const [bets] = await req.db.query(
      `SELECT id, number, point, type, game,game_id, date_time
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
