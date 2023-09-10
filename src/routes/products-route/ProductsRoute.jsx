import PageNumbers from "./components/page-numbers/PageNumbers";
import TabelRows from "./components/table-rows/TabelRows";
import useProducts from "./useProducts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { MdFilterList } from "react-icons/md";
import { ACTIONS } from "./helper/reducerHelper";

const ProductsRoute = () => {
  const [state, dispatch, getProducts, prev, next] = useProducts();

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">Products</h1>

        <div className="flex flex-col bg-white p-5   ">
          <div className="flex gap-5 items-center mb-5 flex-wrap">
            <div className="flex items-center gap-2 px-2 border-2  h-9 rounded-md text-sm">
              <AiOutlineSearch />
              <input
                type="text"
                placeholder="Search"
                className="outline-none"
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.SET_SEARCH_TEXT,
                    payload: e.currentTarget.value,
                  })
                }
                value={state.searchText}
              />
              {state.searchText != "" ? (
                <p
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.SET_SEARCH_TEXT,
                      payload: "",
                    })
                  }
                >
                  clear
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-2 px-2 border-2  h-9 rounded-md  text-sm">
              <MdFilterList />
              <select
                className="outline-none"
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.SET_FILTER,
                    payload: e.currentTarget.value,
                  })
                }
              >
                <option value={"product_name"}>Product</option>
                <option value={"product_id"}>Id</option>
              </select>
            </div>
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
                  return <TabelRows data={data} key={data.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end my-2">
          <div className="flex text-sm">
            <button onClick={prev} className="border-2 p-2">
              prev
            </button>
            <div className="flex ">
              {state.pageChunk.map((num) => {
                return (
                  <PageNumbers
                    state={state}
                    number={num}
                    onClick={getProducts}
                    key={num}
                  />
                );
              })}
            </div>
            <button onClick={next} className="border-2 p-2 ">
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsRoute;
