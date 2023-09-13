const SelectBox = ({
  onClick,
  value,
  placeHolder = "Enter",
  buttonText = "Select",
  name = "",
  label = "label",
}) => {
  return (
    <>
      <label className="text-sm">{label}:</label>
      <div
        className={`flex h-10 items-center justify-between border-2 rounded-md text-sm pl-2 ${
          value ? "" : "text-gray-400"
        }`}
      >
        <p>{value ? value : placeHolder}</p>
        <button
          onClick={onClick}
          className="bg-secondary h-full px-2 text-white rounded-md"
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default SelectBox;
