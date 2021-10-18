const mongoose = require("mongoose")
const db = {};
const init = async (dbConnectionStr) => {
    const connection = mongoose.connection
    connection.on("error", (error) => {
        console.error(error)
        def.reject(error)
    })
    connection.once("open", () => {
        console.log("Database connection established!")
    })
    const promise = new Promise((resolve, reject)=> {
        mongoose.connect(dbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true },)
        .then(() => {
            console.log('DB Connected!');
            db.connection = connection;
            resolve(connection);
            // db = client.db();
        }).catch(err => {
            reject(error)
            console.log(`DB Connection Error: ${err.message}`);
        });
    });
   
    return promise;
}
module.exports = {
    db,
    init
}