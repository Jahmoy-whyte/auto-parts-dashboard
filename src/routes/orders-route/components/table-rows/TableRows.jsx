import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
import { ACTIONS } from "../../helper/reducerHelper";
const TabelRows = ({ data, dispatch }) => {
  console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd");
  return (
    <tr>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.currentTarget.checked) {
              dispatch({
                type: ACTIONS.set_selected,
                payload: data.id,
              });
            } else {
              dispatch({ type: ACTIONS.deselect, payload: data.id });
            }
          }}
        />
      </td>

      <td className="px-6 py-4">#{data.id}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 w-32">
          <div className="bg-primary w-[35px] h-[35px] rounded-[35px] flex justify-center items-center text-white">
            <p>{data?.firstName.split("")[0]}</p>
          </div>

          {data?.firstName + " " + data?.lastName}
        </div>
      </td>

      <td className="px-6 py-4">{data.date.split("T")[0]}</td>
      <td className="px-6 py-4">{data.address}</td>

      <td className="px-6 py-4">{formattedCost(data.total)}</td>
      <td className="px-6 py-4">
        <p className="bg-amber-200 text-center rounded-lg font-bold text-amber-500">
          {data.status}
        </p>
      </td>
      <td className="px-6 py-4">
        <button className="text-blue-500">View</button>
      </td>
    </tr>
  );
};

export default memo(TabelRows);
