const Button = ({ onClick, text, isLoading }) => {
  return (
    <button
      className="bg-secondary h-9 rounded-lg text-white font-bold active:scale-95"
      onClick={onClick}
    >
      {isLoading ? "Loading..." : text}{" "}
    </button>
  );
};

export default Button;
