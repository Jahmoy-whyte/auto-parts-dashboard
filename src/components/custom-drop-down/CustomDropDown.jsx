import { useEffect, useState, memo } from "react";
import { BsChevronDown } from "react-icons/bs";

const CustomDropDown = ({
  label = "label",
  value = "",
  options = [],
  onClick,
  placeHolder = "",
  dropDownId = "dropId",
}) => {
  console.log("====================== dropdwon");
  useEffect(() => {
    const click = (e) => {
      console.log(e.target.id);
      if (e.target.id != dropDownId) {
        setOpen(false);
      }
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <label className="text-sm">{label}</label>
      <div className="flex flex-col relative text-sm">
        <button
          onClick={() => setOpen(!open)}
          id={dropDownId}
          className="flex items-center justify-center border-2 rounded-md h-10 p-2 relative bg-white"
        >
          <h2 className="text-center">{value == "" ? placeHolder : value}</h2>
          <div className="absolute right-2">
            <BsChevronDown />
          </div>
        </button>
        {open ? (
          <div
            className="flex flex-col border-2 absolute top-10 bg-white w-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option) => {
              return (
                <button
                  className="h-10"
                  onClick={() => {
                    onClick(option);
                    setOpen(false);
                  }}
                >
                  <p>{option}</p>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CustomDropDown;
