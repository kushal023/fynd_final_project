const User=require("./user/user.model")
const bcrypt=require("bcryptjs")
let password="admin123"



const admin=(req,res,next)=>{
    User.findOne({role:"admin"},(err, admin)=>{
        if(err) throw err
        if(admin){
            return "admin account already exists"
        }
    })

    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
            let user=new User({
                fname:"Kushal",
            lname:"Chauhan",
            email:"kushal2017328@gmail.com",
            role:"admin",
            phone:"9015091321"
        
            })
            user.save()
            .then(user=>{
                res.status(200).json({
                    message:"User Added Successfully!"
                })
            })
            .catch(error=>{
                res.status(400).json({
                    message:"An errror occured"
                })
            })
    })
    }