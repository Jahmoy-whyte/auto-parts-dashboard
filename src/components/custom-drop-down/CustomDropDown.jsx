import { useEffect, useState, memo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";
const CustomDropDown = ({
  className,
  label = null,
  value = "",
  options = [{ text: "", value: "" }],
  onClick,
  placeHolder = "",
  name = "dropId",
  isDisabled = false,
  showLabel = true,
}) => {
  useEffect(() => {
    const click = (e) => {
      if (e.target.id != name) {
        setOpen(false);
      }
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  const customClass = twMerge(
    "flex flex-col relative text-sm min-w-[100px]",
    className
  );

  const [open, setOpen] = useState(false);

  return (
    <div>
      {label ? <label className="text-sm">{label}</label> : null}
      <div className={customClass}>
        <button
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
          id={name}
          className="flex items-center justify-center border-2 rounded-md h-10 p-2 relative bg-white"
        >
          {value == "" ? placeHolder : value}
          <div className="absolute right-2">
            <BsChevronDown />
          </div>
        </button>
        {open ? (
          <div
            className="flex flex-col border-2 absolute top-10 bg-white w-full z-10 overflow-y-auto max-h-44"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option, index) => {
              return (
                <button
                  key={index}
                  className="py-2"
                  onClick={() => {
                    onClick(name, option.value, option.text);
                    setOpen(false);
                  }}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomDropDown;
