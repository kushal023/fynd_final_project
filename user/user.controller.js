const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const DB = require('../db');
const Problem = require('../HR/question.model');
const Test = require('../testing/compiler.model');

//Register
const registerUser = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      password: hashedPass,
    });
    user
      .save()
      .then((data) => {
        res.status(200).json({
          message: 'User Added Successfully!',
        });
      })
      .catch((error) => {
        console.log(error, 'err');
        res.status(400).json({
          message: 'An errror occured',
        });
      });
  });
};

const register = async (req, res, next) => {
  var email = req.body.email;
  var phone = req.body.phone;
  const user = await User.findOne({ $or: [{ email }, { phone }] });
  if (user?.email === req.body.email) {
    res.json({
      message:
        'A user with this email has already registered. Please use a different email..',
    });
  } else if (user?.phone === req.body.phone) {
    res.json({
      message:
        'A user with this phone no has already registered. Please use a different phone number..',
    });
  } else {
    await registerUser(req, res);
  }
};

//login
const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, async function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }

          if (result) {
            var token = await user.signToken();
            console.log(token, 'awaiting');
            return res.status(201).json({ user: user.userJSON(token) });
          } else {
            res.status(401).json({
              message: 'Password does not matched!',
            });
          }
        });
      } else {
        res.status(404).json({
          message: 'No User Found!',
        });
      }
    }
  );
};

//Show Problem
const showProblem = async (req, res, next) => {
  //const attemptedProblems = (getUser(req.token).attempts || []).map((a) => a.questionId)

  Problem.find({}, { question: 1, _id: 0, questionId: '$_id' })
    .limit(1)
    .skip(Math.random() * 10)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
//Show all response of user
const userResponse = async (req, res, next) => {
  console.log(req, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const userId = req.body.userId;

  Test.findById(userId, { _id: 0, output: '$output' })
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: `User with id: ${req.body.userId} not found`,
      });
    });
};

//{_id:{$nin:attemptedProblems}

// const totalUnseenProblems = await Problem.find({_id: {not_in: attemptedProblems}});
// const randomIndex = Math.floor(Math.random() * totalUnseenProblems);
// const nextQuestion = Problem.find({_id: {not_in: attemptedProblems}}, {_id:0, questionId: "$_id",question:1 }).limit(1).skip(randomIndex);
// user.attempts.push({questionId: nextQuestion._id});

// const handleResponse = (req) => {

//     const user = getUser(req.token);
//     //Check if user has attempted this questionId
//     const isSeen = user.attempts.find({questionId: req.questionId});
//     if (!isSeen) {
//         return error
//     }
//     User.update({_id: user._id}, {$set: {}})
// }

// const isAnswerCorrect=(Problem, SubmittedAnswer)=>{

//     var problem = Problem.findOne({_id: SubmittedAnswer.questionId}, {_id:0,question:0,level:0})
//     const output = getAnswer(SubmittedAnswer);
//     return problem.answer === output;
// }

module.exports = {
  register,
  showProblem,
  login,
  userResponse,
};
