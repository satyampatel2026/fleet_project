const express = require("express");

const adminPartnerRouter = express.Router();

const adminAuthMiddleware = require(
  "../middlewares/adminAuthMiddleware"
);

const {
  getPartners,
  updatePartnerStatus,getTotalPartners
} = require(
  "../controllers/adminPartnerController"
);

adminPartnerRouter.get(
  "/api/admin/partners/total",
  adminAuthMiddleware,
  getTotalPartners
);
// ================= GET ALL PARTNERS =================

adminPartnerRouter.get(
  "/api/admin/partners",
  adminAuthMiddleware,
  getPartners
);


// ================= UPDATE PARTNER STATUS =================

adminPartnerRouter.patch(
  "/api/admin/partners/:partnerId/status",
  adminAuthMiddleware,
  updatePartnerStatus
);


module.exports = adminPartnerRouter;