const TabButton = ({ text, number = 0, selected, onClick, value = "" }) => {
  const selectedState = {
    on: "text-black font-bold bg-white",
  };
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex  justify-center items-center gap-2 h-7 rounded-md text-sm sm:flex-1 ${
        selected == value ? selectedState.on : ""
      }`}
    >
      {text}
      {number ? `(${number})` : ""}
    </button>
  );
};

export default TabButton;
