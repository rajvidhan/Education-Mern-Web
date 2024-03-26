const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        requird:true,
        trim:true
    },
    lastName:{
        type:String,
        requird:true,
        trim:true
    },
    email:{
        type:String,
        requird:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"]
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
      
    }],
    image:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    resetpasswordExpires:{
        type:Date,
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]

});

module.exports = mongoose.model("User",userSchema)