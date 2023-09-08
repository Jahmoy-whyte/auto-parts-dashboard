import useProducts from "./useProducts";

const ProductsRoute = () => {
  const [state, dispatch, getProducts] = useProducts();

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">Products</h1>
        <div className="flex flex-col bg-white p-5   ">
          <div className="flex gap-5 items-center mb-5">
            <div className="border-2 rounded-md p-1 text-sm">
              <input type="text" placeholder="Search" />
            </div>

            <button className="bg-green-400 text-white rounded-md p-1 text-sm">
              Add
            </button>
            <button className="bg-red-400 text-white rounded-md p-1 text-sm">
              Delete
            </button>
          </div>

          <div className="flex flex-col bg-white   overflow-x-auto">
            <table className="text-sm">
              <thead className="text-left">
                <tr className="h-11 bg-slate-100">
                  <th className="px-6 py-4">action</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Make</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Image</th>
                </tr>
              </thead>
              <tbody>
                {state.products.map((data) => {
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
                        <img
                          src={data.image}
                          className="bg-gray-200 rounded-md p-2 w-20"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          {[...Array(state.pageCount).keys()].map((num) => {
            return (
              <button onClick={() => getProducts(num)} className="border-2 p-4">
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsRoute;
