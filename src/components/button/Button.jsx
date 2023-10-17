import { Oval } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";
const Button = ({
  visible = true,
  className = "",
  onClick,
  text,
  isLoading = false,
  isDisabled = false,
}) => {
  const myclass = twMerge(
    "flex justify-center items-center bg-secondary h-9 rounded-lg text-white font-bold  active:scale-95 ",
    className
  );

  return (
    <>
      {visible ? (
        <button
          disabled={isLoading || isDisabled}
          className={myclass}
          onClick={(e) => {
            onClick();
          }}
        >
          {isLoading ? (
            <Oval color="white" secondaryColor="white" height={20} width={20} />
          ) : (
            text
          )}{" "}
        </button>
      ) : null}
    </>
  );
};

export default Button;
