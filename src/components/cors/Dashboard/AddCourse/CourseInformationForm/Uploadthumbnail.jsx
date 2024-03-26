import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import { FiUploadCloud } from "react-icons/fi";

// video player react 
import "video-react/dist/video-react.css"
import { Player } from "video-react"

const Uploadthumbnail = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData,
}) => {
  const fileInputRef = useRef(null);

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewsourse, setpreviewSourse] = useState(viewData ? viewData : editData ? editData : "");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("file",file)
    if (file) {
      setThumbnailImage(file);
      previewFile(file);
    }
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept:!video ?{
      "image/*":[".jpeg",".jpg",".png"]
    }:{
   "video/*":[".mp4"]
    },onDrop})


  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreviewSourse(reader.result);
    };
  };

  useEffect(() => {
    setValue(name, thumbnailImage);
  }, [thumbnailImage, setValue]);

  useEffect(() => {
    register(name, {
      required: true,
    });
  }, [register]);

  return (
    <div className="flex flex-col space-y-2 ">
      <label
        htmlFor={name}
        className="mb-1  text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >
        {label}
        <sup className="text-pink-200">*</sup>
      </label>

      <div className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
        {previewsourse ? (
          <div className="flex w-full flex-col p-6">
            {
              !video ?(
                <img
                src={previewsourse}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
              ) :(
                <Player aspectRatio="16:9" playsInline src={previewsourse} />
              )
            }
           
            {
              // mtlb previewsourse me kuch hai 
              !viewData && (
                <button
              type="button"
              onClick={() => {
                setpreviewSourse("");
                setThumbnailImage("");
                setValue(name, null);
              }}
              className="mt-3 underline p-2 text-lg text-richblack-300 border-l-2 border-richblack-900"
            >
              Cancle
                </button>
              )
            }
          </div>
        ) : (
          // html me getrootprop 
          <div {...getRootProps()} className="flex w-full flex-col items-center p-6">
            <input {...getInputProps()}  ref={fileInputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an image, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024*576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Uploadthumbnail;
