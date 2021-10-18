const express = require("express")
const router = express.Router()
const multer = require("multer")
const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      cb(null, true);
    } else {
      cb("Please upload only csv file.", false);
    }
  };
  
const upload = multer({ fileFilter: csvFilter })


// const upload=require("./question.upload")
const { uploadFile } = require("./question.controller")




router.post('/uploadFile', upload.none(), uploadFile)
module.exports = router