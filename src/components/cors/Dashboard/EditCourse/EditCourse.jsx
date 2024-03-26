import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CgEditFade } from "react-icons/cg";
import RenderSteps from "../AddCourse/RenderSteps"
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
const EditCourse = () => {



  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

useEffect(()=>{
 const populateCourseDetails = async ()=>{
    setLoading(true);
    const result = await getFullDetailsOfCourse(courseId,token);
    
    if(result?.courseDetails){
    dispatch(setEditCourse(true));
    dispatch(setCourse(result?.courseDetails));
    }
    setLoading(false);

   
 }
 populateCourseDetails();
},[]);


  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner">Loading...</div>
      </div>
    )
  }

  return (
    <div>
             <div className="w-12/12 max-w-[1000px] py-10">
               <div className="flex items-center">
                 <CgEditFade className="text-richblack-600 text-[30px] mr-[10px]" />
                 <h1 className="text-[30px] font-medium text-white">Edit Course</h1>
               </div>
               <hr className="text-richblack-600" />
             </div>

             <div>
                {
                    course ?(<RenderSteps />) :(<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found😵‍💫</p>)
                }
             </div>
    </div>
  );
};

export default EditCourse;
