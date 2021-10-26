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
  const userId = req.body.userId;

  Test.find(
    { userId: userId },
    { question: 1, _id: 0, questionId: '$_id' }
  ).exec((err, res) => {
    if (err) return console.error(err);
    else res.json(res);
  });
};

// .exec((err, company) => {
//   if (err) {
//     return res.status(500).json(err);
//   } else if (!company) {
//     return res.status(404).json();  // Only this runs.
//   }
//   return res.status(200).json(company);
// });

module.exports = {
  register,
  showProblem,
  login,
  userResponse,
};
