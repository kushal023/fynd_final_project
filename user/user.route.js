
const express = require("express")
const router = express.Router()
const {showProblem} = require("./user.controller")

router.get("/showProblem", showProblem)


module.exports = router