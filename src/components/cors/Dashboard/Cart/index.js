import React from "react";
import { FaCartFlatbed } from "react-icons/fa6";
import { useSelector } from "react-redux";
import RendercartCourses from "./RendercartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
export default function Cart(){

    const {total, totalItems} = useSelector((state)=>state.cart);

return (
   <div className="text-white">
    <div className=" w-11/12 max-w-[1000px] py-10">
        <div className="flex items-center">
          <FaCartFlatbed className="text-richblack-600 text-[30px] mr-[10px]" />
          <h1 className="text-[30px] font-medium text-white">
           My Wishlist 
          </h1>
        </div>
        <hr className="text-richblack-600" />
      </div>
      {
        total > 0 ?(

            <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
              
                <RendercartCourses />
                <RenderTotalAmount />
            </div>
            
         ):(<p className="mt-14 text-center text-3xl text-richblack-100">Your Cart Is Empty</p>) 
       } 
   </div>
)



} 