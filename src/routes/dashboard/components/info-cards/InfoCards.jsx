import account from "../../../../assets/images/account.svg";
import { BsGraphUp } from "react-icons/bs";
const InfoCards = ({ title, number, img, color }) => {
  return (
    <div className="flex flex-col bg-white max-h-20  p-5  justify-center flex-1 overflow-hidden">
      <div className="flex gap-5">
        <div className="text-sm flex-1">
          <h2 className="font-bold">{number}</h2>
          <p className="">{title}</p>
          <p className="flex items-center gap-1">
            <BsGraphUp color="green" /> %10
          </p>
        </div>

        <div className="flex justify-center items-center w-10 h-10 bg-secondary">
          <img src={account} className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
