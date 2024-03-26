import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/Apis";
import getCatalogPageData from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/cors/Catalog/CourseSlider";
import Course_Card from "../components/cors/Catalog/Course_Card";

const Catalog = () => {
  const [active, setActive] = useState(1)
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // fetch all the categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
          
      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

//   get the all data 
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
      
        setCatalogPageData(res);
      } catch (error) {
        console.log(error.message);
      }
    };
    if(categoryId) {
      getCategoryDetails();
  }
  }, [categoryId]);

  return (
    <div >
      {/* 1st section  */}
      <div className=" box-content bg-richblack-800 px-4">
      <div  className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">{`Home / Catalog / `}{" "}
        <span className="text-yellow-50">
            {catalogPageData?.data?.selectedCategory?.name}
        </span>
        </p>
        <p  className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
        <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>
      </div>

      {/* 2nd part  */}
      <div >
        {/* section 1  */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-[30px] text-white font-semibold hover:text-yellow-50">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p 
            className={`px-4 py-2 ${
              active === 1 
              ? "border-b border-b-yellow-50 text-yellow-50"
              :"text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
            >Most Popular</p>
            <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-50 text-yellow-50"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
            >New</p>
          </div>
        <div>
        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course} />
        </div>
        </div>

        {/* section 2
         */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <p className="text-[30px] text-white font-semibold hover:text-yellow-50">Top Courses In {catalogPageData?.data?.selectedCategory?.name}</p>
          <div className="py-8">
            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}  />
            </div>
        </div>

        {/* section 3
         */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <p className="text-[30px] text-white font-semibold hover:text-yellow-50">Frequently Bought</p>
           <div className="py-8">
            <div  className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {
                    catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                    .map((course,index)=>(
                        <Course_Card course={course} key={index} Height={"h-[400px]"} />
                    ))
                }
            </div>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
