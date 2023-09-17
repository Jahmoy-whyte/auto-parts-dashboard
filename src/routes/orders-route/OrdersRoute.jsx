//outlet-outer-container

import { BsBagCheck } from "react-icons/bs";
import { AiOutlineEye, AiOutlineSend } from "react-icons/ai";
import OrdersTable from "./components/table-rows/TableRows";
import TabBtn from "./components/tab-btn/TabBtn";
import useOrders from "./useOrders";
import { Oval } from "react-loader-spinner";
import ToolBar from "./components/tool-bar/ToolBar";
import TableRows from "./components/table-rows/TableRows";
const OrdersRoute = () => {
  const [state, dispatch, setState, deleteOrders] = useOrders();
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">Orders</h1>
        <div className="flex flex-col flex-1 bg-white p-5">
          <ToolBar
            setState={setState}
            state={state}
            deleteOrders={deleteOrders}
          />
          <div className="flex mb-5">
            <TabBtn
              text={"New Orders"}
              onClick={setState}
              selected={state.currentTable}
              value="sent"
            />
            <TabBtn
              text={"Delivered"}
              onClick={setState}
              selected={state.currentTable}
              value="delivered"
            />
            <TabBtn
              text={"Cancelled"}
              onClick={setState}
              selected={state.currentTable}
              value="cancelled"
            />
          </div>

          <div className="flex   overflow-x-auto">
            <table className="text-sm flex-1">
              <thead className="text-left">
                <tr className="h-11 bg-slate-100">
                  <th className="px-6 py-4">Select</th>
                  <th className="px-6 py-4">Order Id</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Address</th>

                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">View</th>
                </tr>
              </thead>
              <tbody>
                {state?.searchText != ""
                  ? state?.searchData.map((data) => {
                      return (
                        <TableRows
                          data={data}
                          dispatch={dispatch}
                          key={data.id}
                        />
                      );
                    })
                  : state[state.currentTable]?.map((data) => {
                      return (
                        <TableRows
                          data={data}
                          dispatch={dispatch}
                          key={data.id}
                        />
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersRoute;
