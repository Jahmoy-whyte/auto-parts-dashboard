import { useReducer, useEffect, useCallback } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import validateForm from "./helper/validateForm";
const useAddProducts = () => {
  const initialState = {
    name: "",
    price: "",
    Description: "",
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
      isDisabled: true,
      value: "",
      text: "",
      data: [
        { id: "true", text: "True" },
        { id: "false", text: "False" },
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
      isDisabled: true,
      value: "",
      text: "",
      data: [
        { id: "In stock", text: "In Stock" },
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

  const ACTIONS = {
    set_dropdown_data: "set_dropdown_data",
    set_text_and_value: "set_text_and_value",
    set_textbox: "set_textbox",
    set_loading: "set_loading",
  };

  const { tokenAwareFetch } = useFetchInstance();

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_dropdown_data": {
        const dropDown = action.payload.dropDown;
        const data = action.payload.data;

        return {
          ...state,
          [dropDown]: {
            ...state[dropDown],
            data: data,
            isLoading: false,
            isDisabled: false,
          },
        };
      }

      case "set_textbox": {
        const textBox = action.payload.textBox;
        const text = action.payload.text;

        return {
          ...state,
          [textBox]: text,
        };
      }
      case "set_loading": {
        return {
          ...state,
          isLoading: action.payload,
        };
      }

      case "set_text_and_value": {
        const dropDown = action.payload.dropDown;
        const text = action.payload.text;
        const value = action.payload.value;

        const reset = {
          isLoading: false,
          isDisabled: true,
          value: "",
          text: "",
          data: [],
        };

        const dropDownData = {
          [dropDown]: {
            ...state[dropDown],
            text: text,
            value: value,
          },
        };

        if (dropDown == "make") {
          return {
            ...state,
            ...dropDownData,
            model: reset,
            year: reset,
          };
        }

        if (dropDown == "model") {
          return {
            ...state,
            ...dropDownData,
            year: reset,
          };
        }

        return {
          ...state,
          [dropDown]: {
            ...state[dropDown],
            text: text,
            value: value,
          },
        };
      }
      default:
        state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getMake();
    getCategories();
  }, []);

  const getMake = async () => {
    try {
      const data = await tokenAwareFetch(`/make`);
      const newarr = data.map((data) => {
        return { id: data.id, text: data.make };
      });
      dispatch({
        type: ACTIONS.set_dropdown_data,
        payload: { dropDown: "make", data: newarr },
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const getCategories = async () => {
    try {
      const data = await tokenAwareFetch(`/categories`);
      const newarr = data.map((data) => {
        return { id: data.id, text: data.category };
      });

      dispatch({
        type: ACTIONS.set_dropdown_data,
        payload: { dropDown: "subCategory", data: newarr },
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const getModel = useCallback(async (name, value, text) => {
    dispatch({
      type: ACTIONS.set_text_and_value,
      payload: { dropDown: "make", value: value, text: text },
    });
    try {
      const data = await tokenAwareFetch(`/model/${value}`);
      const newarr = data.map((data) => {
        return { id: data.id, text: data.model };
      });
      dispatch({
        type: ACTIONS.set_dropdown_data,
        payload: { dropDown: "model", data: newarr },
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
  }, []);

  const getYear = useCallback(async (name, value, text) => {
    dispatch({
      type: ACTIONS.set_text_and_value,
      payload: { dropDown: "model", value: value, text: text },
    });
    try {
      const data = await tokenAwareFetch(`/year/${value}`);
      const newarr = data.map((data) => {
        return { id: data.id, text: data.year };
      });
      dispatch({
        type: ACTIONS.set_dropdown_data,
        payload: { dropDown: "year", data: newarr },
      });
    } catch (error) {}
  }, []);

  const selectOption = useCallback((name, value, text) => {
    dispatch({
      type: ACTIONS.set_text_and_value,
      payload: { dropDown: name, value: value, text: text },
    });
  }, []);

  const setTextBox = useCallback((name, text) => {
    dispatch({
      type: ACTIONS.set_textbox,
      payload: { textBox: name, text: text },
    });
  }, []);

  const setImage = useCallback((e) => {
    const imageFile = e.currentTarget.files[0];
    if (!imageFile) {
      setTextBox("image", null);
      return;
    }

    if (imageFile.size > 3000000) {
      toastMessage("error", "Image Size Exceed The 3 Mb Limit");
      setTextBox("image", null);
      return;
    }

    if (imageFile.type != "image/png") {
      toastMessage("error", "Only png supported");
      setTextBox("image", null);
      return;
    }

    setTextBox("image", imageFile);
  }, []);

  const upload = async () => {
    try {
      const storageRef = ref(storage, `images/${state.image.name}`);
      await uploadBytes(storageRef, state.image);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const save = () => {
    try {
      const { valid, message } = validateForm(state);
      if (!valid) return toastMessage("error", message);
      dispatch({ type: ACTIONS.set_loading, payload: true });
    } catch (error) {
      toastMessage("error", error.message);
    }

    dispatch({ type: ACTIONS.set_loading, payload: false });
  };
  return [
    state,
    dispatch,
    getModel,
    getYear,
    selectOption,
    setTextBox,
    save,
    setImage,
  ];
};

export default useAddProducts;
