import formattedCost from "../../../../helper/format-cost/formattedCost";
const OrderTable = ({ orders }) => {
  return (
    <div className="flex flex-col bg-white p-5    overflow-x-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold">Orders</h2>
        <p className="text-blue-600">View All</p>
      </div>
      <table className="text-sm">
        <thead className="text-left">
          <tr className="h-11 bg-slate-100">
            <th className="px-6 py-4">Order Id</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Address</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((data) => {
            return (
              <tr>
                <td className="px-6 py-4">#{data.id}</td>
                <td className="px-6 py-4">{data.date.split("T")[0]}</td>
                <td className="px-6 py-4">{data.address}</td>
                <td className="px-6 py-4">{data.quantity}</td>
                <td className="px-6 py-4">{formattedCost(data.total)}</td>
                <td className="px-6 py-4">
                  {data.status == "" ? (
                    <p className="bg-amber-200 text-center rounded-lg font-bold text-amber-500">
                      Here
                    </p>
                  ) : (
                    <p>{data.status}</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
