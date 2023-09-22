const Button = ({ onClick, text, isLoading = false, isDisabled = false }) => {
  return (
    <button
      disabled={isLoading || isDisabled}
      className="  bg-secondary h-9 rounded-lg text-white font-bold active:scale-95"
      onClick={(e) => {
        onClick();
      }}
    >
      {isLoading ? "Loading..." : text}{" "}
    </button>
  );
};

export default Button;
