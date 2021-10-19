const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("./user.model")
const jwt = require("jsonwebtoken")
const Problem=require("../HR/question.model")


// const handleRegisteredUser = async() => {
//     var userId=req.body.username
//     try {
//         const user = await User.findOne({ $or: [{ email: userId }, { phone: userId }] })
//         if (user) {
//             var err = new Error('A user with that email has already registered. Please use a different email..')
//             err.status = 400;
//            next();

//         }

        
//     }   
//     catch (error) {
//         res.status(400).json({
//             message: "An errror occured"
//         })
    
//     }   
// }


// const registerUser = async () => {
//     bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
//         if (err) {
//             res.json({
//                 error: err
//             })
//         }
//         let user = new User({
//             fname: req.body.fname,
//             lname: req.body.lname,
//             email: req.body.email,
//             role: req.body.role,
//             phone: req.body.phone,
//             password: hashedPass

//         })
//         user.save()
//             .then(user => {
//                 res.status(200).json({
//                     message: "User Added Successfully!"
//                 })
//             })
//             .catch(error => {
//                 res.status(400).json({
//                     message: "An errror occured"
//                 })
//             })
//     })
// }

// const register = async(req, res, next) => {
//     const isRegistered = await isRegistered(req.body.email);
//     if (isRegisterd) {
//         await handleRegisteredUser(req, res)
//     } else {
//         await registerUser(req, res);
//     }


      
// }



const register = async(req, res, next) => {
    const isRegistered = await isRegistered(req.body.email);
    if (isRegisterd) {
        await handleRegisteredUser(req, res)
    } else {
        await registerUser(req, res);
    }


      
}


const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
                        res.status(200).json({
                            message: "Login Successfully!",
                            token: token
                        })
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

}

//Get question
const showProblem=(req,res, next)=>{
    Problem.find({}, {question:1, _id:0}).limit(2)
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






module.exports = {
    register, login,showProblem
}



