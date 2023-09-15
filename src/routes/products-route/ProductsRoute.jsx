import PageNumbers from "./components/page-numbers/PageNumbers";
import TabelRows from "./components/table-rows/TabelRows";
import useProducts from "./useProducts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Oval } from "react-loader-spinner";
import PageNumberPagination from "./components/page-number-pagination/PageNumberPagination";
import ToolBar from "./components/tool-bar/ToolBar";
import { useNavigate } from "react-router-dom";
const ProductsRoute = () => {
  const [state, dispatch, getProducts, prev, next, deleteProduct] =
    useProducts();
  const nav = useNavigate();

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">Products</h1>

        <div className="flex flex-col bg-white p-5   ">
          <ToolBar
            dispatch={dispatch}
            state={state}
            deleteProduct={deleteProduct}
          />
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
                  <th className="px-6 py-4">Image</th>
                </tr>
              </thead>

              <tbody>
                {state.isLoading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className=" flex  justify-center mt-5">
                        <Oval
                          color="#F47A00"
                          secondaryColor="#F47A00"
                          width={40}
                          height={40}
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  state.products.map((data) => {
                    return (
                      <TabelRows
                        data={data}
                        key={data.id}
                        dispatch={dispatch}
                        nav={nav}
                      />
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <PageNumberPagination
          next={next}
          prev={prev}
          state={state}
          getProducts={getProducts}
        />
      </div>
    </div>
  );
};

export default ProductsRoute;
