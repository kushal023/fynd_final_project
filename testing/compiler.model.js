const mongoose=require("mongoose")

const testSchema=new mongoose.Schema({
    language:{type:String, required:true, enum:["cpp", "py","java"]},
    filepath:{type:String, required:true},
    output:{type:String}
})


const Test=mongoose.model("test", testSchema)
module.exports=Test