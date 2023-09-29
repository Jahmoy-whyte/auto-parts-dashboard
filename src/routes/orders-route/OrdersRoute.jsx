//outlet-outer-container

import { BsBagCheck } from "react-icons/bs";
import { AiOutlineEye, AiOutlineSend } from "react-icons/ai";
import OrdersTable from "./components/table-rows/TableRows";
import TabBtn from "./components/tab-btn/TabBtn";
import useOrders from "./useOrders";
import { Oval } from "react-loader-spinner";
import ToolBar from "../../components/tool-bar/ToolBar";
import TableRows from "./components/table-rows/TableRows";
import Pagination from "../../components/pagination/Pagination";
import { ACTIONS } from "./helper/reducerHelper";
const OrdersRoute = () => {
  const [
    state,
    dispatch,
    setState,
    deleteOrders,
    currentPage,
    next,
    pages,
    prev,
    setCurrentPage,
  ] = useOrders();
  return (
    <>
      <div className="outlet-outer-container">
        <div className="outlet-inner-container">
          <h1 className="text-2xl font-bold mb-5">Orders</h1>
          <div className="flex flex-col flex-1 bg-white p-5">
            <ToolBar
              isLoading={state.isLoading}
              searchTextOnChange={(value) =>
                dispatch({ type: ACTIONS.set_search_text, payload: value })
              }
              filterOnChange={(value) =>
                dispatch({ type: ACTIONS.set_filter_value, payload: value })
              }
              searchText={state?.searchText}
              dropDownOptions={state.filterOptions}
              deleteBtnIsloading={state.deleteBtnIsloading}
              deleteFunc={deleteOrders}
              selected={state.selected}
            />

            <div className="flex flex-col mb-5 bg-gray-100 p-1 rounded-md sm:flex-row">
              <TabBtn
                text={`New Orders (${state.orderCounts?.sent})`}
                onClick={setState}
                selected={state.currentTable}
                value="sent"
              />
              <TabBtn
                text={`In Transit (${state.orderCounts?.transit})`}
                onClick={setState}
                selected={state.currentTable}
                value="transit"
              />
              <TabBtn
                text={`Delivered (${state.orderCounts?.delivered})`}
                onClick={setState}
                selected={state.currentTable}
                value="delivered"
              />

              <TabBtn
                text={`Cancelled (${state.orderCounts?.cancelled})`}
                onClick={setState}
                selected={state.currentTable}
                value="cancelled"
              />
            </div>

            <div className="flex   overflow-x-auto">
              <table className="text-sm flex-1">
                <thead className="text-left">
                  <tr className="h-11 bg-slate-100">
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={state.checkAll}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch({ type: ACTIONS.select_all });
                          } else {
                            dispatch({ type: ACTIONS.clear_selected });
                          }
                        }}
                      />
                    </th>
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
                            selected={state.selected}
                            data={data}
                            dispatch={dispatch}
                            key={data.id}
                          />
                        );
                      })
                    : state[state.currentTable]?.map((data) => {
                        return (
                          <TableRows
                            selected={state.selected}
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
          <Pagination
            visible={state.searchText == "" ? true : false}
            currentPage={currentPage}
            next={next}
            prev={prev}
            onClick={setCurrentPage}
            pages={pages}
          />
        </div>
      </div>
    </>
  );
};

export default OrdersRoute;
