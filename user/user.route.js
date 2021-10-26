const express = require("express");
const userValidation=require("./user.validator");
const model=require("./user.model");
const {register, login, userResponse,showProblem}=require("./user.controller");
const router = express.Router();
const User = require("./user.model");
var bcrypt = require('bcryptjs');


router.post("/register",userValidation,register);
router.post("/login", login);
router.get("/showProblem",showProblem);
router.get("/userResponse", userResponse);








module.exports=router;