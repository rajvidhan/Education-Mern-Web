import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import IconBtn from "../../../common/IconBtn";
import { UpdatedisplayPicture } from "../../../../services/operations/SettingApi";

const ChangeProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [previewSource, setPreViewSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleClickOnSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      console.log("hello i am in handle click");
      // most important
      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      dispatch(UpdatedisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreViewSource(reader.result);
    };
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 justify-between ">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            className="aspect-square w-[78px] object-cover rounded-full"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex gap-3">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/gif , image/jpeg, image/jpg"
              />
              <button
                onClick={handleClickOnSelect}
                className="curdor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading.." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;
