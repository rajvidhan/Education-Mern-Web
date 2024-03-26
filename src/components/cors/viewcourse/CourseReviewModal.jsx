import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
const CourseReviewModal = ({ setReviewModal }) => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // first render pr jo values dikhegi yani intial values ko set kr lete hai phle
  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  },[]);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        review: data.courseExperience,
        rating: data.courseRating,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className='fixed    z-[1000] inset-0 !mt-0 bg-white bg-opacity-10 flex items-center overflow-auto justify-center backdrop-blur-sm  '>
     <div >
        {/* modal header  */}
        <div className="flex border-b-2 border-b-richblack-50 rounded-xl text-richblack-5 justify-between px-5 py-4 bg-richblack-700">
          <p className="text-xl" >Add Review </p>
          <button onClick={()=>setReviewModal(false)}>
            <ImCross />
          </button>
        </div>

        {/* modal body  */}
        <div className="bg-richblack-800 p-9 rounded-xl">
          <div className="flex gap-3 items-center justify-center">
            <img
              src={user.image}
              className="aspect-squre w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="text-richblack-5">
              <p className="text-xl">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-50">Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-y-7 flex-col mt-6"
          >
            {/* stars  */}
            <ReactStars
              activeColor="#ffd700"
              count={5}
              onChange={ratingChanged}
              size={35}
            
            />

            <div className="gap-3">
              <label className="text-richblack-5 " htmlFor="courseExperience">
                Add Your Experience <span className="text-pink-100">*</span>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add your Experience here"
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span>Please Add Your Experience</span>
              )}
            </div>

            {/* buttons */}
            <div className="flex gap-x-10">
              <button className=" bg-richblack-600 font-bold text-richblack-5 bg-opacity-40 rounded-md py-3 px-5" onClick={()=>setReviewModal(false)}>
                Cancle
              </button>
              <IconBtn customClasses={''} text={"Save"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
