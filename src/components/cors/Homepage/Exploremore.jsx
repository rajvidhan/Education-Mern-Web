import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HightlightText from "../Homepage/HighlightText";
import Coursecard from "./Coursecard";
const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const Exploremore = () => {
  const [currentab, setcurrenttab] = useState(tabName[0]);
  const [courses, setcourses] = useState(HomePageExplore[0].courses);
  const [currentcard, setcurrentcard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setcurrenttab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setcourses(result[0].courses);
    setcurrentcard(result[0].courses[0].heading);
  };

  console.log("courses", courses)

  return (
    <div className="flex flex-col lg:items-center">
      <div className="lg:text-4xl text-2xl font-semibold">
        Unlock the
        <HightlightText text={"Power of Code"} />
      </div>

      <p className="text-richblack-300 lg:text-center text-sm text-[16px] mt-3">
        Learn to Build Anything You Can Imagine
      </p>



     {/* tabs section  */}
      <div className="flex flex-row px-1 py-1 rounded-full bg-richblack-800 mb-5 border-richblack-100 mt-5">
        {tabName.map((element, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentab == element
                  ? "bg-richblack-900 font-medium text-richblack-5"
                  : " text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900
             hover:text-richblack-5 px-7 py-2`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]"></div>
     
      {/* Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <Coursecard
              key={index}
              cardData={ele}
              currentCard={currentcard}
              setCurrentCard={setcurrentcard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Exploremore;
