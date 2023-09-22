import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";
import { Oval } from "react-loader-spinner";
const ToolBar = ({
  state,
  selected = [],
  setState,
  deleteFunc,
  searchText = "",
  isLoading = false,
  deleteBtnIsloading = false,
  dropDownOptions = [
    {
      text: "",
      value: "",
    },
    {
      text: "",
      value: "",
    },
  ],
}) => {
  console.log("=======================================ddddddddddddd");
  return (
    <div className="flex gap-2 mb-5">
      <div className="flex-1 border-2 rounded-md pl-2 flex items-center gap-2 bg-gray-100">
        <AiOutlineSearch color="gray" />
        <input
          className="outline-none w-full bg-transparent"
          onChange={(e) => setState("searchText", e.target.value)}
          value={searchText}
          placeholder="Search"
        />
        {searchText != "" ? (
          <p onClick={() => setState("searchText", "")}>Clear</p>
        ) : null}

        <select
          onChange={(e) => setState("filter", e.target.value)}
          className="rounded-md text-sm  h-9  outline-none"
        >
          {dropDownOptions.map((option) => (
            <option value={option.value}>{option.text}</option>
          ))}
        </select>
      </div>

      {selected.length > 0 ? (
        <button
          onClick={deleteFunc}
          className="border-white border-2 h-9 px-2 min-w-[50px] bg-red-500 rounded-md text-white text-sm flex justify-center items-center"
        >
          {deleteBtnIsloading ? (
            <Oval width={15} height={15} color="white" secondaryColor="white" />
          ) : (
            "Delete"
          )}
        </button>
      ) : null}

      {isLoading ? (
        <Oval color="#F47A00" secondaryColor="#F47A00" width={30} height={30} />
      ) : null}
    </div>
  );
};

export default memo(ToolBar);
