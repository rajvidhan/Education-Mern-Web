const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { convertSecondsToDuration } = require("../utils/convertSecondsToDuration")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/courseProgress")
//CREATE THE COURSE
exports.createCourse = async (req, res) => {
  try {
    //fetch the data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      tag: _tag,
      price,
      category,
      status,
      instructions: _instructions,
    } = req.body;



    //get thumbnail
    const thumbnail = req.files.thumbnailImage;
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)
    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !tag
    ) {
      return res
        .json({
          success: false,
          msg: "All fields are required ....",
        })
        .status(400);
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    //check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId,{
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res
        .json({
          success: false,
          msg: "instructor details not found brother ...",
        })
        .status(404);
    }

    //check given tag is valid or not
    const CategoryDetails = await Category.findById(category);
    
    if (!CategoryDetails) {
      return res
        .json({
          success: false,
          msg: "Category details not found brother ...",
        })
        .status(404);
    }

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
   

   
    //create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category:CategoryDetails._id,
      status: status,
      instructions: instructions,
      tag: tag,
      thumbnail: thumbnailImage.secure_url,
    });

    //add the new course to the user schema instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update the Category schema
    await Category.findByIdAndUpdate(
      { _id: CategoryDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      {
        new: true,
      }
    );
   
    //return the response
    return res
      .json({
        success: true,
        msg: "the new course is  created successfully ..brother ",
        data: newCourse,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    return res
      .json({
        success: false,
        msg: "Error in the creation of new course brother ",
      })
      .status(400);
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        instructor: true,
        thumbnail: true,
        ratingAndReviews: true,
        StudentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res
      .json({
        success: true,
        msg: "get all the courses successfully brother ..",
      })
      .status(200);
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "not fetch the all courses",
    });
  }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    console.log("hello  main yha hu ")
    //find course details
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

      console.log("course is", courseDetails)

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }


    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data:{
        courseDetails,
        totalDuration,
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//editcourse
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    // find the course
    const course = await Course.findById(courseId);

    // validation
    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
        success: false,
      });
    }

    // if thumbnail found then update it
    if (req.files) {
      console.log("thumbnail image update going on");

      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // only update that fields which was exist in the updates=
    // so
    for(const key in updates){
      // first updates se sare key elements uthaye 
      // then
      // Check if the key is an own property:  
      if(updates.hasOwnProperty(key)){
       if(key === "tag" || key === "instructions"){
        course[key] = JSON.parse(updates[key]);
       }
       else{
        course[key] = updates[key]
       }
      }
    }
    // db main entry ko saave krdo ab jo updated hai 
    await course.save()


    const updatedCourse = await Course.findOne({
      _id:courseId,
    })
    .populate({
      path:"instructor",
      populate:{
        path:"additionalDetails"
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec()


    // return response 
    return res.json({
      success:true,
      message:"course is updated successfully",
      data:updatedCourse
    }).status(200)
    
  } catch (error) {
    res
      .json({
        message: "Unable to edit the course",
        success: false,
      })
      .status(500);
  }
};


exports.getInstructorCourses = async (req,res)=>{
try{
  
  // jo authenticate user id hogi wo hi instructor id hogi 
const instructorId = req.user.id;

// find all courses beloging to the instructor 
const instructorCourses = await Course.find({
  instructor:instructorId,
}).sort({createdAt:-1});

// return the result 
res.status(200).json({
  success:true,
  message:"All courses of instructor fetch successfully",
  data:instructorCourses
})

}catch(error){
  console.log(error.message);
  res.status(500).json({
    success:false,
    message:'error in fetch the courses of instructor',
    
  })
}
} 

exports.deleteCourse = async (req,res)=>{
  try{
    const {courseId} = req.body;
    
   const course = await Course.findById(courseId);
   
   if(!course){
    return res.status(404).json({message:'course not found',success:false})
   }

  //  unroll the students ffrom this course first 
   const StudentsEnrolled = course.StudentsEnrolled
   for(const studentId of StudentsEnrolled){
    await User.findByIdAndUpdate(studentId,{
      $pull:{courses:courseId},
    })
   }

  //  delete the sections and subsections 
  const courseSections = course.courseContent
  for(const sectionId of courseSections){
    const section = await Section.findById(sectionId)
    if(section){
      const subSections = section.subSection
      for(const subSectionId of subSections){
        await SubSection.findByIdAndDelete(subSectionId)
      }
    }
    // delete the section 
    await Section.findByIdAndDelete(sectionId)
  }
 
 

   // remove the  course to the Categories
   const categoryID = course?.category;
   const categoryDetails2 = await Category.findByIdAndUpdate(
   categoryID,
    {
      $pull:{
        course: courseId,
      },
    },
    { new: true }
  )
  
  const instructorId = course.instructor;
  console.log("instruc",instructorId)
    const updateuser = await User.findByIdAndUpdate(
      instructorId,
    {
      $pull:{
        courses:courseId,
      },
    },
    { new: true }
  )
 
  
  
  


  // delete the course 
  await Course.findByIdAndDelete(courseId);

  return res.json({
    message:"course deleted",
    success:true,
    data:updateuser
  })


  }catch(error){
    console.log(error.message)
   res.json({
    success:false,
    message:"failed to delete the course"
   })
  }
}


exports.getFullCourseDetails = async (req,res)=>{
  try{

    const {courseId} = req.body
    const userId = req.user.id

    const courseDetails = await Course.findOne({
      _id:courseId
    })
    .populate({
      path:"instructor",
      populate:{
        path:"additionalDetails"
      }
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path:"courseContent",
      populate: {
        path: "subSection",
      },
    })
    .exec()


    let CourseProgressCount = await CourseProgress.findOne({
      courseId:courseId,
      userId:userId,
    });
    console.log("courseProgressCount",CourseProgressCount)


   if(!courseDetails){
    return res.json({
      success:false,
      message:"Could not find the course with id"
    }).status(400)
   }

  let totalDurationInSeconds = 0
  courseDetails.courseContent.forEach((content)=>{
    content.subSection.forEach((subSection) => {
      const timeDurationInSeconds =parseInt(subSection.timeDuration)
      totalDurationInSeconds += timeDurationInSeconds
    })
  })

  const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

  return res.status(200).json({
    success: true,
    data: {
      courseDetails,
      totalDuration,
      completedVideos: CourseProgressCount?.completedVideos
        ? CourseProgressCount?.completedVideos
        : [],
    },
  })
  }catch(error){
    console.log(error);
    res.json({
      message:"Error is occure in get full course details",
      success:false
    }).status(400)
  }
}
