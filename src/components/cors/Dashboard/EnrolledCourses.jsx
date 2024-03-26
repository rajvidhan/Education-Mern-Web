import React, { useEffect, useState } from "react";
import { ImBooks } from "react-icons/im";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";


const EnrolledCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      console.log("mmcm",response);
      setEnrolledCourses(response);
    } catch(err){
      console.log("Not able to fetch the enrolled courses..");
    }
  };


  
console.log("enrolledcourses",enrolledCourses)



  useEffect(() => {
    getCourses();
   
  }, []);
  
  return (
    <>
      <div className=" w-11/12 max-w-[1000px] py-10">
        <div className="flex items-center">
          <ImBooks className="text-richblack-600 text-[30px] mr-[10px]" />
          <h1 className="text-[30px] font-medium text-white">
            Enrolled Courses
          </h1>
        </div>
        <hr className="text-richblack-600" />
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] text-xl w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Durations</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* cards  */}

          {enrolledCourses.map((course, index, arr) => (
            <div
              key={index}
              className={`flex items-center border border-richblack-700 ${
                index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                  {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              
              <div className="w-1/4 px-2 py-3 text-richblack-200">{course?.totalDuration}</div>

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress:{course.progressPercentage|| 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  bgColor="#2617f6"                
                  animateOnRender
                  isLabelVisible={false}                 
                />
                
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EnrolledCourses;
