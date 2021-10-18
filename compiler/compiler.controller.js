const { response } = require("express")
const {generateFile}=require("./generateFile")
const {addJobToQueue}=require("./jobQueue")
const Job=require("./compiler.model")
const fs=require("fs")


const code= async (req, res)=>{
    const {language="cpp", code}=req.body;
  
    
    console.log(language, code.length)
    if(!code){
        return res.status(400).json({success:false, error:"Empty code body!"})
    }

    let job;
    try{

    
    //need to generate a c++ file with content from the request
    const filepath=await generateFile(language, code)
     job=await new Job({language,filepath}).save()
    const jobId=job["_id"]
    addJobToQueue(jobId) 
    res.status(201).json({success:true, jobId})
}catch(err){
   return res.status(201).json({success:false, err:JSON.stringify(err)})
}
}

const result=async(req, res)=>{
    const jobId=req.query._id
    console.log("status requested", jobId)
    if(jobId==undefined){
        return res.status(400).json({success:false, error:"missing id query param"})
    }
    try{
        const job=await Job.findById(jobId)

        if(job===undefined){
            return res.status(404).json({success:false, error:"invalid job id"})
        }
        return res.status(200).json({success:true,job})
    }catch(err){
        return res.status(400).json({success:false, error:JSON.stringify(err)})
    }
}

module.exports={
    code, result
}