const InfoRow = ({ topText, bottomText }) => {
  return (
    <div>
      <h2 className="font-bold"> {topText}</h2>
      <p>{bottomText}</p>
    </div>
  );
};

export default InfoRow;
