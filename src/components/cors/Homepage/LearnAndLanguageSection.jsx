import React from 'react'
import HighlightText from "./HighlightText"
import knowyourprogress from "../../../assets/Images/Know_your_progress.png"
import comparewithimage from "../../../assets/Images/Compare_with_others.png"
import planyour from "../../../assets/Images/Plan_your_lessons.png"
import Button from "./Button"
const LearnAndLanguageSection = () => {
  return (
    <div className='mt-[130px] pb-[90px]'>
      <div className='flex flex-col gap-5 items-center'>
        
        <div className='text-4xl font-semibold text-center'>
         Your Swiss knife for
          <HighlightText text={"Learning Any Language"} />
        </div>
        
        <div className='text-center text-richblack-600 mx-auto text-base font-semibold w-[40%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
        <img src={knowyourprogress} className='object-contain -mr-32'/>
        <img src={comparewithimage} className='object-contain '/>
        <img src={planyour} className='object-contain -ml-36' />
        </div>
       
       <div>
          <Button active={true} linkto={"/signup"} className="font-semibold">Learn More</Button>
       </div>
      </div>
    </div>
  )
}

export default LearnAndLanguageSection
