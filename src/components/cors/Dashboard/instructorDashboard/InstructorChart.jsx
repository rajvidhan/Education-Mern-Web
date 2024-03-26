import React, { useState } from "react";
// import {Chart, registerables} from "chart.js"

// import {Pie} from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// step1 register the chart
// Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  console.log("courses", courses);
  const [currChart, setcurrChart] = useState("students");

  // function to generate random colorss
  const randomColors = (numColors) => {
    const colors = [];

    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // step 2 data creation
  // create data for  chart display student information
  const chartDataforStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentEnrolled),
        backgroundColor: randomColors(courses.length),
      },
    ],
  };

  // create data for display income information

  const chartDatafroIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: randomColors(courses.length),
      },
    ],
  };

  // // step 3 options for chart
  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // change legend font color
          font: {
            size: "14",
            family: "Arial, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="my-3 bg-richblack-800  rounded-md p-10">
      <p className="text-xl text-richblack-50 font-bold">Visualise</p>
      <div className="flex gap-5 mt-3">
        <button
          className={`bg-richblack-700 rounded-md ${
            currChart === "students" ? "text-yellow-50" : "text-richblack-50"
          } py-1 px-3`}
          onClick={() => setcurrChart("students")}
        >
          Student
        </button>
        <button
          className={`bg-richblack-700 rounded-md ${
            currChart === "income" ? "text-yellow-50" : "text-richblack-50"
          } py-1 px-3`}
          onClick={() => setcurrChart("income")}
        >
          Income
        </button>
      </div>

      <div className="w-[40rem] h-[30rem] bg-gray-200 p-6 rounded-lg shadow-lg">
        {/* <Pie 
        data={currChart === "students" ? chartDataforStudents : chartDatafroIncome}  
        options={options}
        /> */}
        <Doughnut
          options={options}
          data={
            currChart === "students" ? chartDataforStudents : chartDatafroIncome
          }
        />
      </div>
    </div>
  );
};

export default InstructorChart;
