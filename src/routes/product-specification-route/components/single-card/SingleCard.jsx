import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BUTTON_ACTION_TYPE } from "../../constants/constants";
import { ACTIONS } from "../../helper/reducerHelper";
const SingleCard = ({ id, text, dispatch, state }) => {
  return (
    <div className="flex justify-between p-2 border-2 rounded-md items-center ">
      <p>{text}</p>

      <div className="flex gap-2 items-center">
        <AiOutlineEdit
          onClick={() =>
            dispatch({
              type: ACTIONS.set_model_data,
              payload: {
                id: id,
                visible: true,
                textBoxPlaceHolder: "Type Here",
                textBoxValue: text,
                title: "Update",
                subText: "Enter into the text box below",
                actionType: BUTTON_ACTION_TYPE.Update,
              },
            })
          }
        />
        <AiOutlineDelete
          onClick={() =>
            dispatch({
              type: ACTIONS.set_model_data,
              payload: {
                id: id,
                visible: true,
                textBoxPlaceHolder: "Type Here",
                textBoxValue: text,
                title: "Delete",
                subText:
                  "Are you sure you want to delete " +
                  text +
                  " this action cant be undone",
                actionType: BUTTON_ACTION_TYPE.Delete,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default SingleCard;
