import { memo } from "react";
import { ACTIONS } from "../../helper/reducerHelper";
import { Link } from "react-router-dom";
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
        <Link className="text-blue-500" to={`/home/employees/edit/${data.id}`}>
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default memo(TableRows);
