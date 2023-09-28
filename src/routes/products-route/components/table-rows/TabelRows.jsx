import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
import { ACTIONS } from "../../helper/reducerHelper";
const TabelRows = ({ data, dispatch, nav, selected = [] }) => {
  //console.log("dwdwdwddddddddddddd");

  return (
    <tr>
      <td className="px-6 py-4 ">
        <input
          type="checkbox"
          checked={selected.includes(data.id)}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              dispatch({ type: ACTIONS.single_select, payload: data.id });
            } else {
              dispatch({ type: ACTIONS.single_deselect, payload: data.id });
            }
          }}
        />
      </td>
      <td className="px-6 py-4 ">
        <div className="flex items-center gap-1 max-w-[200px] min-w-[150px]">
          <img src={data.image} className="rounded-md p-2 w-14 h-auto" />

          <p> {data.productName} </p>
        </div>
      </td>
      <td className="px-6 py-4">{data.make}</td>
      <td className="px-6 py-4">{data.model}</td>
      <td className="px-6 py-4">{formattedCost(data.price)}</td>
      <td className="px-6 py-4">
        <p
          className={`text-center rounded-lg px-2 inline-block font-bold  ${
            data.status == "In stock" ? "  text-green-500" : " text-red-500"
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
