const TotalBars = ({ leftText, rightText }) => {
  return (
    <div className="flex justify-between text-sm py-1">
      <p className="font-bold">{leftText}:</p>
      <p>{rightText}</p>
    </div>
  );
};

export default TotalBars;
