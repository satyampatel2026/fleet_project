const express = require("express");
const authRouter= express.Router();
const {loginUser}= require("../controllers/authController");

authRouter.post('/api/loginuser', loginUser);

module.exports= authRouter;