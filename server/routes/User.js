//Import the require modules
const express = require("express");
const router = express.Router();

 // >>>>>>>>>>>>>>>>Import the require controllers 

//authentication
const {login,signUp,sendOtp,changePassword} = require("../Controllers/Auth")
//resetpassword
const {resetPasswordToken,
resetPassword
} = require("../Controllers/Resetpassword");

//>>>>>>>>>Import the middlewares 
const {auth} = require("../middlewares/auth")



//>>>>>>>>>>>>>>Routes for login , signup , and authentication

//route for user login 
router.post("/login",login);

//routes for user signup
router.post("/signup",signUp);


//route for sending the otp on usersmail id 
router.post("/sendotp",sendOtp);


//routes for changeing the password 
router.post("/changepassword",auth,changePassword);


//>>>>>>>>>>>>>>>>Reset the password..

//routes for create a reset password token
router.post("/reset-password-token",resetPasswordToken);

//route for reseting user password after the verfication
router.post("/reset-password",resetPassword);


//>>>>>>>>>>export the router for use in main application broother
module.exports = router