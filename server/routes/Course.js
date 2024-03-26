const express = require("express");
const router = express.Router();

// >>>>>>Import the require controllers brother 
const {getCourseDetails,editCourse,getAllCourses,createCourse, getInstructorCourses, deleteCourse, getFullCourseDetails} = require("../Controllers/Course")
const {createCategory,showAllCategories,categoryPageDetails} = require("../Controllers/category")
const {createSection,updateSection,deleteSection } = require("../Controllers/Section")
const {createSubSection,updatedSubSection,deleteSubSection } = require("../Controllers/Subsection")
const {createRating,getAverageRating ,getAllRatingAndReview} = require("../Controllers/ratingAndReview")


//>>>>>>>>>>>Import the  all middlewares brother 
const {auth,isStudent,isAdmin,isInstructor } = require("../middlewares/auth")
const {updateCourseProgress} = require("../Controllers/courseProgress")
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COURSE ROUTES

router.post("/getCoursedetails",getCourseDetails);
router.get("/getallcourse",getAllCourses);
router.post("/createcourse",auth,isInstructor,createCourse);
router.post("/createsection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updatedSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.delete("/deleteCourse", deleteCourse)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
//>>>>>>>>>>>>>>>>>>>CATEGORY ROUTES 
router.post("/createCategory",createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);

//>>>>>>>>>>>>>>>>>>RATING AND REVIEWS 
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRatingAndReview",getAllRatingAndReview);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
module.exports = router





