const jwt=require("jsonwebtoken")
require('dotenv').config()
const authenticate=(req, res, next)=>{
    try{
        
        const token=req.headers.authorization;
        
        const decode=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        req.user=decode
        next()
    }
    catch(error){
        res.status(401).json({
            message:"Authentication Failed!"
        })
    }
}


const verifyToken= (req, res, next) => {
    let token = req.headers.authorization;
    try {
      if (token) {
        let payload = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET);
        req.user = payload;
        console.log(payload,"payload bahiy")
        return next();
      } else {
        return res.status(401).json({ error: { body: ['Token Required'] } });
      }
    } catch (error) {
      next(error);
    }
  }



module.exports={authenticate,verifyToken}