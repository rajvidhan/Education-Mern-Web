import { toast } from "react-hot-toast";
import { categories } from "../Apis";
import { apiConnector } from "../apiconnector";


const {
    CREATE_CATEGORY_API
  } = categories;


  export const createCategory = async(data)=>{
    const toastId = toast.loading("Loading...");
    let result=null
    try{

        const response = await apiConnector("POST",CREATE_CATEGORY_API,data);
        console.log("category create response ",response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
          }
          result = true
          toast.success("Category create successfully..")

    }catch(error){
        console.log(error.message)
        result=false
        toast.error("Failed to create the category")
    }
    toast.dismiss(toastId)
    return result
  }