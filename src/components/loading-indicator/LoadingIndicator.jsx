import { Oval } from "react-loader-spinner";

const LoadingIndicator = ({ text }) => {
  return (
    <div className="bg-white flex  flex-col flex-1 justify-center items-center text-sm">
      <Oval color="#F47A00" secondaryColor="#F47A00" />
      {text ? <p>{text}</p> : null}
    </div>
  );
};

export default LoadingIndicator;
