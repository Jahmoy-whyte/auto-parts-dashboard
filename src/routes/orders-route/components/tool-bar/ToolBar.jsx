import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { memo } from "react";
import { Oval } from "react-loader-spinner";
const ToolBar = ({ state, setState, deleteOrders }) => {
  return (
    <div className="flex  gap-2 mb-2">
      <div className="max-w-[230px] border-2 rounded-md px-2 flex flex-1 items-center gap-2 ">
        <AiOutlineSearch color="gray" />
        <input
          className="outline-none  w-full"
          onChange={(e) => setState("searchText", e.target.value)}
          value={state.searchText}
          placeholder="Search..."
        />

        {state.searchText != "" ? (
          <AiOutlineCloseCircle
            color="gray"
            onClick={() => setState("searchText", "")}
          />
        ) : null}
      </div>

      <select
        onChange={(e) => setState("filter", e.target.value)}
        className="border-2 rounded-md text-sm  h-9  outline-none"
      >
        <option value="user_id">User Id</option>
        <option value="order_id">Order Id</option>
        <option value="date">Date</option>
      </select>

      {state.selected.length > 0 ? (
        <button
          onClick={deleteOrders}
          className="border-white border-2 h-9 px-2 min-w-[50px] bg-red-500 rounded-md text-white text-sm flex justify-center items-center"
        >
          {state.deleteBtnIsloading ? (
            <Oval width={15} height={15} color="white" secondaryColor="white" />
          ) : (
            "Delete"
          )}
        </button>
      ) : null}

      {state.isLoading ? (
        <Oval color="#F47A00" secondaryColor="#F47A00" width={30} height={30} />
      ) : null}
    </div>
  );
};

export default memo(ToolBar);
