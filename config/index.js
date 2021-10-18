require("dotenv").config()

module.exports={
    DB_URL:process.env.APP_DB,
    PORT:process.env.APP_PORT,
    SECRET:process.env.APP_SECRET


}