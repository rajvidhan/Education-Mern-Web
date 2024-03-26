import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropright } from "react-icons/io";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";

const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);

  const [editSectionName, setEditSectionName] = useState(null);

  const dispatch = useDispatch();
  // cancle edit ka function
  const cancleEdit = () => {
    console.log("pressing cancle edit");
    console.log(editSectionName);

    setEditSectionName(null);
    console.log(editSectionName);

    setValue("sectionName", "");
  };

  // goback function
  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please Add at least one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      // .some btata hai kii atleast one value condition ko satishfy krti hai ya nhi
      toast.error("Please Add atleast one lecture in each section");
      return;
    }
    //  if everything  is fine
    dispatch(setStep(3));
  };

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  // onsubmit function
  const onSubmit = async (data) => {
    setLoading(true);
    let result=null;
    console.log(editSectionName);
    // agr  course edit honga to update section wali api use hogi wrna phir create section wali to
    if (editSectionName) {
    result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
      
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
 
    // update value
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    // loading false
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancleEdit();
      return;
    }
    console.log("hello");
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-[0.5rem] bg-richblack-600 py-[12px] px-[35px] text-richblack-5"
          />
          {errors.sectionName && <span className="ml-2 text-xs tracking-wide text-pink-200">Section name is required***</span>}
        </div>

        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white border-dashed"}
          >
            {editSectionName ? (
              <CiEdit className="text-yellow-50 text-xl" />
            ) : (
              <IoAddCircleOutline className="text-yellow-50 text-xl" />
            )}
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancleEdit}
              className="text-sm ml-4 text-richblack-300 underline"
            >
              Cancle Edit
            </button>
          )}
        </div>
      </form>

      {/* nested view  */}

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <IoMdArrowDropright />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilder;
