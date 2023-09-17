import { memo } from "react";
import formattedCost from "../../../../helper/format-cost/formattedCost";
const TabelRows = ({ data }) => {
  return (
    <tr>
      <td className="px-6 py-4">{data.productName}</td>
      <td className="px-6 py-4">{"#" + data?.productId}</td>
      <td className="px-6 py-4">{formattedCost(data.price)}</td>
      <td className="px-6 py-4">{data?.quantity}</td>
      <td className="px-6 py-4">
        {formattedCost(data.price * data?.quantity)}
      </td>
    </tr>
  );
};

export default memo(TabelRows);
