const csvtojson = require("csvtojson")
const db = require('../db').db;
const uploadFile=(req, res, next)=>{
    var arrayToInsert = [];
    
    const file = req.files.file;

    csvtojson().fromString(file.data.toString()).then(source => {
        // Fetching the all data from each row
        const dbConnection = db.connection;
        for (var i = 0; i < source.length; i++) {
             var oneRow = {
                question: source[i]["question"],
                answer: source[i]["answer"],
                level: source[i]["level"]
             };
             arrayToInsert.push(oneRow);
         }     //inserting into the table "employees"
         var collectionName = 'problems';
         var collection = dbConnection.collection(collectionName);
         collection.insertMany(arrayToInsert, (err, result) => {
             if (err) console.log(err);
             if(result){
                 console.log("Import CSV into database successfully.");
             }
         });
    });



}
module.exports = {
    uploadFile
}