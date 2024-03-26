import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/cors/Dashboard/Sidebar';

const DashBoard = () => {



    const {loading:authLoading} = useSelector((state)=>state.auth);
    const {loading:profileLoading} = useSelector((state)=>state.profile);
    
    if(profileLoading || authLoading){
        return (
            <div className='text-white mt-10 font-bold '>
                Loading...
            </div>
        )
    }
    




  return (
    <div className='relavite flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar />
        <div className='h-[calc(100vh-3.5rem)]  xl:w-[90%] overflow-auto'>
  
           <div className='ml-[100px] w-11/12 max-w-[1000px] '>
            <Outlet />
           </div>

        </div>
      
    </div>
  )
}

export default DashBoard
