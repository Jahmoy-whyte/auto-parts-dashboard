import { useReducer } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
const useAddProducts = () => {
  const initialState = {
    modelIsLoading: true,
    modelIsOpen: true,
    modelData: [],
    make: "",
    model: "",
    year: "",
  };

  const ACTIONS = {
    set_make_value: "set_make_value",
    set_model_value: "set_model_value",
    set_year_value: "set_year_value",
    model_is_open: "model_is_open",
    set_model_data: "set_model_data",
  };

  const { tokenAwareFetch } = useFetchInstance();

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_make_value":
        return {
          ...state,
          make: action.payload,
        };
      case "set_model_value":
        return {
          ...state,
          model: action.payload,
        };
      case "set_year_value":
        return {
          ...state,
          year: action.payload,
        };

      case "set_model_data":
        return {
          ...state,
          modelData: action.payload,
          modelIsLoading: false,
        };

      case "model_is_open":
        return {
          ...state,
          modelIsOpen: action.payload,
          modelIsLoading: true,
        };

      default:
        state;
    }
  };
  //  const dwd =  await tokenAwareFetch(`/make/${}`)

  const setModelIsOpen = (bool) => {
    dispatch({ type: ACTIONS.model_is_open, payload: bool });
  };

  const getMake = async () => {
    setModelIsOpen(true);
    try {
      const data = await tokenAwareFetch(`/make`);
      dispatch({ type: ACTIONS.set_model_data, payload: data });
      console.log(data);
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch, setModelIsOpen, getMake];
};

export default useAddProducts;
