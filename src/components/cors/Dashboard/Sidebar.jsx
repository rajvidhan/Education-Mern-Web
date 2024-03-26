import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'

import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user , loading:profileLoading} = useSelector((state)=>state.profile);
    const {loading:authLoading}= useSelector((state)=>state.auth);

    const [confirmationmodal ,setconfirmationmodal] = useState(null)


   const dispatch = useDispatch();
   const navigate = useNavigate();

    if(profileLoading || authLoading){
        return (
          <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
          <div className="spinner"></div>
        </div>
        )
    }
    
    

  return (
    <div>
      <div className=' flex h-[calc(100vh-3.5rem)] flex-col min-w-[220px] border-r-[1px] border-r-richblack-700 
      bg-richblack-800 py-10 '>

        <div className='flex flex-col'>
        {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
 

      {/* horizontal line  */}
        <div className='  mx-auto mt-6 mb-6 text-richblack-200 h-[1px] w-10/12'>
         <hr />
        </div>

        <div className='flex flex-col'>
              <SidebarLink  link={{name:"Settings", path:'/dashboard/settings'}} iconName="MdOutlineSettings" />
              

              <button onClick={()=> setconfirmationmodal({
                text1:"Are you sure ?",
                text2:"You will be logged out of your account",
                btn1Text:"Logout",
                btn2Text:"Cancle",
                btn1Handler:()=> dispatch(logout(navigate)),
                btn2Handler:()=> setconfirmationmodal(null),
              })}
              className='text-sm px-8 py-2 font-medium text-richblack-300'>
               <div className='flex flex-row items-center gap-x-2'>
               <VscSignOut className='text-2xl' />
               <span className='text-[15px]'>Logout</span>
               </div>
              </button>
        </div>

      </div>


      {/* confirmationmodal  */}
      {
        confirmationmodal && <ConfirmationModal modalData={confirmationmodal} />
      }
    </div>
  )
}

export default Sidebar
