import { BUTTON_ACTION_TYPE } from "../../../constants/constants";
const validateModelActions = (state) => {
  const text = state.modelData.textBoxValue;
  const id = state.modelData.id;
  const actionType = state.modelData.actionType;
  const dropDownValue = state.modelData.dropDown.value;
  switch (actionType) {
    case BUTTON_ACTION_TYPE.Add: {
      if (dropDownValue == "") throw new Error("Please select make");
      if (text == "") throw new Error("Please enter model name");

      return {
        url: "/model/",
        action: "POST",
        data: { model: text, makeId: dropDownValue },
      };
    }

    case BUTTON_ACTION_TYPE.Update: {
      if (dropDownValue == "") throw new Error("Please select make");
      if (text == "") throw new Error("Please enter model name");

      return {
        url: "/model/",
        action: "PATCH",
        data: { modelId: id, model: text, makeId: dropDownValue },
      };
    }

    case BUTTON_ACTION_TYPE.Delete: {
      if (id == "") throw new Error("Id not found");
      return { url: "/model/", action: "DELETE", data: { modelId: id } };
    }

    default:
      throw new Error("Action not found");
  }
};
export default validateModelActions;
