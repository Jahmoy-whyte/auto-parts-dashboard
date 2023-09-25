import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const Card = ({ text }) => {
  return (
    <div className="flex justify-between p-2 border-2 rounded-md items-center">
      <p>{text}</p>

      <div className="flex gap-2 items-center">
        <AiOutlineEdit />
        <AiOutlineDelete />
      </div>
    </div>
  );
};

export default Card;
