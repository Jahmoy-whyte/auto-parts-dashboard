const TabBtn = ({ text, number = 0, selected, onClick, value = "" }) => {
  const selectedState = {
    on: "text-white bg-secondary",
  };
  return (
    <button
      onClick={() => onClick("currentTable", value)}
      className={`flex  justify-center items-center gap-2 h-7 rounded-2xl text-sm sm:flex-1 ${
        selected == value ? selectedState.on : ""
      }`}
    >
      {text}
      {number ? `(${number})` : ""}
    </button>
  );
};

export default TabBtn;
