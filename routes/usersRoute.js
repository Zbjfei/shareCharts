/* eslint-disable consistent-return */
const express = require('express');

const userSchema = require('../model/userModel.js');

// import db connection 
const db = require('../db/config.js');
const userController = require('../controller/userController.js');

//load collection
const shareUsers = db.get('s_ShareUsers');

const router = express.Router();

// Get all shareUsers
router.get('/user/', userController.getAllUser);


// check one user by username 
router.get('/user/:username',userController.getUserByUserName);


// userLogin check user by username 
router.post('/user/login',userController.userLogin);




module.exports = router;
