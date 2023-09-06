import { FaBeer } from "react-icons/fa";
import {
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import InfoCards from "./components/info-cards/InfoCards";

import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

const DashBoard = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(() => Math.round(Math.random() * 200)),
        borderColor: "",
        backgroundColor: "#F47A00",
      },
    ],
  };
  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col">
        <div className="flex  justify-between gap-5 flex-wrap">
          <InfoCards title={"Pending Orders"} number={100} />
          <InfoCards title={"Pending Orders"} number={100} />
          <InfoCards title={"Pending Orders"} number={100} />
          <InfoCards title={"Pending Orders"} number={100} />
        </div>

        <div className="flex  mt-5 ">
          <div className="justify-center items-center flex flex-1">
            <div className=" w-1/2 flex-1  ">
              <Bar data={data} />
            </div>
          </div>

          <div className="justify-center items-center flex flex-1">
            <div className=" max-w-[400px] h-[300px] ">
              <Pie data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
