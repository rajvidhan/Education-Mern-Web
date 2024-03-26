const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//create rating
exports.createRating = async (req, res) => {
  try {
    console.log("hello vidan");
    // get user id
    const userId = req.user.id;

    //fetch data from req ki body
    const { courseId, review, rating } = req.body;
    //validation that user is enrolled or not

    const course = await Course.findById({ _id: courseId });
    if (!course.StudentsEnrolled.includes(userId)) {
      res
        .json({
          success: false,
          msg: "the user is not found brother ",
        })
        .status(404);
    }
    //check  if user is already reviewd the course
    //here
    if (course.ratingAndReviews.userId) {
      res
        .json({
          success: false,
          msg: "the user is already reviewed the course brother",
        })
        .status(500);
    }
    //creae rating review
    const ratingReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });
    //update the course model
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedCourseDetails);

    //response send
    return res
      .json({
        success: true,
        msg: "Rating and review is successfully  created",
        ratingReview,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "something went wrong in creation of rating and review",
      })
      .status(400);
  }
};

//get average rating
exports.getAverageRating = async (req, res) => {
  try {
    //get course id
    const { courseId } = req.body.courseId;

    //calculate avg rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    //return rating
    if (result.length > 0) {
      return res
        .json({
          success: true,
          msg: "",
          averageRating: result[0].averageRating,
        })
        .status(200);
    }
    //if no rating exist
    return res
      .json({
        success: false,
        msg: "avrage rating is zeor so no rating is given ",
        averageRating: 0,
      })
      .status(404);
  } catch (err) {}
};

//get all rating
exports.getAllRatingAndReview = async (req, res) => {
  try {
    console.log("hello hello");
    const allReview = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
     
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data:allReview,
    });
  }catch(err){
    console.log(err);
    return res
      .json({
        success: false,
        msg: "error in get the all rating and review brother ",
      })
      .status(400);
  }
};
