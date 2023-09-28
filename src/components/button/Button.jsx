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
    "bg-secondary h-9 rounded-lg text-white font-bold active:scale-95",
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
          {isLoading ? "Loading..." : text}{" "}
        </button>
      ) : null}
    </>
  );
};

export default Button;
