const express = require("express");

const adminKycRouter = express.Router();

const adminAuthMiddleware = require(
  "../middlewares/adminAuthMiddleware"
);

const {
  getKycList,
  getKycDetails,
  verifyKyc,
  rejectKyc,
} = require(
  "../controllers/adminKycController"
);


// ================= GET ALL KYC =================

adminKycRouter.get(
  "/api/admin/kyc",
  adminAuthMiddleware,
  getKycList
);


// ================= GET KYC DETAILS =================

adminKycRouter.get(
  "/api/admin/kyc/:kycId",
  adminAuthMiddleware,
  getKycDetails
);


// ================= VERIFY KYC =================

adminKycRouter.patch(
  "/api/admin/kyc/:kycId/verify",
  adminAuthMiddleware,
  verifyKyc
);


// ================= REJECT KYC =================

adminKycRouter.patch(
  "/api/admin/kyc/:kycId/reject",
  adminAuthMiddleware,
  rejectKyc
);


module.exports = adminKycRouter;