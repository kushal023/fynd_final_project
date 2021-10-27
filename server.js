const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const User = require('./user/user.model');

const dotenv = require('dotenv');
dotenv.config();

const QuestionRoute = require('./HR/question.route');
const UserRoute = require('./user/user.route');
const CompilerRoute = require('./testing/compiler.route');
const { DB_URL, PORT } = require('./config');

const server = express();
server.use(fileUpload());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
const DB = require('./db');

DB.init(DB_URL).then((db) => {
  server.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`);
  });
  server.use('/hr', QuestionRoute);
  server.use('/user', UserRoute);
  server.use('/test', CompilerRoute);
});
