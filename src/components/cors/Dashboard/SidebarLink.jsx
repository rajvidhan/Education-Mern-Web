import React from "react";
import * as Icons from "react-icons/md"
import { NavLink, matchPath, useLocation } from "react-router-dom";

export default function SidebarLink({ link, iconName }) {
  //  nya trika
 
//
const Icon = Icons[iconName]

 

  const location = useLocation();


  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname);
};

  return (
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
        {/* Icon Goes Here */}
        <Icon className="text-2xl" />
        <span >{link.name}</span>
      </div>
  
   </NavLink>
 
  )
}



 
      
    
    