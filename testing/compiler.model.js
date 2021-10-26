const { array } = require("joi")
const mongoose=require("mongoose")

const testSchema=new mongoose.Schema({
    language:{type:String, required:true, enum:["cpp", "py","java"]},
     filepath:{type:String, required:true},
    output:{type:String},
    userId:{type:mongoose.Schema.ObjectId,ref:"User"},
    questionId:{type:mongoose.Schema.ObjectId,ref:"problems"}
})


const Test=mongoose.model("test", testSchema)
module.exports=Test