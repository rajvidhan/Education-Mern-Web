import React from 'react'
import {Outlet} from "react-router-dom"
import AdminSidebar from './AdminSidebar'
const AdminPage = () => {
  return (
    <div className='relavite flex min-h-[calc(100vh-3.5rem)]'>
    <AdminSidebar />
    <div className='h-[calc(100vh-3.5rem)]  xl:w-[90%] overflow-auto'>

       <div className='ml-[100px] w-11/12 max-w-[1000px] '>
        <Outlet />
       </div>

    </div>
  
</div>
  )
}

export default AdminPage
