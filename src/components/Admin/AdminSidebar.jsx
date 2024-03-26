import React from 'react'
import SidebarLink from '../cors/Dashboard/SidebarLink'
import { NavLink,matchPath, useLocation } from 'react-router-dom';





const AdminSidebar = () => {

    
const sidebarLink = 
[   {
    id: 1,
    name: "Courses",
    path: "/admin/admin-portal",    
    icon: "MdBookmarkAdded",
   },
    {
      id: 2,
      name: "Create category",
      path: "/admin/create-category",
      icon: "MdOutlinePerson",     
    },
    {
      id: 3,
      name: "Users data ",
      path: "/admin/users-info",
      icon: "MdOutlineSpaceDashboard",
    },
    {
      id: 4,
      name: "Courses",
      path: "/admin/Courses",    
      icon: "MdBookmarkAdded",
    },
];

   const location = useLocation();





    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    };



  return (
    <div>
        <div className=' flex h-[calc(100vh-3.5rem)] flex-col min-w-[220px] border-r-[1px] border-r-richblack-700 
      bg-richblack-800 py-10 '>
         

     {/* links  */}
     {
        sidebarLink.map((link)=>(
            <NavLink
            to={link.path}
            className={`relative px-8 font-medium  py-2 text-sm  ${
              matchRoute(link.path) ? "bg-yellow-800 text-yellow-1000  " : "bg-opacity-0 text-richblack-300"
            } transition-all duration-600`}
            
          >
           <span
        className={` ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        } absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-1000`}
      ></span>


     <div className="flex items-center gap-x-2">
        <span className='text-xl' >{link.name}</span>
      </div>


          </NavLink>
        ))
     }
     



      </div>
    </div>
  )
}

export default AdminSidebar
