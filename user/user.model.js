const mongoose=require("mongoose")
const validator=require("validator")

const UserSchema=new mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    role:{type:String, default:"user"},
    phone:{type:String, required:true, unique:true},
    password:{type:String, required:true}
},{timestamps:true})

const User=mongoose.model("User", UserSchema)

module.exports=User