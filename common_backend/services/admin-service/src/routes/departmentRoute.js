const express = require("express");

const departmentRouter = express.Router();

const {
  getDept,
  postDept,
  updateDept,
  deleteDept,
} = require("../controllers/departmentController");

const adminAuthMiddleware = require(
  "../middlewares/adminAuthMiddleware"
);

// Get all departments
departmentRouter.get(
  "/api/admin/departments",adminAuthMiddleware,
  getDept
);


// Add department
departmentRouter.post(
  "/api/admin/departments",adminAuthMiddleware,
  postDept
);


// Update department
departmentRouter.put(
  "/api/admin/departments",adminAuthMiddleware,
  updateDept
);


// Delete department
departmentRouter.delete(
  "/api/admin/departments",adminAuthMiddleware,
  deleteDept
);


module.exports = departmentRouter;