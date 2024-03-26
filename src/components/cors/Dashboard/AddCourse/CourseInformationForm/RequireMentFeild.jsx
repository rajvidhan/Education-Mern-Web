import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequireMentFeild = ({name,label,register,setValue,errors,placeholder,getValues}) => {
    const { editCourse, course } = useSelector((state) => state.course)
const [requirement,setrequirement] = useState("")
const [requirementList,setRequirementList] =useState([]);


useEffect(()=> {
    setValue(name, requirementList);
},[requirementList])

const handleAddRequirement = ()=>{
if(requirement){
    setRequirementList([...requirementList,requirement])
    setrequirement("")
}

}

const handleRemoveRequirement = (index)=>{
const updaterequirementlist = [...requirementList];
// at the position of index remove one element 
updaterequirementlist.splice(index,1);
setRequirementList(updaterequirementlist);
}

useEffect(()=>{
    if (editCourse) {
        setRequirementList(course?.instructions)
      }
    register(name,{
        required:true,
        validate:(value)=>value.length>0
    })
},[]);


    return (
    <div>
      <label htmlFor={name} className="mb-1 w-[50%] text-[0.875rem] leading-[1.375rem] text-richblack-5">
            {label} <sup className="text-pink-200">*</sup>
          </label>
         <div>
         <input 
          type="text"
          id={name}
          placeholder={placeholder}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-600 py-[12px] px-[35px] text-richblack-5"
          value={requirement}
          onChange={(e)=>setrequirement(e.target.value)}
          
          />
          <button type="button" onClick={handleAddRequirement} className='font-semibold text-yellow-50'>Add</button>
         </div>
         {
            requirementList.length >0 && (
             <ul>
                {
                     requirementList.map((requirement, index) => (
                        <li key={index} className='flex gap-[10px] items-center text-richblack-5'>
                            <span>{requirement}</span>
                            <button
                            type='button'
                            onClick={() => handleRemoveRequirement(index)}
                            className='text-lg text-pure-greys-300'>
                                clear
                            </button>
                        </li>
                    ))
                }
             </ul>
            )        
 }
 {
    errors[name] && (
    <span>
        {label} is required**
    </span>
    )
 }
    </div>
  )
}

export default RequireMentFeild
