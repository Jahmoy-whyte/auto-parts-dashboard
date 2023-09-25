import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS } from "./helper/reducerHelper";
const useProductDetails = () => {
  const initialState = {
    isLoading: false,
    tableData: [],
    deleteIsLoading: false,
    selected: "make",
    regularModelData: {
      visible: false,
      textBoxPlaceHolder: "",
      textBoxValue: "",
      title: "",
      subText: "",
      actionType: "add",
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_tableData": {
        return { ...state, tableData: action.payload, isLoading: false };
      }
      case "set_isLoading":
        return { ...state, isLoading: action.payload };
      case "set_deleteIsLoading":
        return { ...state, deleteIsLoading: action.payload };
      case "set_selected":
        return { ...state, selected: action.payload };
      case "set_regularModelData_visibility": {
        const visible = action.payload.visible;
        const textBoxValue = action.payload.textBoxValue;
        const title = action.payload.title;
        const subText = action.payload.subText;
        const actionType = action.payload.actionType;
        return {
          ...state,
          regularModelData: {
            ...state.regularModelData,
            visible: visible,
            textBoxValue: textBoxValue,
            title: title,
            subText: subText,
            actionType: actionType,
          },
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();

  useEffect(() => {
    getData();
  }, [state.selected]);

  const getData = async () => {
    dispatch({
      type: ACTIONS.set_isLoading,
      payload: true,
    });
    try {
      const url = getUrl();
      const data = await tokenAwareFetch(url);
      console.log(data);
      dispatch({
        type: ACTIONS.set_tableData,
        payload: data,
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({
      type: ACTIONS.set_isLoading,
      payload: false,
    });
  };

  const getUrl = () => {
    switch (state.selected) {
      case "make":
        return `/make/get`;
      case "model":
        return `/model/`;
      case "year":
        return `/year/`;
      case "categories":
        return `/categories/`;
    }
  };

  const add = () => {
    alert("Wdwdwd");
  };

  return [state, dispatch];
};

export default useProductDetails;
