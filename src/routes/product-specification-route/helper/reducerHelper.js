export const initialState = {
  isLoading: false,
  tableData: [],
  deleteIsLoading: false,
  modelData: {
    id: "",
    visible: false,
    textBoxPlaceHolder: "",
    textBoxValue: "",
    title: "",
    subText: "",
    actionType: "Add",
    btnIsloading: false,
    dropDown: {
      text: "",
      value: "",
      options: [{ text: "", value: "" }],
    },
  },
};

export const ACTIONS = {
  set_tableData: "set_tableData",
  set_deleteIsLoading: "set_deleteIsLoading",
  set_isLoading: "set_isLoading",
  set_model_data: "set_model_data",
  set_dropdown: "set_dropdown",
  set_dropdown_on_select: "set_dropdown_on_select",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "set_tableData": {
      return { ...state, tableData: action.payload, isLoading: false };
    }
    case "set_isLoading":
      return { ...state, isLoading: action.payload };
    case "set_deleteIsLoading":
      return { ...state, deleteIsLoading: action.payload };

    case "set_model_data": {
      const modelData = action.payload;
      return {
        ...state,
        modelData: {
          ...state.modelData,
          ...modelData,
        },
      };
    }

    case "set_dropdown": {
      const options = action.payload;
      return {
        ...state,
        modelData: {
          ...state.modelData,
          dropDown: {
            ...state.modelData.dropDown,
            options: options,
          },
        },
      };
    }

    case "set_dropdown_on_select": {
      const text = action.payload.text;
      const value = action.payload.value;
      return {
        ...state,
        modelData: {
          ...state.modelData,
          dropDown: {
            ...state.modelData.dropDown,
            text: text,
            value: value,
          },
        },
      };
    }

    default:
      return state;
  }
};
