const express = require("express");

const userRouter = express.Router();

const {
  totalUsers,
  postUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const adminAuthMiddleware = require(
  "../middlewares/adminAuthMiddleware"
);


// Total users
userRouter.get(
  "/api/admin/users/total",
  adminAuthMiddleware,
  totalUsers
);


// Add user
userRouter.post(
  "/api/admin/users",
  adminAuthMiddleware,
  postUser
);


// Get users
userRouter.get(
  "/api/admin/users",
  adminAuthMiddleware,
  getUser
);


// Update user
userRouter.put(
  "/api/admin/users",
  adminAuthMiddleware,
  updateUser
);


// Delete user
userRouter.delete(
  "/api/admin/users",
  adminAuthMiddleware,
  deleteUser
);


module.exports = userRouter;