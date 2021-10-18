var mongoose=require("mongoose")

var csvSchema=new mongoose.Schema({
    file:{type:String},
    
})

module.exports=mongoose.model("employeerecords", csvSchema)