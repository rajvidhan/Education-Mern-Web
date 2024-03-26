import React, { useEffect, useState } from "react";
import { buyCourse } from "../services/operations/studentFeaturesApis";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import { ACCOUNT_TYPE } from "../utils/constants"
import Footer from "../components/common/Footer";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { TiWorld } from "react-icons/ti";
import { MdOutlineWatchLater } from "react-icons/md";
import CoursedetailsCard from "../components/cors/course/CoursedetailsCard";
import CourseSections from "../components/cors/course/CourseSections";
const CourseDetails = () => {




  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { courseId } = useParams();

  const [isActive,setIsActive] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [coursedata, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNumberOfLecture, setTotalNumberOfLecture] = useState(0);

  useEffect(() => {
    const getcoursedetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
        // setCourseData(result);
      } catch (error) {
        console.log(error);
      }
    };
    getcoursedetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(
      coursedata?.data?.courseDetails?.ratingAndReviews
    );
    setAvgReviewCount(count);
  }, [coursedata]);

  useEffect(() => {
    let lectures = 0;
    coursedata?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNumberOfLecture(lectures);
  }, [coursedata]);

  // hanle buy course function
  const handleBuyCourse = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancle",
      btn1Handler: () => {
        navigate("/login");
      },
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !coursedata) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner">Loading..</div>
      </div>
    );
  }

  if (!coursedata.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

// const handleActive =(id)=>{
//    setIsActive(
//     !isActive.includes(id) ?
//     isActive.concat(id):
//     isActive.filter((e)=>e != id)
//    )
// }





  const {
    _id: course_id,
    courseName,
    courseDescription,
    price,
    thumbnail,
    createdAt,
    whatYouWillLearn,
    instructor,
    courseContent,
    ratingAndReviews,
    tag,
    category,
    StudentsEnrolled,
    instructions,
  } = coursedata?.data?.courseDetails;

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        {/* upeer section  */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          {/* 1st section  */}
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* image show when small screen  */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full "></div>
              <img src={thumbnail} className="aspect-auto w-full" />
            </div>

            {/* left side area of hero section  */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>

              <p className="text-richblack-200">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2 ">
                <span className="text-yellow-50">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`${ratingAndReviews.length} reviews`}</span>
                <span>{`${StudentsEnrolled.length} students enrolled`}</span>
              </div>

              <div>
                <p>Created By {`${instructor.firstName}`}</p>
              </div>

              <div className=" flex gap-5 flex-wrap text-lg ">
                <p className="flex items-center gap-2">
                  <MdOutlineWatchLater />
                  Created At {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <TiWorld /> English
                </p>
              </div>
            </div>
          </div>

          {/* card section  */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px]  lg:absolute  lg:block">
            <CoursedetailsCard
              course={coursedata?.data?.courseDetails}
              handleBuyCourse={handleBuyCourse}
              setConfirmationModal={setConfirmationModal}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* what you will learn  */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl  font-semibold">What you'll learn</p>
            <div className="mt-5">
              <p>{whatYouWillLearn}</p>
            </div>
          </div>

          {/* course content section  */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-between">
              {/* upeer matter
               */}
              <div className="flex gap-2">
                <span>
                  {courseContent.length} {`section's`}
                </span>
                <span>
                  {totalNumberOfLecture} {`lecture's`}
                </span>
                <span>
                  {coursedata?.data?.totalDuration} {`total length`}
                </span>
              </div>

              {/* <div>
                <button
                onClick={()=>setIsActive([])}
                className="text-yellow-50">
                  Collapse all sections
                </button>
              </div> */}
            </div>
          </div>

          {/* course details  */}

          <div className="py-4">
            {courseContent?.map((section, index) => (
              <CourseSections section={section} isActive={isActive}  key={index} />
            ))}
          </div>

          {/* Author details  */}
          <div className="mb-12 py-4">
            <p className="text-[28px] font-semibold">Author</p>
            <div className="flex items-center py-4 gap-4">
              <img
                src={
                  instructor.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt="Author"
                className="h-14 w-14 rounded-full object-cover"
              />
              <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
            </div>
            <p className="text-richblack-50">
              {instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
        
        <div>
        
        </div>
      </div>


      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseDetails;
