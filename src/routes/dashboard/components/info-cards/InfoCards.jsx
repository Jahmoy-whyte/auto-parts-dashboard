import account from "../../../../assets/images/account.svg";
import { BsGraphUp } from "react-icons/bs";
const InfoCards = ({ title, number, icon, color = "default" }) => {
  const colorVariants = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    default: "bg-secondary",
  };
  return (
    <div
      className={`flex flex-col bg-white min-h-[80px]  p-5   flex-1 overflow-hidden`}
    >
      <div className="flex gap-5">
        <div className="text-sm flex-1">
          <p className="">{title}</p>
          <h2 className="font-bold text-lg">{number}</h2>
        </div>

        <div
          className={`flex justify-center items-center w-10 h-10  rounded-md bg-secondary text-white text-xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
