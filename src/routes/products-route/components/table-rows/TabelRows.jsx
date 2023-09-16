import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
import { ACTIONS } from "../../helper/reducerHelper";
const TabelRows = ({ data, dispatch, nav }) => {
  //console.log("dwdwdwddddddddddddd");

  return (
    <tr>
      <td className="px-6 py-4 ">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.currentTarget.checked) {
              dispatch({ type: ACTIONS.SET_SELECTED, payload: data.id });
            } else {
              dispatch({ type: ACTIONS.DESELECT, payload: data.id });
            }
          }}
        />
      </td>
      <td className="px-6 py-4 ">
        <div className="flex items-center gap-1 w-[200px]">
          <img
            src={data.image}
            className="bg-gray-200 rounded-md p-2 w-14 h-auto"
          />

          <p> {data.productName} </p>
        </div>
      </td>
      <td className="px-6 py-4">{data.make}</td>
      <td className="px-6 py-4">{data.model}</td>
      <td className="px-6 py-4">{formattedCost(data.price)}</td>
      <td className="px-6 py-4">
        <p
          className={`text-center rounded-lg px-2 ${
            data.status == "In stock"
              ? "bg-green-200  text-green-500"
              : "bg-orange-200 text-orange-500"
          }`}
        >
          {data.status}
        </p>
      </td>

      <td className="px-6 py-4">
        <button
          className="text-blue-500"
          onClick={() =>
            nav("/home/products/add", {
              state: {
                actionType: "Update",
                data: data,
              },
            })
          }
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default memo(TabelRows);
