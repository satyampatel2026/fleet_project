const express = require('express');
const usersRouter = express.Router();
const {totalUsers, postUser, getUser, updateUser, deleteUser } = require('../controllers/usersController');

usersRouter.get('/api/users/total', totalUsers);
usersRouter.post('/api/users',postUser);
usersRouter.get('/api/users',getUser);
usersRouter.patch('/api/users',updateUser);
usersRouter.delete('/api/users',deleteUser);

module.exports = usersRouter;