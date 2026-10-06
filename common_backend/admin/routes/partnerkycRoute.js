const express = require('express');
const adminPartnerKycRouter = express.Router();
const {getKycList,getKycDetails,verifyKyc,rejectKyc}=require('../controllers/partnerkycController');

adminPartnerKycRouter.get('/api/partnerkyc',getKycList);
adminPartnerKycRouter.get('/api/kyc/:kycId',getKycDetails);
adminPartnerKycRouter.patch('/api/kyc/:kycId/verify',verifyKyc);
adminPartnerKycRouter.patch('/api/kyc/:kycId/reject',rejectKyc);
module.exports=adminPartnerKycRouter;