import { useReducer, useEffect, useCallback } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import validateForm from "./helper/validateForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { startingState, initialState, ACTIONS } from "./helper/reducerHelper";

const useAddProducts = () => {
  const nav = useNavigate();

  const params = useParams();

  const isUpdate = params.id != "add" ? true : false;

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

      case "reset": {
        const reset = initialState;
        reset.make.isDisabled = false;
        return reset;
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

      case "set_initital_state": {
        const product = action.payload;
        return {
          ...state,
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
            isDisabled: false,
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
            isDisabled: false,
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

      default:
        return state;
    }
  };

  const { tokenAwareFetch } = useFetchInstance();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = params.id;

    const getProudctId = async () => {
      try {
        const product = await tokenAwareFetch(`/products/${id}`);
        if (!product.length) throw new Error("Product not found");
        const productData = product[0];
        dispatch({ type: ACTIONS.set_initital_state, payload: productData });
        getModel("make", productData.makeId, productData.make);
        getYear("model", productData.modelId, productData.model);
        selectOption("year", productData.yearId, productData.year);
      } catch (error) {
        toastMessage("error", error.message);
      }
    };

    const onStartUp = async () => {
      if (id != "add") {
        await getProudctId();
      }
      getMake();
      getCategories();
    };

    onStartUp();
  }, []);

  const getMake = async () => {
    try {
      const data = await tokenAwareFetch(`/make/get`);
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
    } catch (error) {
      toastMessage("error", error.message);
    }
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

  const uploadImage = async () => {
    try {
      const storageRef = ref(storage, `products/${state.image.name}`);
      await uploadBytes(storageRef, state.image);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return null;
    }
  };

  const save = async () => {
    try {
      const { valid, message } = validateForm(state);
      if (!valid) return toastMessage("error", message);

      dispatch({ type: ACTIONS.set_loading, payload: true });

      const url = await uploadImage();
      if (!url) return toastMessage("error", "error uploading image");

      const data = {
        productName: state.name,
        makeId: state.make.value,
        modelId: state.model.value,
        yearId: state.year.value,
        subCategoryId: state.subCategory.value,
        description: state.description,
        price: state.price,
        newArrival: state.newArrival.value,
        conditionOfPart: state.condition.value,
        image: url,
        status: state.status.value,
      };

      const msg = await tokenAwareFetch("/products", "POST", data);
      toastMessage("success", msg);
      dispatch({ type: ACTIONS.reset });
    } catch (error) {
      toastMessage("error", error.message);
    }

    dispatch({ type: ACTIONS.set_loading, payload: false });
  };

  const update = async () => {
    try {
      const { valid, message } = validateForm(state);
      if (!valid) return toastMessage("error", message);

      dispatch({ type: ACTIONS.set_loading, payload: true });

      let url = null;
      if (state.image?.passedImage) {
        url = state.image.image;
      } else {
        url = await uploadImage();
      }

      if (!url) return toastMessage("error", "error uploading image");

      const data = {
        id: state.id,
        productName: state.name,
        makeId: state.make.value,
        modelId: state.model.value,
        yearId: state.year.value,
        subCategoryId: state.subCategory.value,
        description: state.description,
        price: state.price,
        newArrival: state.newArrival.value,
        conditionOfPart: state.condition.value,
        image: url,
        status: state.status.value,
      };

      const msg = await tokenAwareFetch("/products", "PUT", data);
      toastMessage("success", msg);
      nav("/home/products");
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
    isUpdate,
    update,
  ];
};

export default useAddProducts;
