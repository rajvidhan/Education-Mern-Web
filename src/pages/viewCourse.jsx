import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/cors/viewcourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/cors/viewcourse/CourseReviewModal";

const ViewCourse = () => {


  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  useEffect(() => {
    const setCourseallDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };

    setCourseallDetails();
  }, []);

  return (
    <>
      <div className="relavite flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        

        <div className="w-[90%] h-auto overflow-auto">
          <div className="p-3 w-[85%]">
            <Outlet />
          </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    
   
      
    </>
  );
};

export default ViewCourse;
