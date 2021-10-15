const express=require("express")
const userValidation=require("./user.validator")
const {register, login}=require("./user.controller")
const model=require("./user.model")
const router=express.Router()

router.post("/register",userValidation,register)
router.post("/login",login)

module.exports=router;