const { response } = require("express")
const Problem=require("../HR/question.model")
const Job=require("../compiler/compiler.model")



//Get question
   //First load the user 
    /**'
     * User object will be of this format
     * {
     *  attempts: {
     *  level1: [{questionId, answer, isCorrect}]
     * }
     * }
     */
    //Second check till which level has he submitted answer. Lets say this is levelN
    //Third generate a query for questions where level=levelN and _id not in user.response[levelN].map((r) => r.questionId)
    //From this query find out the number of questions in database with count() function. Lets say count
    //Next, generate a random number between 0 and count - 1
    //Repeat same query as above to fetch only 1 question from offset randomNumber
    //Update the user in Mongo with this question also added to attempts. Add {questionId} into the attempts[levelN]
    //Send to the user
const showProblem=async (req,res, next)=>{
    const attemptedProblems = (getUser(req.token).attempts || []).map((a) => a.questionId)
    const totalUnseenProblems = await Problem.find({_id: {not_in: attemptedProblems}});
    const randomIndex = Math.floor(Math.random() * totalUnseenProblems);
    const nextQuestion = Problem.find({_id: {not_in: attemptedProblems}}, {_id:0, questionId: "$_id",question:1 }).limit(1).skip(randomIndex);
    user.attempts.push({questionId: nextQuestion._id});
    // .catch(error=>{
    //     res.status(400).json({
    //         error
    //     })
    // })

}

const handleResponse = () => {
    const user = getUser(req.token);
    //Check if user has attempted this questionId
    const isSeen = user.attempts.find({questionId: req.questionId});
    if (!isSeen) {
        return error
    }
    const isCorrect = isAnswerCorrect();
    User.update({_id: user._id}, {$set: {}})
}
//within array of attempts for given questionid

const isAnswerCorrect=(Problem, SubmittedAnswer)=>{
   
    var problem = Problem.findOne({_id: SubmittedAnswer.questionId}, {_id:0,question:0,level:0})
    const output = getAnswer(SubmittedAnswer);
    return problem.answer === output;
}




module.exports = {
    showProblem
}