import TabelRows from "./components/table-rows/TabelRows";
import useProducts from "./useProducts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ACTIONS } from "./helper/reducerHelper";
import ToolBar from "../../components/tool-bar/ToolBar";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
const ProductsRoute = () => {
  const [
    state,
    dispatch,
    deleteProduct,
    pages,
    setCurrentPage,
    currentPage,
    prev,
    next,
  ] = useProducts();
  const nav = useNavigate();

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">Products</h1>

        <div className="flex flex-col bg-white p-5   ">
          <ToolBar
            isLoading={state.isLoading}
            searchTextOnChange={(value) =>
              dispatch({ type: ACTIONS.SET_SEARCH_TEXT, payload: value })
            }
            filterOnChange={(value) =>
              dispatch({ type: ACTIONS.SET_FILTER, payload: value })
            }
            searchText={state.searchText}
            dropDownOptions={state.filterOptions}
            deleteBtnIsloading={state.deleteBtnIsloading}
            deleteFunc={deleteProduct}
            selected={state.selected}
          >
            <Button
              className="h-9  min-w-[56px] px-2  text-sm border-2 border-white"
              onClick={() => nav("/home/products/add")}
              text={"Add"}
            />
          </ToolBar>

          <div className="flex flex-col bg-white   overflow-x-auto">
            <table className="text-sm">
              <thead className="text-left ">
                <tr className="h-11 bg-slate-100">
                  <th className="px-6 py-4 ">
                    <input
                      type="checkbox"
                      checked={state.checkAll}
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch({ type: ACTIONS.select_all });
                        } else {
                          dispatch({ type: ACTIONS.clear_selected });
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Make</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Edit</th>
                </tr>
              </thead>

              <tbody>
                {!state.isLoading &&
                  state.products.map((data) => {
                    return (
                      <TabelRows
                        selected={state.selected}
                        data={data}
                        key={data.id}
                        dispatch={dispatch}
                        nav={nav}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          visible={state.searchText == "" ? true : false}
          currentPage={currentPage}
          next={next}
          prev={prev}
          onClick={setCurrentPage}
          pages={pages}
        />
      </div>
    </div>
  );
};

/*
 <ToolBar
            isLoading={state.isLoading}
            searchTextOnChange={(value) =>
              dispatch({ type: ACTIONS.set_search_text, payload: value })
            }
            filterOnChange={(value) =>
              dispatch({ type: ACTIONS.set_filter_value, payload: value })
            }
            searchText={state.searchText}
            dropDownOptions={state.dropDown}
            deleteBtnIsloading={state.deleteBtnIsloading}
            deleteFunc={deleteRow}
            selected={state.selected}
          >
            <Button
              className="h-9  min-w-[56px] px-2  text-sm border-2 border-white"
              onClick={() => nav("/home/employees/edit/add")}
              text={"Add"}
            />
          </ToolBar>

*/

export default ProductsRoute;
