import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoPersonSharp } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/Dateformatter"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();


 
  
  return (
    <div className=" w-11/12 max-w-[1000px] py-10">
      <div className="flex items-center">
        <IoPersonSharp className="text-richblack-600 text-[30px] mr-[10px]" />
        <h1 className="text-[30px] font-medium text-white">My Profile</h1>
      </div>
      <hr className="text-richblack-600" />

      <div className="ml-[175px] w-full">
        {/* section1  */}
        <div className="flex border-richblack-600 border-[1px] mt-[70px] rounded-xl items-center justify-between bg-richblack-800 p-[30px]">
          <div className="flex gap-x-[30px] ">
            <img
              src={user?.image}
              alt={`profile-${user.firstName}`}
              className="aspect-square w-[88px] rounded-full object-cover"
            />
            <div className="flex flex-col ">
              <p className="text-[35px]  text-white">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-[20px] text-richblack-300">{user?.email}</p>
            </div>
          </div>

          <div className="p-[10px]">
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            > <RiEditBoxLine /></IconBtn>
          </div>
        </div>

        {/* section 2  */}

        <div className="flex border-richblack-600 border-[1px] flex-col mt-[50px] rounded-xl   bg-richblack-800 p-[30px]">
          <div className="flex justify-between">
            <p className={`${user?.additionalDetails?.about ? "text-richblack-600":"text-white"} text-[25px]`}  >About</p>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
            > <RiEditBoxLine /> </IconBtn>
          </div>
          <p className={`${user?.additionalDetails?.about ? "text-white":"text-richblack-300"} mt-[15px] text-[20px]`} >
            {user?.additionalDetails?.about ?? "Write something about yourself"}
          </p>
        </div>

        {/* section 3  */}

        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-[25px]  text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-[20px] text-richblack-600">First Name</p>
              <p className="text-[20px] font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-[20px] text-richblack-600">Email</p>
              <p className="text-[20px] font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-[20px] text-richblack-600">Gender</p>
              <p className="text-[20px] font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
                
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-[20px] text-richblack-600">Last Name</p>
              <p className="text-[20px] font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-[20px] text-richblack-600">Phone Number</p>
              <p className="text-[20px] font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-[20px] text-richblack-600">Date Of Birth</p>
              <p className="text-[20px] font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MyProfile;
