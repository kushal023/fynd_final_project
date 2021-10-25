const Test=require("./compiler.model");
const fs=require("fs");
const { generateFile }=require("./generateFile")
const { executeCpp}=require("./executeCpp")
const { executePy } = require("./executePy")
const { executeJava }=require("./executeJava")
const Problem=require("../HR/question.model")
const User=require("../user/user.model")

//show all output

const allOutput=async (req,res, next)=>{
 
    Test.find({}, { _id:0,questionId:"$_id",output:"$output"})
    .then(response=>{
         res.json({
             response
         })
     })
     .catch(error=>{
         res.status(400).json({
             error
         })
     })
    }
 



//Show Single Output
const singleOutput=(req, res, next)=>{
    let questionId=req.body.questionId
    Test.findById(questionId, { _id:0,output:"$output"})
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.status(404).json({
            message:`Test with id: ${req.body.questionId} not found`
        })
    })
}

//code run
const functionsByLang={
    cpp:executeCpp,
    py:executePy,
    java:executeJava
}



const run=async (req,res)=>{
console.log(req.params, req.body, "req.params")

   const {questionId} = req.params
    const {language="cpp",code}=req.body;
   
    if(code===undefined){
        return res.status(400).json({success:false, error:"Empty code body"})
    }
    try{
  
    //need to generate a c++ file with content from the request
 
    const filepath=await generateFile(language, code)
    const test=await new Test({language, filepath}).save()

    const userId = req.user?.userId;
    const answerId=test["_id"]
    

    
 
    //we need to run the file and send the response
    let output;
    output=await functionsByLang[test.language](test.filepath);
    test["output"]=output;
    test["userId"]=userId;
    test["questionId"]=questionId;

    await test.save()



    return res.json({answerId,output,userId,questionId})
   
   
     }catch(err){
        res.status(500).json({err})
    }
   
}





module.exports={
    allOutput, singleOutput,run
};