const express = require("express");
const authRouter= express.Router();
const {loginUser,logoutUser}= require("../controllers/authController");
const auth=require('../middlewares/authMiddleware')

authRouter.post('/api/admin/loginuser', loginUser);
authRouter.post("/api/logout",auth, logoutUser);

authRouter.get("/api/me", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports= authRouter;