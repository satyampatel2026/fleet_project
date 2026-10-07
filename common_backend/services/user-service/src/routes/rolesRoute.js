const express = require('express');
const rolesRouter = express.Router();
const {postRole,getRole,updateRole,deleteRole,getUserRole,postUserRole,deleteUserRole} = require('../controllers/rolesController');

rolesRouter.post('/api/roles',postRole);
rolesRouter.get('/api/roles',getRole);
rolesRouter.patch('/api/roles',updateRole);
rolesRouter.delete('/api/roles',deleteRole);
rolesRouter.get('/api/userrole',getUserRole);
rolesRouter.post('/api/userrole',postUserRole);
rolesRouter.delete('/api/userrole',deleteUserRole);

module.exports = rolesRouter;