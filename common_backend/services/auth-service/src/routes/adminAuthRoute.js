const express = require("express");
const adminAuthRouter= express.Router();
const {loginUser}= require("../controllers/adminAuthController");

adminAuthRouter.post('/loginuser', loginUser);

module.exports= adminAuthRouter;