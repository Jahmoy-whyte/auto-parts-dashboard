import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BUTTON_ACTION_TYPE } from "../../constants/constants";
const SingleCard = ({ data, dispatch, state, dispatchType }) => {
  return (
    <div className="flex justify-between p-2 border-2 rounded-md items-center">
      <p>{data.data}</p>

      <div className="flex gap-2 items-center">
        <AiOutlineEdit
          onClick={() =>
            dispatch({
              type: dispatchType,
              payload: {
                id: data.id,
                visible: true,
                textBoxPlaceHolder: "Type Here",
                textBoxValue: data.data,
                title: "state.selected",
                subText: "Enter into the text box below",
                actionType: BUTTON_ACTION_TYPE.Update,
              },
            })
          }
        />
        <AiOutlineDelete />
      </div>
    </div>
  );
};

export default SingleCard;
