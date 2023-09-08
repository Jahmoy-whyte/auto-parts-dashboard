import account from "../../../../assets/images/account.svg";
import { BsGraphUp } from "react-icons/bs";
const InfoCards = ({ title, number, img, color = "default" }) => {
  const colorVariants = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    default: "bg-secondary",
  };
  return (
    <div
      className={`flex flex-col bg-white min-h-[80px]  p-5  justify-center flex-1 overflow-hidden`}
    >
      <div className="flex gap-5">
        <div className="text-sm flex-1">
          <h2 className="font-bold">{number}</h2>
          <p className="">{title}</p>
          <p className={`flex items-center gap-1 mt-1 `}>
            <BsGraphUp color="green" /> %10
          </p>
        </div>

        <div
          className={`flex justify-center items-center w-10 h-10 ${colorVariants[color]}`}
        >
          <img src={account} className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
