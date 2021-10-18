const express=require("express")
const userValidation=require("./user.validator")
const {register, login}=require("./user.controller")
const model=require("./user.model")
const router=express.Router()

router.post("/register-user",userValidation,register)
router.post("/register-hr",userValidation,register)
router.post("/register-admin",userValidation,register)
router.post("/login-user",login)
router.post("/login-hr",login)
router.post("/login-admin",login)


module.exports=router;