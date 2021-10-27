const Test = require('./compiler.model');
const fs = require('fs');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');
const { executeJava } = require('./executeJava');

//code run
const functionsByLang = {
  cpp: executeCpp,
  py: executePy,
  java: executeJava,
};

const run = async (req, res) => {
  const { questionId } = req.params;
  const { language = 'cpp', code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: 'Empty code ' });
  }
  try {
    //generate file

    const filepath = await generateFile(language, code);
    const test = await new Test({ language, filepath }).save();

    const userId = req.user?.userId;
    const answerId = test['_id'];

    //run the file and send the response
    let output;
    output = await functionsByLang[test.language](test.filepath);
    test['output'] = output;
    test['userId'] = userId;
    test['questionId'] = questionId;

    await test.save();

    return res.json({ answerId, output, userId, questionId });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  run,
};
