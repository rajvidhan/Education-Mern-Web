import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import IconBtn from "../../../common/IconBtn";
import { MdTipsAndUpdates } from "react-icons/md";
import { changePassword } from "../../../../services/operations/SettingApi";
const Updatepassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [showOldPassword, setshowoldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    try {
      dispatch(changePassword(token, data));
      // Reset the form after successful submission
      
   
    } catch (error) {
      console.log("the error is ", error.message);
    }
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                htmlFor="oldPassword"
              >
                Current Password
              </label>
              <div className="flex items-center justify-center">
                <input
                  type={!showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  placeholder="Enter Current Password"
                  {...register("oldPassword", { required: true })}
                />
                <span
                  onClick={() => setshowoldPassword((prev) => !prev)}
                  className="absolute right-3 z-[10] cursor-pointer"
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please Enter Your Current Password
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="flex items-center justify-center ">
                <input
                  type={!showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  placeholder="Enter New Password"
                  {...register("newPassword", { required: true })}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3  z-[10] cursor-pointer"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please Enter Your New Password
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancle
          </button>
          <IconBtn
            type="submit"
           
            text="Update"
          >
            {" "}
            <MdTipsAndUpdates />
          </IconBtn>
        </div>
      </form>
    </>
  );
};

export default Updatepassword;
