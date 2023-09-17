import { ACTIONS } from "../../helper/reducerHelper";
import { AiOutlineSearch } from "react-icons/ai";
import { MdFilterList } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ToolBar = ({ state, dispatch, deleteProduct }) => {
  const nav = useNavigate();
  return (
    <div className="flex gap-2 items-center mb-5 flex-wrap">
      <div className="flex flex-1 items-center gap-2 px-2 border-2  h-9 rounded-md text-sm ">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full"
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

      <select
        className=" flex items-center gap-2 px-2 border-2  h-9 rounded-md  text-sm outline-none"
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

      {state.selected.length > 0 ? (
        <button
          onClick={deleteProduct}
          className="border-white border-2 h-9 px-2 min-w-[50px] bg-red-500 rounded-md text-white text-sm flex justify-center items-center"
        >
          {state.deleteBtnIsloading ? (
            <Oval width={15} height={15} color="white" secondaryColor="white" />
          ) : (
            "Delete"
          )}
        </button>
      ) : null}

      <button
        onClick={() => nav("/home/products/add")}
        className="border-2  border-white h-9 px-2 bg-blue-500 rounded-md text-white text-sm"
      >
        Add
      </button>
      {state.isLoading ? (
        <div className=" flex  justify-center items-center">
          <Oval
            width={25}
            height={25}
            color="#F47A00"
            secondaryColor="#F47A00"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ToolBar;
