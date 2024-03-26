const Profile = require("../models/Profile");
const User = require("../models/User");
const CourseProgress = require("../models/courseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");
const {
  convertSecondsToDuration,
} = require("../utils/convertSecondsToDuration");
exports.updateProfile = async (req, res) => {
  try {
    //fetch the id
    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    //userid
    const id = req.user.id;

    //validation
    if (!gender || !contactNumber || !id) {
      res.json({
        success: false,
        msg: "All fields are required ...",
      });
    }
    //find the profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    // updated user isko bhejna hai front end main
    const user = await User.findById({ _id: id }).populate("additionalDetails");

    //return res
    return res
      .json({
        success: true,
        msg: "profile updated successfully brother ...",
        user,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "Error in updation of profile..",
      })
      .status(400);
  }
};

//deleteaccount function
//how can we schedual  this delete opration
exports.deleteAccount = async (req, res) => {
  try {
    //getId
    const id = req.user.id;

    //validation
    const userDetail = await User.findById(id);
    if (!userDetail) {
      return res.json({
        msg: "user nott found",
        success: false,
      });
    }
    //update the course schema
    const { courseID } = userDetail.courses;
    await Course.findByIdAndUpdate(
      courseID,
      {
        $pull: {
          StudentsEnrolled: id,
        },
      },
      { new: true }
    );
    //delete the profile first
    await Profile.findByIdAndDelete({ _id: userDetail.additionalDetails });
    //search the id and delete the user
    await User.findByIdAndDelete({ _id: id });
    // return response

    return res
      .json({
        success: true,
        msg: "the user account deleted successfully brother ",
      })
      .status(200);
  } catch (err) {
    return res
      .json({
        success: false,
        msg: "the user account is not deleted ",
      })
      .status(500);
  }
};

//grt all users details
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userdetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res
      .json({
        success: true,
        msg: "get  user all details successfully brother",
        userdetails,
      })
      .status(200);
  } catch (err) {
    res.json({
      success: false,
      msg: "error in get the all details ",
    });
  }
};

//handler for get the all enrolled courses by the user
exports.getEnrolledCourses = async (req, res) => {
  try {
    //get user id....
    const userId = req.user.id;

    //get userdetails and populate the courses section
    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
   
 
    
    
    userDetails = userDetails.toObject();
    console.log("userDetails.courses[i]",userDetails.courses[0])
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseId: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
    
    //validation
    if (!userDetails){
      return res
        .json({
          success: false,
          msg: "could not find the user with the help of user id",
        })
        .status(404);
    }

    //return response
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//handler function for updatedisplaypicture
exports.updateDisplayPicture = async (req, res) => {
  try {
    console.log("hello i am in backend");

    //fetch the user id and image from req of body
    const userId = req.user.id;

    const displayPicture = req.files.displayPicture;

    //upload image to cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    console.log("image", image);
    //update the users image section
    const updateprofile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    //send the response
    return res.json({
      success: true,
      msg: "Image update successfully...",
      data: updateprofile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "error in upate of the image ",
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentEnrolled = course.StudentsEnrolled.length;

      const totalAmountGenerated = totalStudentEnrolled * course.price;

      //  create an object with the additoinal fields ..by this we collect the all data

      const courseDataWithStates = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalAmountGenerated,
        totalStudentEnrolled,
      };

      return courseDataWithStates;
    });

    res
      .json({
        success: true,
        courses: courseData,
      })
      .status(200);
  } catch (error) {
    console.log(error.message);
    return res
      .json({
        message: "error in fatch the data for instructor dashboard",
        success: false,
      })
      .status(400);
  }
};
