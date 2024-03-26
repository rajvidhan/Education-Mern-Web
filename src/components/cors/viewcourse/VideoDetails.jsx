import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";

import { FaPlay } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { markLectureComplete } from "../../../services/operations/courseDetailsAPI";
const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const videoplayerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData, courseSectionData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setvideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("video", videoData);

  useEffect(() => {
    const setInitialvideodetails = async () => {
      if (!courseSectionData.length) {
        return;
      }
      const sections = courseSectionData.length;
      console.log("section", sections);
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filterData = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        const filteredvideo = filterData?.[0].subSection.filter(
          (subSection) => subSection._id === subSectionId
        );
        setvideoData(filteredvideo[0]);
        setVideoEnded(false);
      }
    };
    setInitialvideodetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);

    if (currentSectionIndex === 0 && currentsubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentsubSectionIndex == noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const gotoNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;
    if (currentsubSectionIndex !== noOfSubSections - 1) {
      //same section ki next video main jana hai
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentsubSectionIndex + 1
        ]._id;
      //  next video pr a gye
      navigate(
        `/view-course/&{courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      // yha dekhna
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const gotopreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentsubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentsubSectionIndex !== 0) {
      // same section previous video
      const previousSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex - 1
        ];
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
      );
    } else {
      // different section last video (piche wala section ka last video dikhana pdega is condition main)
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevsubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const lastSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevsubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${previousSectionId}/sub-section/${lastSubSectionId}`
      );
    }
  };

  const handlelectureCompletion = async() => {
    // dummy code
    setLoading(true);

    const res = await markLectureComplete({
      courseId:courseId,
      subSectionId:subSectionId
    },token);

    // state update 
    if(res){
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false);
  };

  return (
    <div>
      {!videoData ? (
        <div>No data found</div>
      ) : (
        <Player
          className="relative  rounded-md"
          ref={videoplayerRef}
          aspectRatio="16:9"
          playsInline
          src={videoData?.videoUrl}
          onEnded={() => setVideoEnded(true)}
        >
          
          {/* <FaPlay /> */}
          {videoEnded && (
            <div className="flex justify-between mt-[10px] items-center">
              <div className=" gap-10 flex">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  customClasses={'bg-opacity-70 text-bold text-xl border-dotted border-2 border-richblack-5'}
                  disabled={loading}
                  onclick={() => handlelectureCompletion()}
                  text={!loading ? "Mark as Completed" : "Loading..."}
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (videoplayerRef.current) {
                    videoplayerRef.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text={"Rewatch"}
                customClasses={'bg-opacity-70 text-bold text-xl border-dotted border-2 border-richblack-5'}
              />

              </div>
              <div className="flex gap-10">
                {!isFirstVideo() && (
                  <button disabled={loading} className="bg-opacity-70 items-center gap-2 flex bg-black text-white py-2 px-1 rounded-xl text-bold text-xl border-dotted border-2 border-richblack-5" onClick={gotopreviousVideo}>
                   <GrChapterPrevious/> <span>Prev</span> 
                  </button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading}
                  className="bg-opacity-70 items-center gap-2 flex bg-black text-white py-2 px-1 rounded-xl text-bold text-xl border-dotted border-2 border-richblack-5"
                  onClick={gotoNextVideo}>
                    Next <GrChapterNext />
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
      <div className="my-[60px] p-4">
        <span className="text-md text-richblack-100">Video Title</span>
        <h1 className="text-3xl text-richblack-5 font-semibold">
          {videoData?.title}
        </h1>
        <span className="text-md text-richblack-100">Description</span>
        <p className="text-xl text-richblack-5 font-semibold">
          {videoData.description}
        </p>
      </div>
    </div>
  );
};

export default VideoDetails;
