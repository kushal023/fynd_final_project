const express=require("express")
const router=express.Router()
const authenticate=require("../user/user.authenticate")

const   {code, result}=require("./compiler.controller")

router.post("/run",authenticate,code)
router.get("/result", result)

module.exports=router