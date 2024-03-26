const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
//auth
exports.auth = async (req, res, next) => {
  try {
   

 

    //extract token first
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
  
   
 
    if (!token) {
      return res
        .json({
          success: false,
          msg: "token is not found ",
        })
        .status(200);
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

     
      req.user = decode;
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
        message: err.message,
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "something went wrong while validation of the token",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      res.json({
        success: false,
        msg: "Sorry this is a protected route for students only..",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "User Role is not matching brother  ",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      res.json({
        success: false,
        msg: "Sorry this is a protected route for Instructor only..",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "User Role is not matching brother  ",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      res.json({
        success: false,
        msg: "Sorry this is a protected route for Admin only..",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "User Role is not matching brother  ",
    });
  }
};
