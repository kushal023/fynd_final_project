const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const morgan = require('morgan')
const bodyParser=require("body-parser")

dotenv.config()
const {DB,PORT}=require("./config")
const server=express()


const CompilerRoute=require("./compiler/compiler.route")
const UserRoute=require("./user/user.route")

mongoose.connect(DB,{useNewUrlParser: true, useUnifiedTopology: true},)

const db=mongoose.connection

db.on("error",(error)=>{
    console.error(error)
})

db.once("open",()=>{
    console.log("Database connection established!")
})


server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(morgan('dev'))
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())

server.listen(PORT, (req, res)=>{
    console.log(`http://localhost:${PORT}`)
})

server.use("/", CompilerRoute)
server.use("/user", UserRoute)

