const express = require("express");

const adminAuthRouter = express.Router();

const {
  loginUser,logoutUser
} = require("../controllers/adminAuthController");

const authMiddleware = require("../middlewares/authMiddleware");


// Admin Login
adminAuthRouter.post(
  "/api/admin/login",
  loginUser
);

adminAuthRouter.post(
  "/api/admin/logout",
  logoutUser
);

// Admin authentication check
adminAuthRouter.get(
  "/api/admin/auth/verify",
  authMiddleware,
  (req, res) => {

    // Partner token ko admin endpoint use nahi karne dena
    if (req.user.type !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin authenticated",
      user: {
        id: req.userId,
        role: req.userRole,
      },
    });
  }
);


module.exports = adminAuthRouter;