import { IoBagAdd } from "react-icons/io5";
import RenderSteps from "./RenderSteps";
export default function AddCourse() {
  return (
    <div className="w-12/12 max-w-[1000px] py-10">
     
        <div className="flex items-center">
          <IoBagAdd className="text-richblack-600 text-[30px] mr-[10px]" />
          <h1 className="text-[30px] font-medium text-white">Add Course</h1>
        </div>
        <hr className="text-richblack-600" />

        <div className="flex ml-[175px] mt-[40px] w-full gap-x-[40px] ">
        {/* form  */}
        <div className="w-[100%]">
          <RenderSteps />
        </div>

        {/* instructions  */}
        <div className="text-white rounded-xl   border-white border-[1px] h-[384px] w-[384px] gap-[19px] p-[24px] bg-richblack-800">
          <p className="text-[18px]">⚡Course Upload Tips</p>
          <ul
            className=" w-[336px]
                            text-[14px] h-[297px] p-[10px] "
          >
            <li className="mb-[7px] ">Set the Course Price option or make it free.</li>
            <li className="mb-[7px] ">Standard size for the course thumbnail is 1024x576.</li>
            <li className="mb-[7px] ">Video section controls the course overview video.</li>
            <li className="mb-[7px] ">Course Builder is where you create & organize a course.</li>
            <li className="mb-[7px] ">
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li className="mb-[7px] ">
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li className="mb-[7px] ">Make Announcements to notify any important.</li>
            <li className="mb-[7px] ">Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
      

      
    </div>
  );
}
