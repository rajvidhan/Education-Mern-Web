import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {  useForm } from "react-hook-form";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { HiCurrencyRupee } from "react-icons/hi2";
import { addCourseDetails, editCourseDetails, fetchCoursecategories } from "../../../../../services/operations/courseDetailsAPI";
import RequireMentFeildentFeild from "./RequireMentFeild";
import Uploadthumbnail from "./Uploadthumbnail";
import {COURSE_STATUS}  from "../../../../../utils/constants"
import { setStep,setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import TagInput from "./TagInput";


const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
 
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setloading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  // get all the categories form front 
  useEffect(() => {
    const getCategories = async () => {
      setloading(true);
      const categories = await fetchCoursecategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setloading(false);
    };


    // if form is in edit mode 
    if (editCourse) {
      setValue("courseTitle",course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  // check the from s updated or not 
  const isFormUpdated = () => {
    const currentValues = getValues();
    if(currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
      )
       return true
    else
    return false
  };

  // handle next button click 
  const onSubmit = async (data) => {
   
    if(editCourse){
         
      if(isFormUpdated()){
      const currentValues = getValues();
      
      const formData = new FormData();
      formData.append("courseId",course._id);
      // agr ye true hai iska mtlb value jo hai wo updated hai 
      if(currentValues.courseTitle !== course.courseName){
        formData.append("courseName", data.courseTitle)
      }
      if(currentValues.courseShortDesc !== course.courseDescription){
        formData.append("courseDescription", data.courseShortDesc)
      }
      if(currentValues.coursePrice !== course.price){
        formData.append("price", data.coursePrice)
      }
      if(currentValues.courseBenefits !== course.whatYouWillLearn) {
        formData.append("whatYouWillLearn", data.courseBenefits)
      }
      if (
        currentValues.courseRequirements.toString() !==
        course.instructions.toString()
      ) {
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        )
      }
      if (currentValues.courseCategory._id !== course.category._id) {
        formData.append("category", data.courseCategory)
      }
      if(currentValues.courseImage !== course.thumbnail){
        formData.append("thumbnailImage",data.courseImage)
      }
      if (currentValues.courseTags.toString() !== course.tag.toString()) {
        formData.append("tag", JSON.stringify(data.courseTags))
      }
      
      
      
       setloading(true)
       const result = await  editCourseDetails(formData,token)
       setloading(false)

       if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))
       }
      }
      else{
        toast.error('No change made in form')
      }
      return 
    }
   
    // now create a course 
   const formData = new FormData();
   formData.append("courseName",data.courseTitle);
   formData.append("courseDescription",data.courseShortDesc);
   formData.append("price",data.coursePrice);
   formData.append("whatYouWillLearn", data.courseBenefits);
   formData.append("instructions",JSON.stringify(data.courseRequirements));
   formData.append("category",data.courseCategory);
   formData.append("status",COURSE_STATUS.DRAFT);
   formData.append("thumbnailImage",data.courseImage);
   formData.append("tag",JSON.stringify(data.courseTags))


    
  // call the api 
  setloading(true);

  
  const result  = await addCourseDetails(formData,token)
  if(result){
    dispatch(setStep(2))  
    dispatch(setCourse(result));
    
  }
  setloading(false)
  };

  return (
  
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md mt-[50px] text-white border-richblack-700 bg-richblack-800 p-6 space-y-8"
      >
        <div>
          <label
            htmlFor="courseTitle"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
          />

          {errors.courseTitle && <span>Course Title is Reuired </span>}
        </div>
        {/* for course description  */}
        <div>
          <label
            htmlFor="courseShortDesc"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Course Short Description<sup className="text-pink-200">*</sup>
          </label>
          <textarea
            type="text"
            id="courseShortDesc"
            placeholder="Enter Course Description"
            {...register("courseShortDesc", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-600 py-4 px-6 text-richblack-5"
          />
          {errors.courseShortDesc && (
            <span>Course Description is Reuired** </span>
          )}
        </div>
        {/* price  */}
        <div className="relative">
          <label
            htmlFor="coursePrice"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-600 py-[12px] px-[35px] text-richblack-5"
          />
          <HiCurrencyRupee className="absolute  left-[6px] top-1/2 text-[25px] text-richblack-5" />
          {errors.coursePrice && <span>Course price is Reuired**</span>}
        </div>
        {/* categery */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="courseCategory"
            className="mb-1 w-[50%] text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            className="w-full rounded-[0.5rem] bg-richblack-600 py-[12px] px-[35px] text-richblack-5"
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required**</span>}
        </div>

        {/* tags  */}
        <TagInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />
        {/* upload thumbnail  */}
        <Uploadthumbnail
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail :null}
        />

        {/* benefits of the course  */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className=" rounded-[0.5rem] bg-richblack-600 py-[12px] px-[35px] text-richblack-5 resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

        {/* RequirementField  */}
        <RequireMentFeildentFeild
          name="courseRequirements"
          placeholder="Enter Requirements/Instructions"
          label="Requirements/Instructions"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
  {/* Next button  */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Without Saving
            </button>
          )}
          <IconBtn disabled={loading}  text={!editCourse ? "Next" : "Save Change"} ><MdNavigateNext /></IconBtn>
        </div>
      </form>
  
  );
};

export default CourseInformationForm;
