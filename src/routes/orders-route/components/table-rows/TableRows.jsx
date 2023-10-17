import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
import { ACTIONS } from "../../helper/reducerHelper";
import { Link } from "react-router-dom";
import InitialCapitalization from "../../../../helper/initial-capitalization/InitialCapitalization";
const TabelRows = ({ data, dispatch, selected = [] }) => {
  return (
    <tr>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selected.includes(data.id)}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              dispatch({
                type: ACTIONS.single_select,
                payload: data.id,
              });
            } else {
              dispatch({ type: ACTIONS.single_deselect, payload: data.id });
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
        <p className="text-center rounded-md p-1 text-blue-500 border-blue-500 border-[1px]">
          {data.status == "sent" ? "New" : InitialCapitalization(data.status)}
        </p>
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/home/orders/edit/${data.status}/${data.id}`}
          className="text-blue-500"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default memo(TabelRows);
