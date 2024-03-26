import { toast } from "react-hot-toast";

import { setUser } from "../../slices/ProfileSlice";

import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../Apis";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function UpdatedisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("response of code is ............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // dispatch(setUser({ ...response.data.data }));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log(" API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function UpdateProfile(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API,data,{

        Authorization: `Bearer ${token}`,
      });
      console.log("response of code is ............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
     

      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log("error is ", error);
      toast.error("Unable to update the profile");
    }
    toast.dismiss(toastId);
  };
}

export function DeleteUserAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("response of code is ............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");

      dispatch(logout(navigate));
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to delete your account");
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, data) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("response of code is ............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password change successfully");
  } catch (error) {
    console.log("error is ",error);
    toast.error("Unable to change the password");
  }
  toast.dismiss(toastId);
}
