import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteUserAccount } from "../../../../services/operations/SettingApi";
const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const handleDeleteAccount = () => {
    try {
      dispatch(DeleteUserAccount(token, navigate));
    } catch (error) {
      console.log("Error Message >", error.message);
    }
  };

  return (
    <>
      <div className="flex  gap-x-4 my-[50px] items-center rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 text-richblack-5 justify-between ">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 ">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="e-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain paid courses.Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-fit cursor-pointer italic text-pink-200"
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
