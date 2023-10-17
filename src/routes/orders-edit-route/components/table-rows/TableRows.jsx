import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
import { Link } from "react-router-dom";
const TabelRows = ({ data }) => {
  return (
    <tr>
      <td className="px-6 py-4">{data.productName}</td>
      <td className="px-6 py-4">
        <Link
          to={`/home/products/${data?.productId}`}
          className="text-blue-500"
        >
          {"#" + data?.productId}
        </Link>
      </td>
      <td className="px-6 py-4">{formattedCost(data.price)}</td>
      <td className="px-6 py-4">{data?.quantity}</td>
      <td className="px-6 py-4">
        {formattedCost(data.price * data?.quantity)}
      </td>
    </tr>
  );
};

export default memo(TabelRows);
