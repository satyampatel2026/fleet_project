const express = require('express');
const departmentRouter = express.Router();
const {getDept,postDept,updateDept,deleteDept} = require('../controllers/departmentController');

departmentRouter.get('/api/departments',getDept);
departmentRouter.post('/api/departments',postDept);
departmentRouter.patch('/api/departments',updateDept);
departmentRouter.delete('/api/departments',deleteDept);

module.exports = departmentRouter;