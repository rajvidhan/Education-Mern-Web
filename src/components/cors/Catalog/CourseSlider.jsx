import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Course_Card from "./Course_Card";
import {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            dynamicBullets: true,
          }}
          className="max-h-[30rem]"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
