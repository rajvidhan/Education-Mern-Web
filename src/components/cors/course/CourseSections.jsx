import React, { useState } from 'react'

import { IoMdArrowDropdown } from "react-icons/io";

import SubSectionDropDowArea from './SubSectionDropDowArea';
import { IoMdArrowDropup } from "react-icons/io";
const CourseSections = ({section,isActive,handleActive}) => {


  const [isdrop, setdrop] = useState(true);

  return (
    <>
    <details>

      <summary onClick={()=>{
        // handleActive(section._id);
        setdrop(!isdrop)
      }}  className='flex cursor-pointer items-center justify-between border-b-2 bg-richblack-400  p-4 bg-opacity-20 border-b-richblack-300  '>

      <div  className='flex items-center gap-x-3'>
      {isdrop ? (
              <IoMdArrowDropdown className="text-richblack-300  text-xl" />
            ) : (
              <IoMdArrowDropup className="text-richblack-300  text-xl" />
            )}
        <p>{section.sectionName}</p>
      </div>

      <div className='  flex items-center text-yellow-50'>
        <span>{section.subSection.length}{" "}{`lecture`}</span>

      </div>

      </summary>

{/* {
  isActive.includes(section._id) ?  ( */}
  
    <div className='border-x-[0.1px] border-b-[0.1px] border-b-richblack-500 border-x-richblack-500'>
          {
            section.subSection.map((subSection,index)=>(
              <SubSectionDropDowArea key={index} subSection={subSection} />
            ))
          }
  
        </div>
  {/* ):null */}
  
{/* } */}
    </details>
      
    </>
  )
}

export default CourseSections
