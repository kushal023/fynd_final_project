const express=require("express")
const router=express.Router()

const   {code, result}=require("./compiler.controller")

router.post("/run",code)
router.get("/result", result)

module.exports=router