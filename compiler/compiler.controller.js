const { response } = require("express")
const {generateFile}=require("./generateFile")
const {executeCpp}=require("./executeCpp")
const {executeJava}=require("./executeJava")

const { executePy } = require("./executePy")
const fs=require("fs")


const functionsByLang = {
    cpp:executeCpp,
    py: executePy
}

const code= async (req, res)=>{
    const {language="cpp", code}=req.body;
  
    
    console.log(language, code.length)
    if(!code){
        return res.status(400).json({success:false, error:"Empty code body!"})
    }
    try{

    
    //need to generate a c++ file with content from the request
    const filepath=await generateFile(language, code)
    //we need to run the file and send the response
    let output;
    
    
    output=await functionsByLang[language](filepath);
    
    return res.json({filepath, output})
    }catch(err){
        res.status(500).json({err})
    }
    
}


module.exports={
    code
}