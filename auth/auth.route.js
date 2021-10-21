
const express = require('express');
const router = express.Router();
const authValidation=require("./auth.validator")

const {signup,login,getUser,getUsers,updateUser,deleteUser,allowIfLoggedin,hasPermission} = require('./auth.controller');
 
router.post('/signup',authValidation, signup);
 
router.post('/login',login);
 
router.get('/users/:userId',allowIfLoggedin,getUser);
 
router.get('/users',allowIfLoggedin,hasPermission('readAny', 'profile'),getUsers);
 
router.put('/user/:userId',allowIfLoggedin,hasPermission('updateAny', 'profile'),updateUser);
 
router.delete('/user/:userId',allowIfLoggedin,hasPermission('deleteAny', 'profile'),deleteUser);
 
module.exports = router;


