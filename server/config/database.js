const mongoose = require("mongoose");
require("dotenv").config();
exports.connectwithDB = ()=>{
    mongoose.connect(process.env.mongo_URL)
    .then(()=>{
        console.log("mongodb  is connected successfully raj brother 💃..")
    })
    .catch((err)=>{
        console.log("db connection failed")
        console.log(err);
    })
}

