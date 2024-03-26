import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";
const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getdahsboardData = async () => {
      setLoading(true);

      const InstructorApiData = await getInstructorData(token);
      const InstructorCourses = await fetchInstructorCourses(token);

      if (InstructorApiData.length) {
        setInstructorData(InstructorApiData);
      }
      if (InstructorCourses) {
        setCourses(InstructorCourses);
      }
      setLoading(false);
    };
    getdahsboardData();
  }, []);
  console.log(instructorData);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudent = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentEnrolled,
    0
  );

  return (
    <div className="text-white mt-10 ">
      <div>
        <h1 className="text-2xl font-bold">Hi {user.firstName} 👋</h1>
        <p className="text-richblack-500">Let's start somthing new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div>
            <div className="flex gap-7 justify-between">
              <InstructorChart courses={instructorData}/>
              <div className="bg-richblack-800 gap-7  rounded-xl  p-6  flex flex-col ">
                <p className="text-white text-lg">Staistics</p>
                <div className="flex  flex-col">
                  <p className="text-richblack-600 text-2xl">Total Courses</p>
                  <p className="text-richblack-5 text-[25px]">{courses.length}</p>
                </div>
                <div>
                  <p className="text-richblack-600 text-2xl">Total Students</p>
                  <p className="text-richblack-5 text-[25px]">{totalStudent}</p>
                </div>

                <div>
                  <p className="text-richblack-600 text-2xl">Total Income</p>
                  <p className="text-richblack-5 text-[25px]">Rs.{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

        {/* courses section  */}
        <div className="bg-richblack-800 rounded-xl p-5 mt-4">
            <div className="flex justify-between">
                <p className="text-2xl font-bold">Your Courses</p>
                <Link to='/dashboard/my-courses'>
                    <p className="text-yellow-50">View all</p>
                </Link>
            </div>
            <div className=" flex gap-4 my-4">
                {
                    courses.slice(0,3).map((course,index)=>(
                        <div key={index}>
                             <img src={course.thumbnail} className="h-[250px] w-full rounded-xl object-cover" />
                             <div>
                                <p className="text-xl text-richblack-400">{course.courseName}</p>
                               <div className="flex gap-3 text-richblack-200">
                                <p>Students {course.StudentsEnrolled.length}</p>
                                <p>|</p>
                                <p>Price Rs{course.price}</p>
                               </div>
                             </div>
                        </div>
                    ))
                }
            </div>
        </div>
            

        </div>
      ) : (
        <div className="flex flex-col gap-6">
            <p className="text-2xl text-richblack-50">You have not created any courses yet</p>
            <Link className="text-yellow-50" to='/dashboard/add-course'>
            Create A Course</Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
