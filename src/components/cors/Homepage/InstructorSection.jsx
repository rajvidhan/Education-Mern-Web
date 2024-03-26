import React from "react";
import instructorimage from "../../../assets/Images/Instructor.png";
import CTAButton from "../Homepage/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import HighlightText from "../Homepage/HighlightText";
const InstructorSection = () => {
  return (
    <div>
      <div className=" flex flex-row gap-20 items-center">

        <div className="w-[50%] ">
          <img src={instructorimage} alt="instructor image" className="shadow-[12px_12px_0_0] shadow-white" />
        </div>

        <div className="flex flex-col gap-10 w-[50%]">
          <div className="text-white text-4xl font-semibold  ">
            Become an <br></br>
            <HighlightText text={"instructor"} />
          </div>

          <div className="text-richblack-300 font-semibold w-[80%] text-[16px]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>

          <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex flex-row gap-1 items-center">
            Start Teaching Today
            <MdKeyboardDoubleArrowRight />
            </div>
          </CTAButton>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InstructorSection;
