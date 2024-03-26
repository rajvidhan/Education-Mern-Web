import React, { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaLaptop } from "react-icons/fa";
const SubSectionDropDowArea = ({ subSection }) => {
  const [isdrop, setdrop] = useState(true);

  return (
    <div>
      <details>
        <summary  className="flex cursor-pointer px-[50px] items-center justify-between  p-3 ">
          <div
            onClick={() => setdrop(!isdrop)}
            className="flex  items-center gap-2"
          >
            <FaLaptop className="text-richblack-300  text-xl" />{" "}
            {subSection.title}
            {isdrop ? (
              <IoMdArrowDropdown className="text-richblack-300  text-xl" />
            ) : (
              <IoMdArrowDropup className="text-richblack-300  text-xl" />
            )}
          </div>
        </summary>

        <div className="px-[50px]  text-lg text-richblack-300 ">
          {subSection.description}
        </div>
      </details>
    </div>
  );
};

export default SubSectionDropDowArea;
