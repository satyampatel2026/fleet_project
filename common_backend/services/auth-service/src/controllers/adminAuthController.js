const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email aur password required hai",
    });
  }

  const sql = `
    SELECT 
      u.user_id,
      u.email,
      u.password,
      r.role_name
    FROM users u
    LEFT JOIN role_assign ra 
      ON u.user_id = ra.user_id
    LEFT JOIN roles r 
      ON ra.role_id = r.role_id
    WHERE u.email = ?
  `;

  try {
    const [data] = await connection.query(sql, [email]);

    if (data.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const user = data[0];

    bcrypt.compare(password, user.password, (bcryptError, result) => {
      if (bcryptError) {
        console.error(bcryptError);

        return res.status(500).json({
          success: false,
          message: "Password verification error",
        });
      }

      // Password galat
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "Password not match",
        });
      }

      // Role check
      if (user.role_name !== "Admin") {
        return res.status(403).json({
          success: false,
          message: "Only Admin can login",
        });
      }

      // JWT token create
      const token = jwt.sign(
        {
          id: user.user_id,
          role: user.role_name,
        },
        process.env.JWT_SECRET || "ps",
        {
          expiresIn: "1d",
        }
      );

      console.log("TOKEN CREATED:", token);

      // Token ko cookie me store karo
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // production me true
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Success response
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user.user_id,
          role: user.role_name,
        },
      });
    });
  } catch (err) {
    console.error("DATABASE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { loginUser };
