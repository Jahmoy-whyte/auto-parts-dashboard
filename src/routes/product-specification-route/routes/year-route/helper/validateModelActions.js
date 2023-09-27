import { BUTTON_ACTION_TYPE } from "../../../constants/constants";
const validateModelActions = (state) => {
  const text = state.modelData.textBoxValue;
  const id = state.modelData.id;
  const actionType = state.modelData.actionType;
  const dropDownValue = state.modelData.dropDown.value;
  switch (actionType) {
    case BUTTON_ACTION_TYPE.Add: {
      if (dropDownValue == "") throw new Error("Please select model");
      if (text == "") throw new Error("Please enter year");

      return {
        url: "/year/",
        action: "POST",
        data: { year: text, modelId: dropDownValue },
      };
    }

    case BUTTON_ACTION_TYPE.Update: {
      if (dropDownValue == "") throw new Error("Please select model");
      if (text == "") throw new Error("Please enter year");

      return {
        url: "/year/",
        action: "PATCH",
        data: { yearId: id, year: text, modelId: dropDownValue },
      };
    }

    case BUTTON_ACTION_TYPE.Delete: {
      if (id == "") throw new Error("Id not found");
      return { url: "/year/", action: "DELETE", data: { yearId: id } };
    }

    default:
      throw new Error("Action not found");
  }
};
export default validateModelActions;
