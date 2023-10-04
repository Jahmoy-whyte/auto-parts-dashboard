import formattedCost from "../../../../helper/format-cost/formattedCost";
import { Link } from "react-router-dom";
const OrderTable = ({ orders }) => {
  return (
    <div className="flex flex-col bg-white p-5  overflow-x-auto     flex-1">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold">Orders</h2>
        <Link className="text-blue-600 cursor-pointer" to={"/home/orders"}>
          View All
        </Link>
      </div>
      <div className="flex  flex-col overflow-x-auto flex-1">
        <table className="text-sm">
          <thead className="text-left">
            <tr className="h-11 bg-slate-100">
              <th className="px-6 py-4">Order Id</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">View</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((data) => {
              return (
                <tr key={data.id}>
                  <td className="px-6 py-4">#{data.id}</td>
                  <td className="px-6 py-4">{data.date.split("T")[0]}</td>
                  <td className="px-6 py-4">{data.address}</td>
                  <td className="px-6 py-4">{data.quantity}</td>
                  <td className="px-6 py-4">{formattedCost(data.total)}</td>
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
