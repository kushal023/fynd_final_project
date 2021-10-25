const express=require("express");
const fileUpload = require('express-fileupload');
const bodyParser=require("body-parser")
const path=require("path")
const jwt = require('jsonwebtoken');
const User = require('./user/user.model')
const routes = require('./user/user.route');
 
const dotenv=require("dotenv")
dotenv.config()

const QuestionRoute=require("./HR/question.route")
const UserRoute=require("./user/user.route")
const CompilerRoute=require("./testing/compiler.route")
const { DB_URL, PORT } = require("./config");

const server=express()
server.use(fileUpload());
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
const DB = require('./db');



server.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
     next(); 
    } 
   });
    




DB.init(DB_URL).then((db) => {
    server.listen(PORT, (req, res)=>{
        console.log(`http://localhost:${PORT}`)
    })
    server.use("/hr",QuestionRoute)
    server.use("/user", UserRoute)
    server.use("/test", CompilerRoute)
    server.use("/", UserRoute)
});
 
