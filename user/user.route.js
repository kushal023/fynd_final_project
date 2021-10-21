const express = require("express")
const userValidation=require("./user.validator")
const model=require("./user.model")
const {register, login}=require("./user.controller")
const router = express.Router()
const {showProblem} = require("./user.controller")


router.post("/register",userValidation,register)
router.post("/login",login)
router.get("/showProblem", showProblem)


module.exports=router;