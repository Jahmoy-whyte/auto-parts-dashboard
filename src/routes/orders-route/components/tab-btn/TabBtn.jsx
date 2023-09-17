const TabBtn = ({ text, number = 0, selected, onClick, value = "" }) => {
  const selectedState = {
    on: "text-white bg-secondary",
  };
  return (
    <button
      onClick={() => onClick("currentTable", value)}
      className={`flex flex-1 justify-center items-center gap-2 border-l-2 p-2  text-sm ${
        selected == value ? selectedState.on : ""
      }`}
    >
      {text}
      {number ? `(${number})` : ""}
    </button>
  );
};

export default TabBtn;
