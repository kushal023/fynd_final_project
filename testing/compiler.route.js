const express = require('express');
const router = express.Router();
const { allOutput, singleOutput, run } = require('./compiler.controller');
const { authenticate, verifyToken } = require('../user/user.authenticate');

router.get('/allOutput', allOutput);
router.get('/singleOutput', singleOutput);
router.post('/:questionId/run', verifyToken, run);

module.exports = router;
