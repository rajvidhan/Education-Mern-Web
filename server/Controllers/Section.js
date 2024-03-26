const Section = require("../models/Section")
const Course = require("../models/Course")
const SubSection = require("../models/SubSection");


exports.createSection = async (req,res) =>{
    try{
         //data fetch
         const {sectionName,courseId} = req.body;
         //data validation
         if(!sectionName || !courseId){
   return res.json({
    success:false,
    msg:"All fields are require "
   })
         }
         
         //create section
         const newSection = await Section.create({sectionName})
         //update the course
         const updatedCourseDetails =await Course.findByIdAndUpdate(
            courseId,{
            $push:{
                courseContent:newSection._id,
            }
         },{new:true})
         .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
         //response return 
         return res.json({
            success:true,
            msg:"new section is created successfully brother ..",
            data:updatedCourseDetails
         }).status(200)
         
    }catch(err){
        console.log(err);
          return res.json({
            success:false,
           
            msg:"something went wrong in create a section brother"
          }).status(400);
    }
}


exports.updateSection = async (req,res)=>{
    try{
        console.log("i am in section update")
        //data
        const {sectionName,sectionId,courseId}  = req.body;

        //data validation
        if(!sectionName ||  !sectionId){
            res.json({
                success:false,
                msg:"All fields are require "
               })
        }
        //update the data
        const section = await Section.findByIdAndUpdate(sectionId,
            {
                sectionName
            },{new:true})

            // find the course to return 
            const course = await Course.findById(courseId)
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            })
            .exec();
    console.log(course);
        //return response 
        res.json({
            success:true,
            msg:"section is updated successfully brother ..",
            data:course
         }).status(200)
    }catch(err){
        res.json({
            success:false,
            msg:"something went wrong in update a section brother"
          }).status(400);
    }
}



exports.deleteSection = async (req,res) =>{
    try{
        const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
    }catch(err){
        console.log(err);
        return res.json({
            success:false,
            msg:"something went wrong in delete a section brother"
          }).status(400);
    }
}