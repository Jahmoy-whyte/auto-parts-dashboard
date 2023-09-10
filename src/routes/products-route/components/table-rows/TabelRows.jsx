import { memo } from "react";

const TabelRows = ({ data }) => {
  //  console.log("dwdwdwddddddddddddd");
  return (
    <tr>
      <td className="px-6 py-4">
        <input type="checkbox" />
      </td>
      <td className="px-6 py-4">{data.productName}</td>
      <td className="px-6 py-4">{data.make}</td>
      <td className="px-6 py-4">{data.model}</td>
      <td className="px-6 py-4">{data.price}</td>
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
