import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";
import { Oval } from "react-loader-spinner";

import Button from "../button/Button";
const ToolBar = ({
  searchTextOnChange,
  filterOnChange,
  children,
  selected = [],
  deleteFunc,
  searchText = "",
  isLoading = false,
  deleteBtnIsloading = false,
  dropDownOptions = [],
}) => {
  return (
    <div className="flex flex-col gap-2 mb-2  sm:flex-row">
      <div className="flex border-2 rounded-md pl-2  items-center gap-2  h-9">
        <AiOutlineSearch color="black" />
        <input
          className="outline-none w-full bg-transparent"
          onChange={(e) => searchTextOnChange(e.target.value)}
          value={searchText}
          placeholder="Search..."
        />
      </div>

      <select
        onChange={(e) => filterOnChange(e.target.value)}
        className="rounded-md text-sm border-2  h-9  outline-none bg-white"
      >
        {dropDownOptions.map((option) => (
          <option value={option.value}>{option.text}</option>
        ))}
      </select>

      <div className="flex gap-2 items-center">
        <div className="flex flex-1">
          <Button
            visible={selected.length > 0 ? true : false}
            isDisabled={deleteBtnIsloading}
            isLoading={deleteBtnIsloading}
            onClick={deleteFunc}
            text={"Delete"}
            className="border-white border-2 h-9 px-2 min-w-[50px] bg-red-500 text-sm flex-1"
          />

          {children}
        </div>

        <Oval
          visible={isLoading}
          color="#F47A00"
          secondaryColor="#F47A00"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default ToolBar;
