const Queue=require("bull")
const {executeCpp}=require("./executeCpp")

const { executePy } = require("./executePy")
const jobQueue=new Queue("job-runner-queue")
const Job=require("./compiler.model")
const NUM_WORKERS=5

const functionsByLang = {
    cpp:executeCpp,
    py: executePy
}

jobQueue.process(NUM_WORKERS, async ({data})=>{
    //console.log(data)
    const {id:jobId}=data
    const job=await Job.findById(jobId)
    if(job===undefined){
        throw Error(`cannot find job with id ${jobId}`)
    }
    console.log("Fetched Job", job)

    try{
    let output
    job["startedAt"]=new Date()

    
    output=await functionsByLang[job.language](job.filepath);
    job["completedAt"]=new Date()
    job["output"]=output
    job["status"]="success"
    await job.save()
    console.log("Output Job", job)

    return true
 
    }catch(err){
        job["completedAt"]=new Date()
        job["output"]=JSON.stringify(err)
        job["status"]="error"
        await job.save()
        throw Error(JSON.stringify(err))
       
    }
})

jobQueue.on("failed",(error)=>{
    console.error(error.data.id, error.failedReason)
})

const addJobToQueue=async (jobId)=>{
    await jobQueue.add({id:jobId})
}

module.exports={
    addJobToQueue
}