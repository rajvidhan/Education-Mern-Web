import React from "react";
import { toast } from "react-hot-toast"
import { FaShareSquare } from "react-icons/fa"
import copy from "copy-to-clipboard"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ACCOUNT_TYPE } from "../../../utils/constants"



const CoursedetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
        toast.error("You are an Instructor. You can't buy a course.")
        return
      }
    if(token){
        dispatch(addToCart(course))
        return
    }
    setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add To Cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })

  };


const handleshare =()=>{
    copy(window.location.href)
    toast.success("Link copied to clipboard")
}

  return (
    <>
      <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
        {/* image */}

        <img
          src={course.thumbnail}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <p className="space-x-3 pb-4 text-3xl font-semibold">
            Rs.{course.price}
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={
                user && course?.StudentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
              className="flex items-center justify-center text-richblack-900 font-bold cursor-pointer rounded-md py-3 px-5  bg-yellow-50"
            >
              {user && course?.StudentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.StudentsEnrolled.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center text-white cursor-pointer rounded-md py-3 px-5  bg-richblack-800"
              >
                Add to Cart{" "}
              </button>
            )}
          </div>

          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
            <p className="my-2 text-xl font-semibold">This Course Includes :</p>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {/* instructions  */}
            {course?.instructions?.map((instruction, index) => (
              <div className="flex items-center gap-x-2">
                <BsFillCaretRightFill />
                <p className="flex gap-2" key={index}>
                  {instruction}
                </p>
              </div>
            ))}
          </div>
          </div>

      {/* share button  */}
      <div className="text-center">
        <button
        onClick={handleshare}
        className="flex items-center gap-2 py-6 text-yellow-100 mx-auto">
        <FaShareSquare size={15} /> Share
        </button>

      </div>

        </div>
      </div>
    </>
  );
};

export default CoursedetailsCard;
