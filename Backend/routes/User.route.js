const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

const userRouter = express.Router();

//Route for registering the new user
userRouter.post("/register", registerUser);

//Route for logging in the user
userRouter.post("/login", loginUser)

//Route to get all users
userRouter.get("", getUsers)

module.exports = {userRouter}