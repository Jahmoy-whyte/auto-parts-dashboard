import { Oval } from "react-loader-spinner";
import InfoRow from "./components/info-row/InfoRow";
import TotalBars from "./components/total-bars/TotalBars";
import useOrdersEdit from "./useOrdersEdit";
import TableRows from "./components/table-rows/TableRows";
import formattedCost from "../../helper/format-cost/formattedCost";
import LoadingIndicator from "../../components/loading-indicator/LoadingIndicator";
import { Link } from "react-router-dom";
import Model from "../../components/model/Model";
import TextBox from "../../components/text-box/TextBox";
import Button from "../../components/button/Button";
const OrdersEditRoute = () => {
  const [state, dispatch, displayTotal, update, sendNotification, socketData] =
    useOrdersEdit();
  if (state.isLoading) {
    return <LoadingIndicator />;
  }

  if (socketData.error) {
    return (
      <div className="flex flex-1 flex-col bg-white justify-center items-center ">
        <h2 className="font-bold">Socket Error</h2>
        {socketData.error}
      </div>
    );
  }

  console.log(state);
  return (
    <>
      <Model
        show={state.model.visible}
        title={"Notification"}
        close={() =>
          dispatch({
            type: "set_model",
            payload: { visible: false },
          })
        }
      >
        <TextBox
          placeHolder={"Enter Message"}
          value={state.model.text}
          isDisabled={state.model.isLoading}
          onChangeHandler={(name, value) =>
            dispatch({
              type: "set_model",
              payload: { text: value },
            })
          }
        />
        <Button
          isLoading={state.model.isLoading}
          text={"Send"}
          className="w-[70px] text-sm self-end"
          onClick={sendNotification}
        />
      </Model>
      <div className="outlet-outer-container">
        <div className="outlet-inner-container">
          <h1 className="text-2xl font-bold mb-5">Edit Orders</h1>
          <div className="grid  grid-cols-1  gap-5 sm:grid-cols-3">
            <div className="bg-white p-5  sm:col-span-2">
              <h2 className="text-lg font-bold mb-2">Items</h2>

              <div className="flex overflow-x-auto">
                <table className="text-sm flex-1">
                  <thead className="text-left">
                    <tr className="h-11 bg-slate-100">
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Product id</th>
                      <th className="px-6 py-4">Unit Price</th>
                      <th className="px-6 py-4">Quantity</th>
                      <th className="px-6 py-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.orderData?.items?.map((data) => {
                      return <TableRows data={data} key={data.id} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-5 bg-white p-5  text-sm min-w-[200px] sm:row-span-3">
              <h2 className="text-lg font-bold">Information</h2>
              <InfoRow
                topText={"Order ID:"}
                bottomText={"#" + state.orderData?.id}
              />
              <InfoRow
                topText={"User ID:"}
                bottomText={
                  <Link
                    className="text-blue-500"
                    to={`/home/users/edit/${state.orderData?.userId}`}
                  >
                    #{state.orderData?.userId}
                  </Link>
                }
              />
              <InfoRow
                topText={"Notifcation"}
                bottomText={
                  <p
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      dispatch({
                        type: "set_model",
                        payload: { visible: true },
                      })
                    }
                  >
                    Send
                  </p>
                }
              />

              <InfoRow
                topText={"Date:"}
                bottomText={state.orderData?.date?.split("T")[0]}
              />
              <InfoRow
                topText={"Customer:"}
                bottomText={
                  state.orderData?.firstName + " " + state.orderData?.lastName
                }
              />
              <InfoRow topText={"Email:"} bottomText={state.orderData?.email} />
              <InfoRow
                topText={"Shipping Address:"}
                bottomText={state.orderData?.address}
              />
            </div>

            <div className="bg-white p-5 sm:col-span-2">
              <h2 className="text-lg font-bold">Total</h2>
              <TotalBars leftText={"Tax"} rightText={"$46"} />
              <TotalBars leftText={"Total"} rightText={displayTotal} />
            </div>

            <div className="flex justify-between bg-white p-5 sm:col-span-2">
              <select
                className="border-2 rounded-md  h-8"
                onChange={(e) =>
                  dispatch({
                    type: "set_status",
                    payload: e.target.value,
                  })
                }
                value={state.status}
              >
                <option value={"sent"}>New</option>
                <option value={"transit"}>Transit</option>
                <option value={"delivered"}>Delivered</option>
                <option value={"cancelled"}>Cancelled</option>
              </select>

              <button
                disabled={state.btnIsLoading}
                onClick={update}
                className="flex justify-center  items-center bg-secondary text-sm text-white w-20 h-8 rounded-md "
              >
                {state.btnIsLoading ? (
                  <Oval
                    color="white"
                    secondaryColor="white"
                    height={20}
                    width={20}
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersEditRoute;
