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
  set_initital_state: "set_initital_state",
};

export const startingState = (product) => {
  if (!product) {
    return initialState;
  } else {
    return {
      id: product.id,
      name: product.productName,
      price: product.price,
      description: product.description,
      image: { passedImage: true, name: "", image: product.image },
      isLoading: false,

      condition: {
        value: product.conditionOfPart,
        text: product.conditionOfPart,
        data: [
          { id: "New", text: "New" },
          { id: "Used", text: "Used" },
        ],
      },
      newArrival: {
        isLoading: false,
        isDisabled: false,
        value: product.newArrival,
        text: product.newArrival,
        data: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
      },
      subCategory: {
        isLoading: false,
        isDisabled: true,
        value: product.subCategoryId,
        text: product.subCategory,
        data: [],
      },
      status: {
        isLoading: false,
        isDisabled: false,
        value: product.status != "" ? product.status : "In Stock",
        text: product.status != "" ? product.status : "In Stock",
        data: [
          { id: "In stock", text: "In Stock" },
          { id: "Out of stock", text: "Out of stock" },
        ],
      },

      make: {
        isLoading: false,
        isDisabled: true,
        value: product.makeId,
        text: product.make,
        data: [],
      },
      model: {
        isLoading: false,
        isDisabled: true,
        value: product.modelId,
        text: product.model,
        data: [],
      },
      year: {
        isLoading: false,
        isDisabled: true,
        value: product.yearId,
        text: product.year,
        data: [],
      },
    };
  }
};
