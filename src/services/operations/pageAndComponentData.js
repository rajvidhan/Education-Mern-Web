import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../Apis";

const { CATALOGPAGEDATA_API } = catalogData;

const getCatalogPageData = async (categoryId) => {
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });
 

    if (!response?.data?.success) {
      throw new Error("Could not fetch the category page data");
    }

    result = response?.data;
  } catch (error) {
    console.log(error.message);
    
  }
  toast.dismiss(toastId);
  return result;
};

export default getCatalogPageData;
