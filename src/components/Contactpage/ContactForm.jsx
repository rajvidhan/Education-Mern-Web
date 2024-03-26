import React from "react";
import ContactUsForm from "./ContactUsForm";

import { LuMessagesSquare } from "react-icons/lu";
import { IoCall } from "react-icons/io5";
import { TiWorld } from "react-icons/ti";
import Footer from "../common/Footer";
import ReviewSlider from "../common/ReviewSlider"
const contactdetails = [
  {
    icon: <LuMessagesSquare />,
    heading: "Chat on us",
    para: "Our friendly team is here to help.",
    para2: "@mail address",
  },
  {
    icon: <TiWorld />,
    heading: "Visit us",
    para: "Come and say hello at our office HQ.",
    para2: "here is the location/address",
  },
  {
    icon: <IoCall />,
    heading: "Call us",
    para: "Mon-Fri From 8am to 5pm",
    para2: "+123 456 7890",
  },
];

const ContactForm = () => {
  return (
    <div>
      <div className="mx-auto mt-[100px] items-center text-white w-11/12 max-w-maxContent">
        <div className="flex flex-row">
          {/* left section  */}
          <div className="w-[50%]">
            <div className="bg-richblack-800 w-[420px] items-center  rounded-2xl p-[40px] h-auto ">
              {contactdetails.map((data, index) => {
                return (
                  <div key={index} className="flex p-[12px] flex-row gap-5">
                    <div className="text-[30px] text-richblack-100">
                      {data.icon}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[20px] font-bold text-white">
                        {data.heading}
                      </h1>
                      <p className="text-richblack-200 text-[15px]">
                        {data.para}
                      </p>
                      <p className="text-richblack-200 text-[15px]">
                        {data.para2}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* right section  */}
          <div className="w-[50%] p-[44px] flex flex-col border-solid border-[1px] border-richblack-200 rounded-2xl">
            <span className="mb-[10px] font-bold text-white">
              <h1 className="text-[35px] font-bold text-white">
                Got a idea? We've got the skills.
              </h1>
              <h1 className="text-[35px]">Let's team up</h1>
            </span>
            <p className="text-[15px] text-richblack-100 mb-[30px]">
              Tell us more about yourself and what you're got in mind.
            </p>
            <ContactUsForm />
          </div>
        </div>

        {/* rivew from  */}

        <section className="flex flex-col gap-y-10 my-[100px] items-center ">
          <h1 className="text-3xl text-richblack-100">Review"s from other learners</h1>
          <div className="w-11/12 my-[100px] items-center mx-auto max-w-maxContent ">
       <ReviewSlider />
      </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactForm;
