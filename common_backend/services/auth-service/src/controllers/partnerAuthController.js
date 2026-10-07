const connection = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const registerPartner = async (req, res) => {
  const { partnername, email, mobile, password } = req.body;

  try {
    if (!partnername || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const [existingPartner] = await connection.query(
      "SELECT partner_id FROM partners WHERE email = ?",
      [email]
    );

    if (existingPartner.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO partners
      SET
        partner_name = UPPER(?),
        email = ?,
        mobile = ?,
        password = ?
    `;

    await connection.query(query, [
      partnername,
      email,
      mobile,
      hashedPassword,
    ]);

    return res.status(201).json({
      success: true,
      message: "Partner created successfully",
    });
  } catch (error) {
    console.error("Register Partner Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= LOGIN PARTNER =================

const loginPartner = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const [partners] = await connection.query(
      `
      SELECT
        partner_id,
        partner_name,
        email,
        mobile,
        password,
        status
      FROM partners
      WHERE email = ?
      `,
      [email]
    );

    if (partners.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    const partner = partners[0];

    if (partner.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Partner account is inactive",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      partner.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: partner.partner_id,
        email: partner.email,
        type: "partner",
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
      partner: {
        id: partner.partner_id,
        partner_name: partner.partner_name,
        email: partner.email,
        mobile: partner.mobile,
      },
    });
  } catch (error) {
    console.error("Partner Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= FORGOT PASSWORD =================

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const [partners] = await connection.query(
      `
      SELECT partner_id, partner_name, email
      FROM partners
      WHERE email = ?
      `,
      [email]
    );

    if (partners.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    const partner = partners[0];

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // Delete previous OTP
    await connection.query(
      `
      DELETE FROM password_reset_otp
      WHERE partner_id = ?
      `,
      [partner.partner_id]
    );

    // Save new OTP
    await connection.query(
      `
      INSERT INTO password_reset_otp
        (partner_id, email, otp, expires_at)
      VALUES (?, ?, ?, ?)
      `,
      [
        partner.partner_id,
        partner.email,
        otp,
        expiresAt,
      ]
    );

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: partner.email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>

        <p>Hello ${partner.partner_name},</p>

        <p>Your password reset OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 10 minutes.</p>

        <p>
          If you did not request this,
          please ignore this email.
        </p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= VERIFY OTP =================

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const [records] = await connection.query(
      `
      SELECT
        id,
        partner_id,
        otp,
        expires_at
      FROM password_reset_otp
      WHERE email = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      [email]
    );

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    const record = records[0];

    if (
      new Date() >
      new Date(record.expires_at)
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (record.otp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await connection.query(
      `
      UPDATE password_reset_otp
      SET verified = TRUE
      WHERE id = ?
      `,
      [record.id]
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= RESET PASSWORD =================

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    const [records] = await connection.query(
      `
      SELECT
        id,
        partner_id,
        verified,
        expires_at
      FROM password_reset_otp
      WHERE email = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      [email]
    );

    if (records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please request OTP first",
      });
    }

    const record = records[0];

    if (!record.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    if (
      new Date() >
      new Date(record.expires_at)
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await connection.query(
      `
      UPDATE partners
      SET password = ?
      WHERE partner_id = ?
      `,
      [hashedPassword, record.partner_id]
    );

    await connection.query(
      `
      DELETE FROM password_reset_otp
      WHERE id = ?
      `,
      [record.id]
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= LOGOUT PARTNER =================

const logoutPartner = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Partner Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  registerPartner,
  loginPartner,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logoutPartner,
};