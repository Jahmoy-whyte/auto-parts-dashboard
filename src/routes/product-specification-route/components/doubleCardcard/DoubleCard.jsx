import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BUTTON_ACTION_TYPE } from "../../constants/constants";
import { ACTIONS } from "../../helper/reducerHelper";
const DoubleCard = ({ text1, text2, id1, id2, dispatch, state }) => {
  return (
    <div className="flex justify-between p-2 border-2 rounded-md items-center">
      <div className="flex">
        <p>
          <b>{text1} </b>
          {" / "} {text2}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        <AiOutlineEdit
          onClick={() =>
            dispatch({
              type: ACTIONS.set_model_data,
              payload: {
                id: id2,
                visible: true,
                textBoxPlaceHolder: "Type Here",
                textBoxValue: text2,
                title: "Update",
                subText: "Enter into the text box below",
                actionType: BUTTON_ACTION_TYPE.Update,
                dropDown: {
                  ...state.modelData.dropDown,
                  text: text1,
                  value: id1,
                },
              },
            })
          }
        />
        <AiOutlineDelete
          onClick={() =>
            dispatch({
              type: ACTIONS.set_model_data,
              payload: {
                id: id2,
                visible: true,
                textBoxPlaceHolder: "Type Here",
                textBoxValue: text2,
                title: "Delete",
                subText:
                  "Are you sure you want to delete " +
                  text1 +
                  " / " +
                  text2 +
                  " this action cant be undone",
                actionType: BUTTON_ACTION_TYPE.Delete,

                dropDown: {
                  ...state.modelData.dropDown,
                  text: text1,
                  value: id1,
                },
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default DoubleCard;
