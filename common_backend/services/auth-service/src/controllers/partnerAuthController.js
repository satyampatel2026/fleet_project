const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const jwtSecret= "sp";
const nodemailer = require("nodemailer");

const registerPartner = async (req, res) => {
    let { partnername, email, mobile, password } = req.body;
    try {
        if (!partnername || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const [existingPartner] = await connection.query(
            "SELECT partner_id FROM partners WHERE email = ?", [email] );
         if (existingPartner.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });  }
        const hashedPassword = await bcrypt.hash(password, 10);
        let query = `INSERT INTO partners SET partner_name=UPPER(?), email=?, mobile=?, password=?`;
        let data = [partnername, email, mobile, hashedPassword];
        await connection.query(query, data);
        res.status(201).json({ message: "Partner created successfully" });
    } catch (error) {
        console.error("Error creating partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginPartner = async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const [partners] = await connection.query(
            "SELECT partner_id, partner_name, email, mobile, password FROM partners WHERE email = ?",
            [email]
        );
        if (partners.length === 0) {
            return res.status(404).json({
                message: "Partner not found"
            });
        }
        const partner = partners[0];
        const isMatch = await bcrypt.compare(password, partner.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });  }

        const token = jwt.sign({ id: partner.partner_id, email: partner.email }, jwtSecret, { expiresIn: '1h' });
            res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Login successful",
            partner: {
                id: partner.partner_id,
                partner_name: partner.partner_name,
                email: partner.email,
                mobile: partner.mobile
            }   
        });
    } catch (error) {
        console.error("Error logging in partner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const [partners] = await connection.query(
            "SELECT partner_id, partner_name, email FROM partners WHERE email = ?",
            [email]
        );

        if (partners.length === 0) {
            return res.status(404).json({
                message: "Email not registered"
            });
        }

        const partner = partners[0];

        // 6 digit OTP
        const otp = crypto.randomInt(100000, 1000000).toString();

        // OTP valid for 10 minutes
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Purane OTP delete
        await connection.query(
            "DELETE FROM password_reset_otp WHERE partner_id = ?",
            [partner.partner_id]
        );

        // New OTP save
        await connection.query(
            `INSERT INTO password_reset_otp
            (partner_id, email, otp, expires_at)
            VALUES (?, ?, ?, ?)`,
            [partner.partner_id, partner.email, otp, expiresAt]
        );

        // Email send
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
                <p>If you did not request this, please ignore this email.</p>
            `
        });

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const [records] = await connection.query(
            `SELECT id, partner_id, otp, expires_at
             FROM password_reset_otp
             WHERE email = ?
             ORDER BY id DESC
             LIMIT 1`,
            [email]
        );

        if (records.length === 0) {
            return res.status(404).json({
                message: "OTP not found"
            });
        }

        const record = records[0];

        // OTP expire check
        if (new Date() > new Date(record.expires_at)) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        // OTP match
        if (record.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // OTP verified
        await connection.query(
            "UPDATE password_reset_otp SET verified = TRUE WHERE id = ?",
            [record.id]
        );

        return res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.error("Verify OTP error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and new password are required"
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const [records] = await connection.query(
            `SELECT id, partner_id, verified, expires_at
             FROM password_reset_otp
             WHERE email = ?
             ORDER BY id DESC
             LIMIT 1`,
            [email]
        );

        if (records.length === 0) {
            return res.status(400).json({
                message: "Please request OTP first"
            });
        }

        const record = records[0];

        if (!record.verified) {
            return res.status(400).json({
                message: "Please verify OTP first"
            });
        }

        if (new Date() > new Date(record.expires_at)) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await connection.query(
            "UPDATE partners SET password = ? WHERE partner_id = ?",
            [hashedPassword, record.partner_id]
        );

        // OTP delete after successful reset
        await connection.query(
            "DELETE FROM password_reset_otp WHERE id = ?",
            [record.id]
        );

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
const logoutPartner = async (req, res) => {
    console.log("Logout request received");
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            expires: new Date(0), 
        });
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { registerPartner, loginPartner, forgotPassword, verifyOtp, resetPassword, logoutPartner };
