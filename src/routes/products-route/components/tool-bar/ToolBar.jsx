import { ACTIONS } from "../../helper/reducerHelper";
import { AiOutlineSearch } from "react-icons/ai";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ToolBar = ({ state, dispatch }) => {
  const nav = useNavigate();
  return (
    <div className="flex gap-5 items-center mb-5 flex-wrap">
      <div className="flex items-center gap-2 px-2 border-2  h-9 rounded-md text-sm max-w-xs">
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

      {state.selected.length > 0 ? (
        <button className="h-9 px-2 bg-red-500 rounded-md text-white text-sm">
          Delete
        </button>
      ) : null}

      <button
        onClick={() => nav("/home/products/add")}
        className="border-2  border-white h-9 px-2 bg-blue-500 rounded-md text-white text-sm"
      >
        Add
      </button>
    </div>
  );
};

export default ToolBar;
