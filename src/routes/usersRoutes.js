/*
    1. imports necessary logics for users operation
    2. operates http requests (get, post, patch, delete)
    
*/

const express = require('express');
const userRouter = express.Router();
/*
const userRouter = express.Router();: 
This line creates a new router object, userRouter, using the express.Router() function. 
A router is a mini-application within Express that allows you to group related routes together and manage them separately.
*/

const { getAllUsers } = require('../controllers/userControllers');


// router.post('/', saveUser); // Save user data
userRouter.get('/', getAllUsers); // Get all users

module.exports = userRouter;
