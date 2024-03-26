import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { AiFillCaretDown } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }

    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId,sectionId) => {
    console.log("1",subSectionId)
    console.log("2",sectionId);

    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });
    if (result) {
      // update the structure of the result 
      const updatedcourseContent = course.courseContent.map((section)=>
      section._id === sectionId ? result : section);
      const updatedCourse = {...course, courseContent:updatedcourseContent}
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={()=>handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  )}
                >
                  <CiEdit className="text-2xl text-richblack-300" />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lecture in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancle",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <MdDeleteOutline className="text-2xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>

            <div className="px-6 pb-4">
              {
              section.subSection.map((data) => (
                // 1st
                <div
                  key={data._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>

                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-x-3">
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <CiEdit className="text-2xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this sub section",
                          text2: "selected lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancle",
                          btn1Handler: () =>handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <MdDeleteOutline className="text-2xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
             
            <button
                onClick={()=>setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <IoAddOutline className="text-2xl " />
                <p>Add Lecture</p>
              </button>
                      
            </div>
            
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {/* agr confirmation modal main koi data ho to render krwa dena hai  */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
