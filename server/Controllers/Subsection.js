const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utils/convertSecondsToDuration")
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body;
    const video = req.files.video;
    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" });
    }
    console.log(video);

    // Upload the video file to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    console.log(uploadDetails);

   
      
   
  
   


    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

  


    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    console.log("Updated subsection : ", updatedSection);

    // TODO : -> log update section after adding poputate query
    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update subsection
exports.updatedSubSection = async (req, res) => {
  try {
    //fetch the data
    const { title, description, sectionId, subSectionId } = req.body;

    // find the subSection
    const subSection = await SubSection.findById(subSectionId);

    // validation
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection Not found",
      });
    }

    // value dalni hai ab
    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetailes = await await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetailes.secure_url;
      subSection.timeDuration = `${uploadDetailes.duration}`;
    }

    // save entry in db
    await subSection.save();

    // updated section
    updatedSection = await Section.findById(sectionId).populate("subSection");

    // return response
    return res.json({
      success: true,
      data: updatedSection,
      message: "sub Section updated successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "the update of subsection is going wrong brother",
      })
      .status(400);
  }
};

// delete subsection

exports.deleteSubSection = async (req, res) => {
  try {
    console.log("hello i am in delete sub section");
    const { subSectionId, sectionId } = req.body;
    console.log("subsection", subSectionId);
    console.log("section", sectionId);

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return res
        .status(400)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );
    console.log("updated section is", updatedSection);
    return res.json({
      success: true,
      data: updatedSection,
      message: "SubSection deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .json({
        success: false,
        msg: "delete the subsection is failed ",
      })
      .status(400);
  }
};
