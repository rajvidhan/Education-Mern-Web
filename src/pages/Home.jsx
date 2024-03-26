import React from "react";
import { Link } from "react-router-dom";
import CTAButton from "../components/cors/Homepage/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import HighlightText from "../components/cors/Homepage/HighlightText";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/cors/Homepage/CodeBlocks";
import Footer from "../components/common/Footer";
import TimeLineSection from "../components/cors/Homepage/TimeLineSection";
import LearnAndLanguageSection from "../components/cors/Homepage/LearnAndLanguageSection";
import InstructorSection from "../components/cors/Homepage/InstructorSection";
import Exploremore from "../components/cors/Homepage/Exploremore";
import ReviewSlider from "../components/common/ReviewSlider";
const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div
        className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white 
 justify-between mt-16"
      >
        <Link to={"/signup"}>
          <div
            className="group  p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
         transition-all duration-200 hover:scale-95 w-fit"
          >
            <div
              className="flex flex-row  items-center gap-2 rounded-full px-10 py-[5px] 
             transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become an Instructor</p>
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </Link>
        <div className="lg:text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="w-[90%] lg:text-center  text-lg font-bold text-richblack-300  mt-4 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row lg:gap-7 gap-9 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn Demo
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book Demo
          </CTAButton>
        </div>

        <div className="shadow-[12px_12px_0_0] shadow-blue-200  lg:mx-3 my-14">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section-1 */}
        <div >
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl   font-bold">
               Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try It Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>`}
            codecolor={"text-yellow-50"}
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-bold lg:w-[40%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead>\n<title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>`}
            codecolor={"text-yellow-50"}
          />
        </div>

        <Exploremore />
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 flex-col lg:justify-center max-w-maxcontent flex lg:items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              {/* first button  */}
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <MdKeyboardDoubleArrowRight />
                </div>
              </CTAButton>
              {/* second button  */}
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-2">Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12  justify-between max-w-maxContent flex flex-row items-center gap-7 "></div>

        <div className="flex flex-row gap-5 mb-10 mt-[95px]">
          {/* first box  */}
          <div className=" pl-[15%] text-4xl font font-semibold w-[45%]">
            Get the Skills you need for a
            <HighlightText text={"job that is in demand"} />
          </div>

          {/* second box */}
          <div className="flex flex-col gap-10 w-[40%] items-start">
            <div className="text-[16px]">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <CTAButton active={true} linkto={"/signup"}>
              <div>Learn More</div>
            </CTAButton>
          </div>
        </div>
        <TimeLineSection />
        <LearnAndLanguageSection />
      </div>

      {/* section 3 */}
      <div 
      className=" w-11/12 mx-auto max-w-maxContent items-center flex flex-col text-white  mt-[70px] gap-8 bg-richblack-900 ">
        {/* first box  */}
        <InstructorSection />
        {/* second box  */}
        <h2 className="text-3xl text-richblack-100 font-semibold items-center mt-[150px] ">
          Reviews from other learners
        </h2>
       
      </div>
        {/* Review Slider here */}      
      <div className="w-11/12 my-[100px] items-center mx-auto max-w-maxContent ">
      <ReviewSlider />
      </div>


      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
