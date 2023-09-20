import { memo } from "react";

const Pagination = ({ pages = [], next, prev, onClick, currentPage }) => {
  console.log("========== Pagination================= Pagination ");
  const selectedColor = {
    selected: "bg-secondary text-white",
  };
  return (
    <div className="flex justify-end">
      <div className="flex text-sm h-9">
        <button className="border-2 p-2" onClick={prev}>
          prev
        </button>
        {pages.map((number) => (
          <button
            className={`border-2 p-2  ${
              currentPage == number ? selectedColor.selected : ""
            } `}
            onClick={() => onClick(number)}
          >
            {number + 1}
          </button>
        ))}
        <button className="border-2 p-2" onClick={next}>
          next
        </button>
      </div>
    </div>
  );
};

export default memo(Pagination);
