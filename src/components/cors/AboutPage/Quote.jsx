import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Quote = () => {
  return (
    <div className='text-[40px] text-richblack-100 flex flex-col items-center justify-center'>
      {/* first line  */}
      <span>"We are passionate about revolutionizing the way we learn.Our{" "}</span>
  {/* second line  */}
      <span>

      innovative platform
      <HighlightText text={"combines technology"}/>
      <span className='text-brown-400'>
        expertise
      </span>
      ,and community to

      </span> 
{/* third line  */}
      <span>

      create an{" "}
      <span className='text-yellow-100'>
        unparalleled educational experience."
      </span>

      </span>
    </div>
  )
}

export default Quote
