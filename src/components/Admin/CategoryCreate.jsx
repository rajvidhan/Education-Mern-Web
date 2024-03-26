import React from "react";
import { createCategory } from "../../services/operations/AdminApi";
import { useForm } from "react-hook-form";
import IconBtn from "../common/IconBtn";

const CategoryCreate = () => {


  const onsubmit = async (data) => {

    const result = await createCategory(data);
    reset();
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="text-white">
      <p className="text-richblack-100 text-[70px] ">Hello Admin👋 </p>
      <p className="text-richblack-100 text-[30px]">
        Please fill up the values of input to create the category
      </p>

      <form onSubmit={handleSubmit(onsubmit)} className="mt-[50px]  p-10">
        <div className="flex flex-col mb-10 ">
          <label htmlFor="name">Category Name*</label>
          <input
            type="text"
            placeholder="Enter Category Title"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-pink-500">
              Please type the name of category***
            </span>
          )}
        </div>
        <div className="flex  flex-col mb-10">
          <label htmlFor="name">Description*</label>
          <textarea
            type="text"
            placeholder="Enter Description..."
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-pink-500">Please enter the description***</span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4  py-3 rounded-md bg-yellow-50 right-3 text-black font-bold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreate;
