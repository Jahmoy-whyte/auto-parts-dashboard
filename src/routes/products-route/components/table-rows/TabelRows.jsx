import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
import { ACTIONS } from "../../helper/reducerHelper";
const TabelRows = ({ data, dispatch }) => {
  //console.log("dwdwdwddddddddddddd");
  return (
    <tr>
      <td className="px-6 py-4">
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
      <td className="px-6 py-4">{data.productName}</td>
      <td className="px-6 py-4">{data.make}</td>
      <td className="px-6 py-4">{data.model}</td>
      <td className="px-6 py-4">{formattedCost(data.price)}</td>
      <td className="px-6 py-4">
        <p className="bg-amber-200 text-center rounded-lg font-bold text-amber-500">
          Here
        </p>
      </td>
      <td className="px-6 py-4">
        <img src={data.image} className="bg-gray-200 rounded-md p-2 w-20" />
      </td>
    </tr>
  );
};

export default memo(TabelRows);
