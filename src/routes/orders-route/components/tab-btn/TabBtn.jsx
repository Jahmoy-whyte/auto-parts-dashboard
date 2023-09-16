const TabBtn = ({ text, number = 0, selected, onClick }) => {
  const selectedState = {
    on: "text-white bg-secondary",
  };
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 justify-center items-center gap-2 border-l-2 p-2  text-sm ${
        selected ? selectedState.on : ""
      }`}
    >
      {text}
      {number ? `(${number})` : ""}
    </button>
  );
};

export default TabBtn;
