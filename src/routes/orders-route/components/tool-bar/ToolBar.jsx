import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";
import { Oval } from "react-loader-spinner";
const ToolBar = ({ state, setState }) => {
  return (
    <div className="flex gap-2 mb-5">
      <div className="border-2 rounded-md px-2 flex items-center gap-2">
        <AiOutlineSearch />
        <input
          className="outline-none "
          onChange={(e) => setState("searchText", e.target.value)}
          value={state.searchText}
          placeholder="Search"
        />
        {state.searchText != "" ? (
          <p onClick={() => setState("searchText", "")}>Clear</p>
        ) : null}
      </div>

      <select
        onClick={(e) => setState("filter", e.target.value)}
        className="border-[0.5px] rounded-sm text-sm border-gray-300 p-2"
      >
        <option value="user_id">User Id</option>
        <option value="order_id">Order Id</option>
        <option value="date">Date</option>
      </select>
      {state.isLoading ? (
        <Oval color="#F47A00" secondaryColor="#F47A00" width={30} height={30} />
      ) : null}
    </div>
  );
};

export default memo(ToolBar);
