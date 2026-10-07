const express = require("express");

const dashboardRouter = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const adminAuthMiddleware = require(
  "../middlewares/adminAuthMiddleware"
);

// Admin dashboard stats
dashboardRouter.get(
  "/api/admin/dashboard",adminAuthMiddleware,
  getDashboardStats
);


module.exports = dashboardRouter;