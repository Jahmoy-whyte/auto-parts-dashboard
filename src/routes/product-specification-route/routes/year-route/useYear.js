import { useEffect, useReducer } from "react";
import toastMessage from "../../../../helper/toast-message/toastMessage";
import useFetchInstance from "../../../../hooks/useFetchInstance";
import { BUTTON_ACTION_TYPE } from "../../constants/constants";
import validateModelActions from "./helper/validateModelActions";
import { reducer, ACTIONS, initialState } from "../../helper/reducerHelper";
const useYear = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();

  useEffect(() => {
    getModel();
  }, []);

  const getModel = async () => {
    try {
      const data = await tokenAwareFetch("/model/");
      const options = data.map((option) => {
        return { text: option.model, value: option.id };
      });
      dispatch({
        type: ACTIONS.set_dropdown,
        payload: options,
      });
      getYears();
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const getYears = async () => {
    dispatch({
      type: ACTIONS.set_isLoading,
      payload: true,
    });
    try {
      const data = await tokenAwareFetch("/year/");

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
    dispatch({
      type: ACTIONS.set_model_data,
      payload: {
        id: "",
        visible: true,
        textBoxPlaceHolder: "Type Here",
        textBoxValue: "",
        title: "Add",
        subText: "Enter into the text box below",
        actionType: BUTTON_ACTION_TYPE.Add,
        dropDown: {
          ...state.modelData.dropDown,
          text: "",
          value: "",
        },
      },
    });
  };

  const modelBtnOnClickHander = async () => {
    dispatch({
      type: ACTIONS.set_model_data,
      payload: { btnIsloading: true },
    });
    try {
      const { action, data, url } = validateModelActions(state);
      const msg = await tokenAwareFetch(url, action, data);
      dispatch({
        type: ACTIONS.set_model_data,
        payload: { btnIsloading: false, visible: false },
      });

      getYears();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({
        type: ACTIONS.set_model_data,
        payload: { btnIsloading: false },
      });
    }
  };

  return [state, dispatch, addBtnOnClick, modelBtnOnClickHander];
};

export default useYear;
