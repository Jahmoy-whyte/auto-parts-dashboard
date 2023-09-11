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
        className="flex border-2  rounded-md h-10 px-2 outline-none"
        type={type}
        onChange={(e) => onChangeHandler(name, e.currentTarget.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextBox;
