const jwt = require("jsonwebtoken");

const jwtSecret = "sp";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        req.partnerId = decoded.id;
        req.partnerEmail = decoded.email;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;