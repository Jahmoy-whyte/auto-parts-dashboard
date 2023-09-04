const TextBox = ({
  onChangeHandler,
  label,
  placeHolder,
  name,
  type = "text",
  isDisabled,
}) => {
  return (
    <div className="flex flex-col text-sm">
      <label>{label}</label>
      <input
        disabled={isDisabled}
        className="flex bg-gray-100 border-gray-500 rounded-md h-10 p-2 outline-none"
        type={type}
        onChange={(e) => onChangeHandler(name, e.currentTarget.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextBox;
