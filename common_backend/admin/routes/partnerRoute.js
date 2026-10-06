const express=require('express');
const partnerRouter=express.Router();
const { getPartners, updatePartnerStatus,}=require('../controllers/partnerController');

partnerRouter.get("/api/partners", getPartners);
partnerRouter.patch("/api/partners/:partnerId/status", updatePartnerStatus);

module.exports=partnerRouter;