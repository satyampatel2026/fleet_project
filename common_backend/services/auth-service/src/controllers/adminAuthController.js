const connection = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Email and password required
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
      u.status,
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

    // Inactive user login block
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "User account is inactive",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password not match",
      });
    }

    // Currently only Admin login
    if (user.role_name !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only Admin can login",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        type: "admin",
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.user_id,
        role: user.role_name,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

module.exports = {
  loginUser,logoutUser
};