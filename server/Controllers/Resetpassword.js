const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//resetPassword token
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req of body
    const { email } = req.body;
    // verify the user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        msg: "Your Email is not registerd with us ",
      });
    }
    // token generate
    const token = crypto.randomUUID();
    //update user by adding tken  and expire time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetpasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail contain the url
    await mailSender(
      email,
      "Password Reset Link",
      `Password reset link :${url}`
    );
    //return response
    res
      .json({
        success: true,
        msg: "Email send successfully please check the email and change password",
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "Something went wrong in reset the password ",
      })
      .status(500);
  }
};
//resetpassword
exports.resetPassword = async (req, res) => {
  try {
    console.log("jai jai shree ram");
    //data fath
    const { password, confirmpassword, token } = req.body;
    //validation
    if (password != confirmpassword) {
      return res.json({
        success: false,
        msg: "password is not matching",
      });
    }
    //getuser from the db by help  of token
    const userDetails = await User.findOne({ token: token });
    //if no entry then invalid token
    if (!userDetails) {
      return res
        .json({
          success: false,
          msg: "Token is  invalid ",
        })
        .status(200);
    }

    // check token expire time

    if (!(userDetails.resetpasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    //hash the password
    const hashpassword = await bcrypt.hash(password, 10);
    //update the password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashpassword },
      { new: true }
    );
    //return response
    res
      .json({
        success: true,
        msg: "Password is Reset successfully",
      })
      .status(200);
  } catch (err) {
    res
      .json({
        success: false,
        msg: "Something went wrong in reset the password",
      })
      .status(500);
  }
};
