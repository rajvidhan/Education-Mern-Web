import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponents = () => {
  return (
    <section className="my-[100px]">
      <div >
        <div className="flex rounded-2xl gap-x-5 py-[80px] px-[60px] justify-between bg-richblack-700 ">
          {Stats.map((data, index) => {
            return (
              <div key={index}>
                <h1 className="font-bold text-[35px]">{data.count}</h1>
                <h2 className=" text-[20px] text-richblack-200">{data.label}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsComponents;
