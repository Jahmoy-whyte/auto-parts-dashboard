import { useEffect, useState, memo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Oval } from "react-loader-spinner";

const DropDownBox = ({
  label = "label",
  onClick,
  placeHolder = "",
  name = "dropId",
  state,
}) => {
  /*
   label = "label",
  text = "",
  options = [],
  onClick,
  placeHolder = "",
  name = "dropId",
  isLoading = false,
  disabled = false,
  
  */
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
            if (state.isDisabled) return;
            setOpen(!open);
          }}
          id={name}
          className={`flex items-center justify-center border-2 rounded-md h-10 p-2 relative ${
            state.isDisabled ? "bg-slate-300" : "bg-white"
          }  ${state.text == "" ? "text-gray-500" : ""}  `}
        >
          {state.text == "" ? placeHolder : state.text}
          <div className="absolute right-2">
            <BsChevronDown />
          </div>
        </button>
        {open ? (
          <div
            className="flex flex-col border-2 absolute top-10 bg-white w-full z-10 max-h-40 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {state.isLoading ? (
              <div className="flex justify-center py-2">
                <Oval
                  color="#F47A00"
                  secondaryColor="#F47A00"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              state.data.map((option) => {
                return (
                  <button
                    key={option.id}
                    className="h-10 py-2"
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
