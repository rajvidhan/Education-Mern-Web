import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/Apis";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import {
  Autoplay,
  Pagination,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );

      if (data?.success) {
        setReviews(data.data);
      }
    };
    fetchReviews();
  }, []);
  console.log("review aa", reviews);
  console.log("review is ", reviews[0]?.user?.image);
  return (
    <div className="text-white gap-10 ">
      <div className="h-[190px] max-w-maxContent">
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
          slidesPerView={3}
          spaceBetween={50}
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
         
          className="max-h-[30rem]"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
        >
          {reviews.map((reviewbox, index) => (
            <SwiperSlide className="flex flex-col bg-richblack-800 gap-y-3 rounded-xl p-4">
              <div className="flex gap-4">
                <img
                  alt="review creater image"
                  className="h-9 w-9 object-cover rounded-full"
                  src={
                    reviewbox?.user?.image
                      ? reviewbox?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${reviewbox?.user?.firstName} ${reviewbox?.user?.lastName}`
                  }
                />

               <div>
               <p className="font-bold text-richblack-100">
                  {reviewbox?.user?.firstName} {reviewbox?.user?.lastName}
                </p>
                <p className="font-bold text-richblack-200">
                    {reviewbox?.user?.email}
                </p>
               </div>
              </div>
            <div className="ml-2 font-bold">
                <p>{reviewbox?.course?.courseName}</p>
            </div>
              <div className="font-bold text-richblack-50 ml-2">
                {reviewbox?.review}
              </div>
              <div className="ml-2 flex justify-center items-center gap-2">
                <p className="text-xl text-yellow-300">{reviewbox?.rating.toFixed(1)}</p>
                <ReactStars 
                 count={5}
                 value={reviewbox.rating}
                 size={30}
                 edit={false}
                 activeColor="#ffd700"
                 emptyIcon={<FaStar />}
                 fullIcon={<FaStar />}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
