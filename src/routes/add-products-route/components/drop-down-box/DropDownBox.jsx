import { useEffect, useState, memo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Oval } from "react-loader-spinner";

const DropDownBox = ({
  label = "label",
  text = "",
  options = [],
  onClick,
  placeHolder = "",
  name = "dropId",
  isLoading = false,
  disabled = false,
}) => {
  console.log("====================== dropdwon");

  useEffect(() => {
    const click = (e) => {
      if (e.target.id != name) {
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
      <div className="flex flex-col relative text-sm ">
        <button
          onClick={() => {
            if (disabled) return;
            setOpen(!open);
          }}
          id={name}
          className={`flex items-center justify-center border-2 rounded-md h-10 p-2 relative ${
            disabled ? "bg-slate-300" : "bg-white"
          }  ${text == "" ? "text-gray-500" : ""}  `}
        >
          {text == "" ? placeHolder : text}
          <div className="absolute right-2">
            <BsChevronDown />
          </div>
        </button>
        {open ? (
          <div
            className="flex flex-col border-2 absolute top-10 bg-white w-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex justify-center py-2">
                <Oval
                  color="#F47A00"
                  secondaryColor="#F47A00"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              options.map((option) => {
                return (
                  <button
                    key={option.id}
                    className="h-10"
                    onClick={() => {
                      onClick(name, option.id, option.text);
                      setOpen(false);
                    }}
                  >
                    {option.text}
                  </button>
                );
              })
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default memo(DropDownBox);
