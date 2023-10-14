import { FaBeer } from "react-icons/fa";
import {
  AiOutlinePieChart,
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
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
import OrderTable from "./components/order-table/OrderTable";
import ProductTable from "./components/product-table/ProductTable";

const DashBoard = () => {
  const [state, dispatch, getOrders] = useDashBoard();
  const nav = useNavigate();
  const data1 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  console.log(state.sales);
  if (state.isLoading) {
    return (
      <LoadingIndicator
        text={
          "Node sever hosted on the free tier on render.com, free instance will spin down with inactivity. so it may take a minute to connect to server. Please wait"
        }
      />
    );
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
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto overflow-x-hidden">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">DashBoad</h1>

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

        <div className="flex flex-col flex-1 mt-5 lg:flex-row gap-5">
          <div className="flex-1 bg-white  p-5  ">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold">Sales</h2>
            </div>

            <ResponsiveContainer width="99%" height={250}>
              <AreaChart
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
              <h2 className="text-lg font-bold">Users</h2>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart
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
                <Bar dataKey="guestCount" fill="#E67402" />
                <Bar dataKey="userCount" fill="#FD7F02" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col  gap-5 my-5 lg:flex-row">
          <OrderTable orders={state.orders} />
          <ProductTable product={state.outOfStockProducts} nav={nav} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
