const express=require("express")
const router=express.Router()

const   {code}=require("./compiler.controller")

router.post("/run",code)

module.exports=router