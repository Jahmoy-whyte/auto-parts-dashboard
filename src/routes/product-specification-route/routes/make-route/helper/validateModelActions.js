import { BUTTON_ACTION_TYPE } from "../../../constants/constants";
const validateModelActions = (state) => {
  const text = state.modelData.textBoxValue;
  const id = state.modelData.id;
  const actionType = state.modelData.actionType;

  switch (actionType) {
    case BUTTON_ACTION_TYPE.Add: {
      if (text == "") throw new Error("Please enter make name");
      return { url: "/make/", action: "POST", data: { make: text } };
    }

    case BUTTON_ACTION_TYPE.Update: {
      if (text == "") throw new Error("Please enter make name");
      return {
        url: "/make/",
        action: "PATCH",
        data: { makeId: id, make: text },
      };
    }

    case BUTTON_ACTION_TYPE.Delete: {
      if (id == "") throw new Error("Id not found");
      return { url: "/make/", action: "DELETE", data: { makeId: id } };
    }

    default:
      throw new Error("Action not found");
  }
};
export default validateModelActions;
