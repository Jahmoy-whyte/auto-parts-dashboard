import { memo } from "react";

const PageNumbers = ({ state, number, onClick }) => {
  //  console.log("======================dwdwd");
  return (
    <button
      onClick={() => onClick(number)}
      className={`border-2 p-2 ${
        state.currentPage == number ? "text-white bg-primary" : ""
      }`}
    >
      {number + 1}
    </button>
  );
};
export default memo(PageNumbers);
