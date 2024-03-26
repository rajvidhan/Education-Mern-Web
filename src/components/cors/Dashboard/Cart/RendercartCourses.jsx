import React, { useState } from "react";
import { FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { removeFromCart } from "../../../../slices/CartSlice";
import GetAvgRating from "../../../../utils/avgRating";
import { useNavigate } from "react-router-dom";



const RendercartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();




  return (
    <div className="flex flex-1 flex-col cursor-pointer" >
    <hr className="text-richblack-500"></hr>
      {
      
      cart.map((course, index) => (
        <div key={index} className="flex mt-6 w-full flex-wrap items-start justify-between gap-6  ">
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img src={course?.thumbnail} 
            className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-white">{course?.courseName}</p>
              <p className="text-sm text-richblack-300">{course?.category?.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{GetAvgRating(course?.ratingAndReviews)}</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">{course?.ratingAndReviews.length} Ratings</span>
              </div>
            </div>
          </div>

          <di className="flex flex-col items-end space-y-2"v>
            <button 
            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
            onClick={()=>dispatch(removeFromCart(course._id))}>
              <FiTrash2 />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course?.price}</p>
          </di>
        </div>
      ))
      }
       <hr className="text-richblack-500 mt-[30px]"></hr>
    </div>
  );
};

export default RendercartCourses;
