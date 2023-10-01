import { FaBeer } from "react-icons/fa";
import {
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import InfoCards from "./components/info-cards/InfoCards";

import React from "react";
import { Chart as ChartJS } from "chart.js/auto";

import useDashBoard from "./useDashBoard";
import DropDown from "../../components/drop-down/DropDown";
import formattedCost from "../../helper/format-cost/formattedCost";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
  Legend,
} from "recharts";
import LoadingIndicator from "../../components/loading-indicator/LoadingIndicator";

const DashBoard = () => {
  const [state, dispatch, getOrders] = useDashBoard();

  const data1 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];
  if (state.isLoading) {
    return <LoadingIndicator />;
  }

  if (state.error) {
    return (
      <div className="bg-white flex flex-1 flex-col justify-center items-center">
        <p>{state.error}</p>
        <button onClick={getOrders} className=" border-2 p-2 rounded-md">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 onClick={getOrders} className="text-2xl font-bold mb-5">
          DashBoad
        </h1>

        <div className="flex flex-col  justify-between gap-5 sm:flex-row  lg:flex-row ">
          <div className="flex flex-col  gap-5  flex-1 lg:flex-row ">
            <InfoCards
              title={"New Users This Month"}
              number={state.newUserThisMonth}
              color="red"
              icon={<AiOutlineUser />}
            />
            <InfoCards
              title={"Average Daily Sales"}
              number={formattedCost(state.averageDailySales)}
              color="green"
              icon={<AiOutlineDollarCircle />}
            />
          </div>
          <div className="flex flex-col  gap-5  flex-1 lg:flex-row ">
            <InfoCards
              title={"Pending Orders"}
              number={state.newOrdersCount}
              color="blue"
              icon={<AiOutlineShoppingCart />}
            />
            <InfoCards
              title={"Products"}
              number={"#" + state.productCount}
              color="yellow"
              icon={<AiOutlineShoppingCart />}
            />
          </div>
        </div>

        <div className="flex  mt-5 ">
          <div className="flex flex-col flex-1 lg:flex-row gap-5">
            <div className=" w-ful  bg-white p-5 lg:flex-1 ">
              <div className="flex justify-between items-center mb-5 ">
                <h2 className="text-lg font-bold">Sales</h2>
                <div className="bg-gray-100 flex gap-2 p-1  rounded-md text-sm ">
                  <p className="p-2 rounded-md bg-white font-bold">In Months</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  width={500}
                  height={400}
                  data={state.sales}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="shortendMonthsName" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#EE7700"
                    fill="#F47A00"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className=" w-full bg-white p-5  lg:w-[400px]">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold">Sales</h2>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  width={500}
                  height={300}
                  data={state.userRatio}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="guestCount" fill="#8884d8" />
                  <Bar dataKey="userCount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
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
