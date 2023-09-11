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
import useDashBoard from "./useDashBoard";
import DropDown from "../../components/drop-down/DropDown";
import formattedCost from "../../helper/format-cost/formattedCost";

const DashBoard = () => {
  const [state, dispatch] = useDashBoard();
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

  const data2 = {
    labels,
    datasets: [
      {
        data: labels.map(() => Math.round(Math.random() * 200)),
        borderColor: "white",
        backgroundColor: "red",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">DashBoad</h1>

        <div className="flex flex-col  justify-between gap-5 sm:flex-row  lg:flex-row ">
          <div className="flex flex-col  gap-5  flex-1 lg:flex-row ">
            <InfoCards title={"Pending Orders"} number={100} color="red" />
            <InfoCards title={"Pending Orders"} number={100} color="green" />
          </div>
          <div className="flex flex-col  gap-5  flex-1 lg:flex-row ">
            <InfoCards title={"Pending Orders"} number={100} color="blue" />
            <InfoCards title={"Pending Orders"} number={100} color="yellow" />
          </div>
        </div>

        <div className="flex  mt-5 ">
          <div className="flex flex-col flex-1 lg:flex-row gap-5">
            <div className=" w-ful  bg-white p-5 lg:flex-1 ">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">Sales</h2>
                <DropDown />
              </div>
              <Bar data={data} />
            </div>

            <div className=" w-full bg-white p-5  lg:w-[400px]">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">Sales</h2>
                <DropDown />
              </div>
              <Pie data={data2} options={{}} />
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white p-5 mt-5   overflow-x-auto">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">Orders</h2>
            <p className="text-blue-600">View All</p>
          </div>
          <table className="text-sm">
            <thead className="text-left">
              <tr className="h-11 bg-slate-100">
                <th className="px-6 py-4">Order Id</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.orders.map((data) => {
                return (
                  <tr>
                    <td className="px-6 py-4">#{data.id}</td>
                    <td className="px-6 py-4">{data.date.split("T")[0]}</td>
                    <td className="px-6 py-4">{data.address}</td>
                    <td className="px-6 py-4">{data.quantity}</td>
                    <td className="px-6 py-4">{formattedCost(data.total)}</td>
                    <td className="px-6 py-4">
                      {data.status == "" ? (
                        <p className="bg-amber-200 text-center rounded-lg font-bold text-amber-500">
                          Here
                        </p>
                      ) : (
                        <p>{data.status}</p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
