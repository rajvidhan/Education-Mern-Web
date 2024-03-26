import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import {formatDate} from "../../../../services/formatDate";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";
import {setUser} from "../../../../slices/ProfileSlice"


const CoursesTable = ({ courses, setCourses }) => {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    

    const result1 = await deleteCourse({ courseId: courseId }, token);
    console.log("result 1 ", result1)
    if(result1){
      setUser(result1);
    }
  
    const result = await fetchInstructorCourses(token);
    if (result){
      setCourses(result);
       
    }
    setConfirmationModal(null);
    setLoading(false);    
   
  };

  return (
    <div>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium  text-richblack-100">
              COURSES
            </Th>
            <Th className="text-left text-sm font-medium  text-richblack-100">
              DURATION
            </Th>
            <Th className="text-left text-sm font-medium  text-richblack-100">
              PRICE
            </Th>
            <Th className="text-left text-sm font-medium  text-richblack-100">
              ACTIONS
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ?(
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Courses Found
              </Td>
            </Tr>
          ) : (

            courses.map((course) => (
               
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                    <p className="text-xs text-richblack-300">{course?.courseDescription}</p>
                    <p className="text-[12px] text-white">Created:{formatDate(course.createdAt)}</p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100"><HiClock size={14} />draft</p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-300">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-caribbeangreen-300 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published</p>
                    )}
                  </div>
                </Td>

                <Td className="text-sm mt-10 font-medium text-richblack-100">2hr 30min</Td>
                <Td className="text-sm mt-10 font-medium text-richblack-100">₹{course.price}</Td>
                <Td className="text-sm  mt-10 font-medium text-richblack-100 ">
                  <button disabled={loading} title="Edit" onClick={()=>{
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }}
                    className="px-2 text-xl transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                    <FaEdit />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 text-xl transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <MdDeleteSweep />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CoursesTable;
