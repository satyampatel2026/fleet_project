const express=require('express');
const dashboardRouter=express.Router();
const totalPartners=require('../controllers/dashboardController');

dashboardRouter.get('/api/partners/total',totalPartners);

module.exports=dashboardRouter;