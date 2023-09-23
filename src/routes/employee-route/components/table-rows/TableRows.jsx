import { memo } from "react";
import { ACTIONS } from "../../helper/reducerHelper";
const TableRows = ({ data, dispatch, nav, selected = [] }) => {
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
      <td className="px-6 py-4 ">{data.id}</td>
      <td className="px-6 py-4">{data.firstName}</td>
      <td className="px-6 py-4">{data.lastName}</td>
      <td className="px-6 py-4 ">{data.email}</td>
      <td className="px-6 py-4">{data.role}</td>

      <td className="px-6 py-4">
        <button
          className="text-blue-500"
          onClick={() => nav(`/home/employees/edit/${data.id}`)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default memo(TableRows);
