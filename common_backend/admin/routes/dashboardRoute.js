const express=require('express');
const dashboardRouter=express.Router();
const totalPartners=require('../controllers/dashboardController');
const auth=require('../middlewares/authMiddleware')
const adminOnly=require('../middlewares/adminOnly')

dashboardRouter.get('/api/partners/total',auth,adminOnly,totalPartners);

module.exports=dashboardRouter;