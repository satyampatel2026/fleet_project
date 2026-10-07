const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Complete decoded JWT
    req.user = decoded;

    // Admin token
    if (decoded.type === "admin") {
      req.userId = decoded.id;
      req.userRole = decoded.role;
    }

    // Partner token
    if (decoded.type === "partner") {
      req.partnerId = decoded.id;
      req.partnerEmail = decoded.email;
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;