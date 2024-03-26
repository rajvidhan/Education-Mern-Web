import React from "react";
import HighlightText from "../components/cors/Homepage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/cors/AboutPage/Quote";
import foundingStory from "../assets/Images/FoundingStory.png";
import StatsComponents from "../components/cors/AboutPage/Stats";
import LearningGrid from "../components/cors/AboutPage/LearningGrid";
import ContactFormSection from "../components/cors/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";

import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {
  return (
    <div>
      <div className="mx-auto mt-[100px] text-white w-11/12 max-w-maxContent">
        {/* 1st section  */}
        <section>
          {/* heading place
           */}
          <div>
            <header>
              <div className=" flex  text-[40px]  flex-col items-center justify-center">
                <p className=" mb-[40px]  text-[20px] text-richblack-200">
                  About Us
                </p>
                <h1 className="font-bold">
                  Driving Innovation in Online Education for a
                </h1>
                <HighlightText text={"Brighter Future"} />
                <p className=" mt-[5px] w-[80%] items-center justify-center flex flex-col text-[20px] text-richblack-200">
                  Studynotion is at the forefront of driving innovation in
                  online education. We're passionate about creating a{" "}
                  <span>
                    brighter future by offering cutting-edge courses, leveraging
                    emerging technologies, and nurturing a
                  </span>{" "}
                  vibrant learning community.
                </p>
              </div>
            </header>
            <div className=" flex gap-x-7 mt-[60px] flex-row">
              <img className="shadow-xl  shadow-blue-200 " src={BannerImage1} />
              <img
                className="shadow-xl  shadow-orange-10 "
                src={BannerImage2}
              />
              <img
                className="shadow-xl  shadow-brown-400 "
                src={BannerImage3}
              />
            </div>
          </div>
        </section>
        {/* section 2
         */}
        <section className="mt-[100px] mb-[100px] ">
          <div>
            <Quote />
          </div>
        </section>

        {/* line  */}
        <hr className="text-richblack-100 opacity-30 w-full" />

        {/* section 3  */}

        <section>
          <div className="flex flex-col mt-[120px]">
            {/* upper box  */}
            <div className="flex mb-[150px]">
              <div className="w-[50%]">
                <h1 className="text-[40px] text-pink-300 mb-[20px]">
                  Our Founding Story
                </h1>
                <p className="text-[20px] text-richblack-200 mb-[20px]">
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>
                <p className="text-[20px] text-richblack-200">
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <img
                  className="shadow-xl w-[500px] h-auto shadow-pink-300"
                  src={foundingStory}
                />
              </div>
            </div>
            {/* lower box
             */}
            <div className="flex justify-between">
              {/* left box  */}
              <div className="w-[40%]">
                <h1 className="mb-[30px] font-bold text-[40px] text-orange-5">
                  Our Vision
                </h1>
                <p className="text-[20px] text-richblack-200">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>
              {/* right box
               */}
              <div className="w-[40%]">
                <h1 className="mb-[30px] font-bold text-[40px] text-blue-100">
                  Our Mission
                </h1>
                <p className="text-[20px] text-richblack-200">
                  Our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* section 4
         */}
        <StatsComponents />

        {/* section 5  */}

        <section className="mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]">
          <LearningGrid />
          <ContactFormSection />
        </section>   


        {/* section 5   */}
        <section className="flex flex-col gap-y-10 mb-[100px] items-center ">
          <h1 className="text-3xl text-richblack-100">Review"s from other learners</h1>
          <div className="w-11/12 my-[100px] items-center mx-auto max-w-maxContent ">
       <ReviewSlider />
      </div>
        </section>
      </div>

      {/* footer  */}      
      <Footer />
    </div>
  );
};

export default About;
