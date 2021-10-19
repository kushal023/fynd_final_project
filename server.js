const express=require("express")

var fileUpload = require('express-fileupload');
const bodyParser=require("body-parser")
const path=require("path")

const dotenv=require("dotenv")
dotenv.config()

const QuestionRoute=require("./HR/question.route")
const UserRoute=require("./user/user.route")
const CompilerRoute=require("./compiler/compiler.route")
const { DB_URL, PORT } = require("./config");

const server=express()
server.use(fileUpload());
server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json())

const DB = require('./db');
DB.init(DB_URL).then((db) => {
    server.listen(PORT, (req, res)=>{
        console.log(`http://localhost:${PORT}`)
    })
    server.use("/hr",QuestionRoute)
    server.use("/user", UserRoute)
    server.use("/", CompilerRoute)
});
 
