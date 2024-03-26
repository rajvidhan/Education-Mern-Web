import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../Apis";


const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DATA_API } =
  profileEndpoints;

// for get the enrolled courses
export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("respos is ", response)
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
     
     result = response.data.data
  } catch (error) {
   
    toast.error("Unable to fetch the enrolled courses");
  }
  toast.dismiss(toastId);
  return result;
}


export async function getInstructorData(token){
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}