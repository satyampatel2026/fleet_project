const express = require('express');
const partnerAuthRouter = express.Router();
const {registerPartner,loginPartner,forgotPassword, verifyOtp, resetPassword,logoutPartner} = require('../controllers/partnerAuthController');
const authMiddleware = require('../middlewares/authMiddleware'); 

partnerAuthRouter.post('/api/register-partner', registerPartner);
partnerAuthRouter.post('/api/login-partner', loginPartner);
partnerAuthRouter.post('/api/forgot-password', forgotPassword);
partnerAuthRouter.post('/api/verify-otp', verifyOtp);
partnerAuthRouter.post('/api/reset-password', resetPassword);
partnerAuthRouter.post('/api/logout-partner', logoutPartner);

partnerAuthRouter.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: "Authenticated" });
});
module.exports = partnerAuthRouter;