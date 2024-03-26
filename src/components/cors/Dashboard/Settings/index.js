import ChangeProfile from "./ChangeProfile";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import Updatepassword from "./Updatepassword";
import { IoSettings } from "react-icons/io5";
export default function Settings() {
  return (
    <>
      <div className=" w-11/12 max-w-[1000px] py-10">
        <div className="flex items-center">
          <IoSettings className="text-richblack-600 text-[30px] mr-[10px]" />
          <h1 className="text-[30px] font-medium text-white">
            Setting
          </h1>
        </div>
        <hr className="text-richblack-600" />
      </div>
      {/* change profile picture  */}
      <ChangeProfile />
       
       {/* edit profile  */}
       <EditProfile />

       {/* update the password  */}
       <Updatepassword />

       {/* delete account  */}
       <DeleteAccount />


    </>
  );
}
