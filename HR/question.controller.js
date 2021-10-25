const csvtojson = require("csvtojson")
const db = require('../db').db;
const uploadFile=(req, res, next)=>{
    var arrayToInsert = [];
    
    console.log({f: req.files })

    const file = req.files.files;
   

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
            console.log(arrayToInsert,"insertxxxxxxxxxxxxxxxx") 
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