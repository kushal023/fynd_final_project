const express = require('express');
const router = express.Router();
const { run } = require('./compiler.controller');
const { verifyToken } = require('../user/user.authenticate');

router.post('/:questionId/run', verifyToken, run);

module.exports = router;
