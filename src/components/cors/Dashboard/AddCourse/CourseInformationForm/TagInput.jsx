import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
const TagInput = ({
  label,
  name,
  placeholder,
  register,
  setValue,
  getValues,
  errors,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);

  // for manage the tags array
  const [tags, setTags] = useState([]);

  // register
  useEffect(() => {
    if (editCourse) {
      setTags(course?.tag);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

//   // ye thoda
  useEffect(() => {
    setValue(name,tags);
  }, [tags]);

  // delete the tag
  const handleDeletetag = (tagindex) => {
    // this filter function return only these values which gona be true from the funtion and create a new array forthat values
    const newTags = tags.filter((_, index) => index !== tagindex);
    setTags(newTags);
  };

  // handle key down
  const handlekeyDown = (event) => {
    // check if user press enter or ,
    if (event.key === "Enter" || event.key === ",") {
      // prevent the defaullt behaivour
      event.preventDefault();
//    ye aane vali input value ko space se trim krke serve kr dega 
      const tagValue = event.target.value.trim();

       if(tagValue && !tags.includes(tagValue)){
        const newTags = [...tags,tagValue];
        setTags(newTags)
        event.target.value = ""
       }

    }
  };
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-[0.875rem] text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* render tags and input  */}
      <div className=" flex w-full flex-wrap gap-y-2">
        {tags.map((tag, index) => (
          <div key={index} className="m-1 flex items-center bg-yellow-400 px-2 py-1 text-sm text-richblack-5 rounded-full">
            {/* render the tag value first   */}
            {tag}
            {/* render the button to delete the tag            */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeletetag(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* render a input for adding the tags  */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handlekeyDown}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-600 py-4 px-6 text-richblack-5"
        />
      </div>
      {/* render an error message  */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default TagInput;
