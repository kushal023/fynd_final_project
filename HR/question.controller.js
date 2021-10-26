const csvtojson = require('csvtojson');
const { db } = require('../db');

const uploadFile = (req, res, next) => {
  const arrayToInsert = [];

  const file = req.files.files;

  csvtojson()
    .fromString(file.data.toString())
    .then((source) => {
      // Fetching the all data from each row
      const dbConnection = db.connection;
      for (let i = 0; i < source.length; i++) {
        const oneRow = {
          question: source[i].question,
          answer: source[i].answer,
          level: source[i].level,
        };
        arrayToInsert.push(oneRow);
      } // inserting into the table "employees"
      const collectionName = 'problems';
      const collection = dbConnection.collection(collectionName);
      collection.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);

        if (result) {
          res.status(200).json({
            message: 'Import CSV into database successfully.',
          });
          console.log('Import CSV into database successfully.');
        }
      });
    });
};
module.exports = {
  uploadFile,
};
