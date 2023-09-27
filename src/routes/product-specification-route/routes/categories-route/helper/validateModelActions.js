import { BUTTON_ACTION_TYPE } from "../../../constants/constants";
const validateModelActions = (state) => {
  const text = state.modelData.textBoxValue;
  const id = state.modelData.id;
  const actionType = state.modelData.actionType;

  switch (actionType) {
    case BUTTON_ACTION_TYPE.Add: {
      if (text == "") throw new Error("Please enter category name");
      return { url: "/categories/", action: "POST", data: { category: text } };
    }

    case BUTTON_ACTION_TYPE.Update: {
      if (text == "") throw new Error("Please enter category name");
      return {
        url: "/categories/",
        action: "PATCH",
        data: { categoryId: id, category: text },
      };
    }

    case BUTTON_ACTION_TYPE.Delete: {
      if (id == "") throw new Error("Id not found");
      return {
        url: "/categories/",
        action: "DELETE",
        data: { categoryId: id },
      };
    }

    default:
      throw new Error("Action not found");
  }
};
export default validateModelActions;
