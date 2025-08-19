import jwt from "jsonwebtoken";

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
    console.log(req.user,"reqqkss user");
    return res.json({
      success: true,
      message: "Admin details fetched successfully",
      user: { username, role },
    });
  };