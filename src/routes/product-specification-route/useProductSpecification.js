import { useCallback, useEffect, useReducer, useRef } from "react";
import { BUTTON_ACTION_TYPE, SPECIFICATIONS } from "./constants/constants";
const useProductSpecification = () => {
  const initialState = {
    isLoading: false,
    selected: SPECIFICATIONS.make,
  };

  const ACTIONS = {
    set_isLoading: "set_isLoading",
    set_deleteIsLoading: "set_deleteIsLoading",
    set_selected: "set_selected",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_isLoading":
        return { ...state, isLoading: action.payload };
      case "set_deleteIsLoading":
        return { ...state, deleteIsLoading: action.payload };
      case "set_selected":
        return { ...state, selected: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};

export default useProductSpecification;
