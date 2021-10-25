const mongoose=require("mongoose")


const AnswerSchema=new mongoose.Schema({
    questionId:{type:String},
    answer:{type:String},
    isCorrect:{type:String},
    answer:{type:array},
    userId:{type:mongoose.Schema.ObjectId,ref:"User"}
},{timestamps:true})

const Answer=mongoose.model("Answer", AnswerSchema)

module.exports=Answer




//Get question
   //First load the user 
    
    //  User object will be of this format
    //   {
    //   attempts: {
    //    level1: [{questionId, answer, isCorrect}]
    //   }
    //   }

// within array of attempts for given questionid