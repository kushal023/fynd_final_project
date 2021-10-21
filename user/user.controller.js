const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("./user.model")
const jwt = require("jsonwebtoken")
const Problem=require("../HR/question.model")
const Job=require("../testing/compiler.model")

const registerUser = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            role: req.body.role,
            phone: req.body.phone,
            password: hashedPass

        })
        user.save()
            .then(data => {
                console.log(data, "fmcinfi");
                res.status(200).json({
                    message: "User Added Successfully!"
                })
            })
            .catch(error => {
                console.log(error, "err");
                res.status(400).json({
                    message: "An errror occured"
                })
            })
    })
}

const register = async(req, res, next) => {
    var email=req.body.email
    const user = await User.findOne({ $or: [{ email }] })    
    if (user?.email === req.body.email) {
        res.json({
            message: 'A user with that email has already registered. Please use a different email..'
        })
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




// //Get question
//    //First load the user 
//     /**'
//      * User object will be of this format
//      * {
//      *  attempts: {
//      *  level1: [{questionId, answer, isCorrect}]
//      * }
//      * }
//      /
//     //Second check till which level has he submitted answer. Lets say this is levelN
//     //Third generate a query for questions where level=levelN and _id not in user.response[levelN].map((r) => r.questionId)
//     //From this query find out the number of questions in database with count() function. Lets say count
//     //Next, generate a random number between 0 and count - 1
//     //Repeat same query as above to fetch only 1 question from offset randomNumber
//     //Update the user in Mongo with this question also added to attempts. Add {questionId} into the attempts[levelN]
//     //Send to the user
//     /*
// const showProblem=async (req,res, next)=>{
//     const attemptedProblems = (getUser(req.token).attempts || []).map((a) => a.questionId)
//     const totalUnseenProblems = await Problem.find({_id: {not_in: attemptedProblems}});
//     const randomIndex = Math.floor(Math.random() * totalUnseenProblems);
//     const nextQuestion = Problem.find({_id: {not_in: attemptedProblems}}, {_id:0, questionId: "$_id",question:1 }).limit(1).skip(randomIndex);
//     user.attempts.push({questionId: nextQuestion._id});
    
//     // .catch(error=>{
//     //     res.status(400).json({
//     //         error
//     //     })
//     // })

// }


// const handleResponse = () => {
//     const user = getUser(req.token);
//     //Check if user has attempted this questionId
//     const isSeen = user.attempts.find({questionId: req.questionId});
//     if (!isSeen) {
//         return error
//     }
//     const isCorrect = isAnswerCorrect();
//     User.update({_id: user._id}, {$set: {}})
// }
//within array of attempts for given questionid

// const isAnswerCorrect=(Problem, SubmittedAnswer)=>{
   
//     var problem = Problem.findOne({_id: SubmittedAnswer.questionId}, {_id:0,question:0,level:0})
//     const output = getAnswer(SubmittedAnswer);
//     return problem.answer === output;
// }


const showProblem=(req,res, next)=>{
    Problem.find({}, {question:1, _id:0}).limit(1)
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

