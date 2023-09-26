import { useCallback, useEffect, useReducer, useRef } from "react";
import toastMessage from "../../../../helper/toast-message/toastMessage";
import useFetchInstance from "../../../../hooks/useFetchInstance";
import { BUTTON_ACTION_TYPE, SPECIFICATIONS } from "../../constants/constants";
const useMake = () => {
  const initialState = {
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
    },
  };

  const ACTIONS = {
    set_tableData: "set_tableData",
    set_deleteIsLoading: "set_deleteIsLoading",
    set_isLoading: "set_isLoading",
    set_model_data: "set_model_data",
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

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch({
      type: ACTIONS.set_isLoading,
      payload: true,
    });
    try {
      const data = await tokenAwareFetch("/make/get");
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
      id: "",
      visible: true,
      textBoxPlaceHolder: "Type Here",
      textBoxValue: "",
      title: "Make",
      subText: "Enter into the text box below",
      actionType: BUTTON_ACTION_TYPE.Add,
    };

    dispatch({
      type: ACTIONS.set_model_data,
      payload: payload,
    });
  };

  const ModelBtnOnClickHander = async () => {
    const text = state.modelData.textBoxValue;
    const id = state.modelData.id;
    if (text == "") return toastMessage("info", "Please enter make name");
    dispatch({
      type: ACTIONS.set_model_data,
      payload: { btnIsloading: true },
    });
    if (state.modelData.actionType == BUTTON_ACTION_TYPE.Add) {
      await insertData(text);
    } else {
      await updateData(text, id);
    }
    dispatch({
      type: ACTIONS.set_model_data,
      payload: { btnIsloading: false, visible: false },
    });
  };

  const insertData = async (text) => {
    try {
      const msg = await tokenAwareFetch("/make/", "POST", { make: text });
      getData();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const updateData = async (text, id) => {
    try {
      const msg = await tokenAwareFetch("/make/", "PATCH", {
        makeId: id,
        make: text,
      });
      getData();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const deleteData = async (id) => {
    try {
      const msg = await tokenAwareFetch("/make/", "DELETE", {
        makeId: id,
      });
      getData();
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  return [state, dispatch, addBtnOnClick, ModelBtnOnClickHander];
};

export default useMake;
