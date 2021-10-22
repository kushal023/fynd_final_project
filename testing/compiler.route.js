const express=require("express")
const router=express.Router()
const {allOutput, singleOutput, run}=require("./compiler.controller")


router.get("/allOutput",allOutput)
router.get("/singleOutput",singleOutput)
router.post("/run",run)

module.exports=router