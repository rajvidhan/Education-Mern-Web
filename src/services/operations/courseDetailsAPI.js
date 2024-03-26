import { toast } from "react-hot-toast";
import { courseEndpoints } from "../Apis";
import { apiConnector } from "../apiconnector";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

export const fetchCoursecategories = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    console.log("the response is ", response);

    result = response?.data?.data;
  } catch (error) {
    console.log("error is occurning when fetch the categories.");
    toast.error("Unable to fetch the categories.");
  }
  return result;
};

export const addCourseDetails = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Wait Please your course is being ready...😊");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("eror yha hai ", error);
    toast.error("something went wrong in create course");
  }
  toast.dismiss(toastId);
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("edit course details ", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("unable to edit the course");
    toast.error("Course Edit Failed");
  }
  toast.dismiss(toastId);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("your section is being ready🤩...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("response is", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }

    toast.success("Section Created Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to create the section");
  }

  toast.dismiss(toastId);
  return result;
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("response is ", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Section updates successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log(error);
    toast.error("Unable to update the section");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("ressponse is ...........", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
    console.log("result is ,", result);
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading subsection🤗...");
  try {
    console.log("hello bhai", data);
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added🤗");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error("Can not add bhai");
  }
  toast.dismiss(toastId);
  return result;
};

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("response...........", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated🤗");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("the response  is ", response);
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    toast.error("failed to fetch the courses");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCourse = async (data,token)=>{
  const toastId = toast.loading("Loading...🥺 ");
  let result=null;
  try{
    console.log("hello")
    const response = await apiConnector("DELETE",DELETE_COURSE_API,data,{
      Authorization:`Bearer ${token}`,
    });
       
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted🥺");
    result = response.data.data;
  }catch(error){
    toast.error("Failed to delete the course")
  }
  toast.dismiss(toastId);
  return result;
}


export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
    
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  return result
}


export const fetchCourseDetails = async (courseId)=>{
  const toastId = toast.loading("Loading...")
  let result = null;
  try{

    const response = await apiConnector("POST",COURSE_DETAILS_API,{
     courseId
    });
    

    result = response.data;
  console.log("result is = ", result )
  }catch(error){
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result 
}


export const createRating = async(data,token)=>{
  const toastId = toast.loading("Loading...")
  let success = false;
  console.log("data is ", data) 
  try{
    const response = await apiConnector("POST",CREATE_RATING_API,data,{
      Authorization:`Bearer ${token}`
    });
  
  console.log('create rating response ', response);
  if (!response.data.success) {
    throw new Error(response.data.message)
  }
  toast.success("Rating Submitted")
  success= true 
  
  }catch(error){
            success=false
            toast.error("Error in submit the rating")
            console.log("error in create the rating")
    }
    toast.dismiss(toastId)
    return success
    
}

export const markLectureComplete= async(data,token)=>{
  let result = null;
  console.log("mark lecture complete data ", data)
  const toastId = toast.loading("Loading...")
  try{


const response = await apiConnector("POST",LECTURE_COMPLETION_API,data,{
  Authorization: `Bearer ${token}`
});


console.log("response os api mark as complete ", response)
if (!response.data.success) {
  throw new Error(response.data.error)
}
    toast.success("Lecture mark as completed");
    result = true

  }catch(error){
    console.log(error.message)
    toast.error("Sorry Can't mark as completed");
    result = false
  }
  toast.dismiss(toastId)
  return result 
}