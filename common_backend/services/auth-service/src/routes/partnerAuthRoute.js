const express = require('express');
const partnerAuthRouter = express.Router();
const {registerPartner,loginPartner,forgotPassword, verifyOtp, resetPassword,logoutPartner} = require('../controllers/partnerAuthController');
const authMiddleware = require('../middlewares/partnerAuthMiddleware'); 

partnerAuthRouter.post('/register-partner', registerPartner);
partnerAuthRouter.post('/login-partner', loginPartner);
partnerAuthRouter.post('/forgot-password', forgotPassword);
partnerAuthRouter.post('/verify-otp', verifyOtp);
partnerAuthRouter.post('/reset-password', resetPassword);
partnerAuthRouter.post('/logout-partner', logoutPartner);

partnerAuthRouter.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: "Authenticated" });
});
module.exports = partnerAuthRouter;