// validate check the data validation
const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controllers');
const {validate} = require('./user.model')

userRouter.post('/', validate, userController.createUser);

userRouter.get('/', userController.getUsers);
userRouter.get('/:name', userController.getUser);

userRouter.put('/', userController.updateUser);
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;

