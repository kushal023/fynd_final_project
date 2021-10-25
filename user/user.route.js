const express = require("express")
const userValidation=require("./user.validator")
const model=require("./user.model")
const {register, login}=require("./user.controller")
const router = express.Router()
const {showProblem} = require("./user.controller")
const User = require("./user.model")
var bcrypt = require('bcryptjs');
router.post("/register",userValidation,register)




router.post("/login", (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, async function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    
                    if (result) {
                        
                       
                        var token =  await user.signToken();
                        console.log(token,"awaiting")
                        return res.status(201).json({ user: user.userJSON(token) });

                    } else {
                        res.status(401).json({
                            message: "Password does not matched!"
                        })
                    }
                })
            } else {
                res.status(404).json({
                    message: "No User Found!"
                })
            }
        })

})




router.get("/showProblem" ,showProblem)
// router.get('/', async (req, res, next) => {
//     // console.log(req);
//     let id = req.user.userId;
//     try {
//       let user = await User.findById(id);
//       res.status(200).json({ user: user.displayUser(id) });
//     } catch (error) {
//       next(error);
//     }
//   });





  




module.exports=router;