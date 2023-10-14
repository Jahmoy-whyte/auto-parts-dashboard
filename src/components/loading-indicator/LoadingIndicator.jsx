import { Oval } from "react-loader-spinner";

const LoadingIndicator = ({ text }) => {
  return (
    <div className="bg-white flex  flex-col flex-1 justify-center items-center text-sm">
      <Oval color="#F47A00" secondaryColor="#F47A00" height={50} width={50} />
      {text ? <p className="mt-2 max-w-md text-center mx-5">{text}</p> : null}
    </div>
  );
};

export default LoadingIndicator;
