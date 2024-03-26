import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoBookSharp } from "react-icons/io5";
import {fetchInstructorCourses} from "../../../services/operations/courseDetailsAPI"
import  IconBtn from "../../common/IconBtn"
import { BiBookAdd } from "react-icons/bi";
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {

const {token}= useSelector((state)=>state.auth)
const navigate = useNavigate();
const [courses,setCourses] = useState([]);
useEffect(()=>{
const InstructorCourses = async ()=>{
    const result = await fetchInstructorCourses(token);
    if(result){
        setCourses(result);
    }
}
InstructorCourses();
},[])


  return (
    <div>
    {/* heading */}
      <div className=" w-11/12 max-w-[1000px] py-10">
        <div className="flex justify-between items-center">
          <div className='flex items-center'>
          <IoBookSharp className="text-richblack-600 text-[30px] mr-[10px]" />
          <h1 className="text-[30px] font-medium text-white">
            My Courses 
          </h1>
          </div>
          <IconBtn text="Add Course" onclick={()=>navigate("/dashboard/add-course")}><BiBookAdd /></IconBtn>
        </div>
        <hr className="text-richblack-600" />
      </div>

{
    courses && <CoursesTable courses={courses} setCourses={setCourses} />
}

    </div>
  )
}

export default MyCourses
