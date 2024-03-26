const CourseProgress = require("../models/courseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    const subSection = await SubSection.findById(subSectionId);
    console.log("subSection is ",subSection);
    if (!subSection) {
      return res
        .json({
          message: "Invalid subsection id",
          success: false,
        })
        .status(400);
    }
    

    // check for old entries
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res
        .json({
          success: false,
          message: "course progress does not exist.",
        })
        .status(404);
    } else {
      // check for re completing video or subsection
      if (courseProgress?.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          message: "subsection already completed",
          success: false,
        });
      }

      // push kr do ab

      courseProgress.completedVideos.push(subSectionId);
    }

    await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .json({
        message: error.message,
        success: false,
      })
      .status(400);
  }
};
