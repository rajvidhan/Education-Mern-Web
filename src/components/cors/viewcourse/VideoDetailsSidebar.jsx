import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import { MdOutlinePreview } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeflag, setactiveFlag] = useState("");
  const [isdrop, setdrop] = useState(true);
  const [videoActiveFlag, setVideoActiveFlag] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
   const initialsetup = () => {
      if (!courseSectionData) {
        return;
      }

      // findIndex method is use to find an index of an object (it use for first render highlighting )
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex
        ]?._id;

      // set the current section here
      setactiveFlag(courseSectionData[currentSectionIndex]?._id);
      // set sub section
      setVideoActiveFlag(activeSubSectionId);
    }
    initialsetup();
  }, [courseSectionData, courseEntireData, location.pathname]);


   const handleaddclick = ()=>{
      setReviewModal(true)
   }


  return (
    <div
      className="flex  p-4 flex-col min-w-[300px] border-r-[1px] border-r-richblack-700 
    bg-richblack-800 py-10 "
    >
      {/* for buttonss */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="text-richblack-400 text-xl"
        >
          <FaBackward />
        </button>

        <IconBtn onclick={()=>handleaddclick()} text={"Add Review"}>
          <MdOutlinePreview className="text-xl" />
        </IconBtn>
      </div>

      <div className="my-5 border-[0.5px] text-richblack-600" />

      {/* for heading */}
      <div>
        <div className="flex justify-between items-center ">
          <span className="text-xl items-center text-richblack-5">
            {courseEntireData?.courseName}
          </span>
          <span className="items-center text-xl text-richblack-50">
            {completedLectures?.length}/{totalNoOfLectures}
          </span>
        </div>
      </div>
      <div className="my-5 border-[0.5px] text-richblack-600" />

      {/* sectin subsection and video wala main part
       */}
    <div>
                {
                    courseSectionData.map((course, index)=> (
                        <div
                        onClick={() => setactiveFlag(course?._id)}
                        key={index}
                        >

                            {/* section */}

                            <div  className="bg-richblack-600 cursor-pointer  flex items-center justify-between text-richblack-5 p-4 text-xl rounded-lg border-b-2 border-b-richblack-5">
                                <div>
                                    {course?.sectionName}
                                </div>
                                {
                                  activeflag ?(
                                    <IoMdArrowDropup />
                                  ):(
                                    <IoMdArrowDropdown />
                                  )
                                }
                            </div>

                            {/* subSections */}
                            <div>
                                {
                                    activeflag === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic, index) => (
                                                    <div
                                                    className={`flex gap-5 p-3 cursor-pointer  ${
                                                      videoActiveFlag === topic._id
                                                        ? "bg-yellow-200 text-richblack-900 font-bold"
                                                        : "bg-richblack-900 text-white font-bold bg-opacity-60"
                                                    } rounded-2xl `}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                        )
                                                        setVideoActiveFlag(topic?._id);
                                                    }}
                                                    >
                                                        <input
                                                        type='checkbox'
                                                        checked= {completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
    </div>
  );
};

export default VideoDetailsSidebar;
