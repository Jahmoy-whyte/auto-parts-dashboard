export const initialState = {
  name: "",
  price: "",
  description: "",
  image: null,
  isLoading: false,

  condition: {
    value: "",
    text: "",
    data: [
      { id: "new", text: "New" },
      { id: "used", text: "Used" },
    ],
  },
  newArrival: {
    isLoading: false,
    isDisabled: false,
    value: "",
    text: "",
    data: [
      { id: "true", text: "true" },
      { id: "false", text: "false" },
    ],
  },
  subCategory: {
    isLoading: false,
    isDisabled: true,
    value: "",
    text: "",
    data: [],
  },
  status: {
    isLoading: false,
    isDisabled: false,
    value: "",
    text: "",
    data: [
      { id: "In stock", text: "In stock" },
      { id: "Out of stock", text: "Out of stock" },
    ],
  },

  make: {
    isLoading: false,
    isDisabled: true,
    value: "",
    text: "",
    data: [],
  },
  model: {
    isLoading: false,
    isDisabled: true,
    value: "",
    text: "",
    data: [],
  },
  year: {
    isLoading: false,
    isDisabled: true,
    value: "",
    text: "",
    data: [],
  },
};

export const ACTIONS = {
  set_dropdown_data: "set_dropdown_data",
  set_text_and_value: "set_text_and_value",
  set_textbox: "set_textbox",
  set_loading: "set_loading",
  reset: "reset",
};

export const startingState = (passedState) => {
  if (!passedState) {
    return initialState;
  } else {
    return {
      id: passedState.id,
      name: passedState.productName,
      price: passedState.price,
      description: passedState.description,
      image: { passedImage: true, name: "", image: passedState.image },
      isLoading: false,

      condition: {
        value: passedState.conditionOfPart,
        text: passedState.conditionOfPart,
        data: [
          { id: "New", text: "New" },
          { id: "Used", text: "Used" },
        ],
      },
      newArrival: {
        isLoading: false,
        isDisabled: false,
        value: passedState.newArrival,
        text: passedState.newArrival,
        data: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
      },
      subCategory: {
        isLoading: false,
        isDisabled: true,
        value: passedState.subCategoryId,
        text: passedState.subCategory,
        data: [],
      },
      status: {
        isLoading: false,
        isDisabled: false,
        value: passedState.status != "" ? passedState.status : "In Stock",
        text: passedState.status != "" ? passedState.status : "In Stock",
        data: [
          { id: "In stock", text: "In Stock" },
          { id: "Out of stock", text: "Out of stock" },
        ],
      },

      make: {
        isLoading: false,
        isDisabled: true,
        value: passedState.makeId,
        text: passedState.make,
        data: [],
      },
      model: {
        isLoading: false,
        isDisabled: true,
        value: passedState.modelId,
        text: passedState.model,
        data: [],
      },
      year: {
        isLoading: false,
        isDisabled: true,
        value: passedState.yearId,
        text: passedState.year,
        data: [],
      },
    };
  }
};
