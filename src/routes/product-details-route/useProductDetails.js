import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS } from "./helper/reducerHelper";
import { getUrl, postUrl } from "./helper/urlHelper";
import SPECIFICATIONS from "./constants/specification";
import { BUTTON_ACTION_TYPE } from "./constants/buttonActionType";
const useProductDetails = () => {
  const initialState = {
    isLoading: false,
    tableData: [],
    deleteIsLoading: false,
    selected: SPECIFICATIONS.make,
    regularModelData: {
      updateId: "",
      visible: false,
      textBoxPlaceHolder: "",
      textBoxValue: "",
      title: "",
      subText: "",
      actionType: "Add",
      btnIsloading: false,
    },

    irregularModelData: {
      updateId: "",
      visible: false,
      textBoxPlaceHolder: "",
      textBoxValue: "",
      title: "",
      subText: "",
      actionType: "Add",
      btnIsloading: false,
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
      case "set_regularModelData": {
        const modelData = action.payload;
        return {
          ...state,
          regularModelData: {
            ...state.regularModelData,
            ...modelData,
          },
        };
      }

      case "set_irregularModelData": {
        const modelData = action.payload;
        return {
          ...state,
          irregularModelData: {
            ...state.irregularModelData,
            ...modelData,
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
      const url = getUrl(state.selected);
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

  const addBtnOnClick = () => {
    const payload = {
      visible: true,
      textBoxPlaceHolder: "Type Here",
      textBoxValue: "",
      title: state.selected,
      subText: "Enter into the text box below",
      actionType: BUTTON_ACTION_TYPE.Add,
    };
    if (
      state.selected == SPECIFICATIONS.make ||
      state.selected == SPECIFICATIONS.categories
    ) {
      dispatch({
        type: ACTIONS.set_regularModelData,
        payload: payload,
      });
    } else {
      dispatch({
        type: ACTIONS.set_irregularModelData,
        payload: payload,
      });
    }
  };

  return [state, dispatch, getData, addBtnOnClick];
};

export default useProductDetails;
