import { useCallback, useEffect, useReducer } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS } from "./helper/reducerHelper";
const useOrders = () => {
  const { tokenAwareFetch } = useFetchInstance();

  const initialState = {
    tableData: [],
    deliveredOrders: [],
    cancelledOrders: [],
    selected: [],
    isLoading: true,
    tableTab: "sent",
    searchText: "",
    filter: "user_id",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_tableData":
        return { ...state, tableData: action.payload, isLoading: false };

      case "set_is_loading":
        return { ...state, isLoading: action.payload };

      case "set_selected":
        return {
          ...state,
          selected: [...state.selected, action.payload],
        };
      case "deselect":
        return {
          ...state,
          selected: state.selected.filter((id) => id != action.payload),
        };

      case "setState":
        const key = action.payload.key;
        const value = action.payload.value;
        return {
          ...state,
          [key]: value,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = useCallback((key, value) => {
    dispatch({
      type: ACTIONS.setState,
      payload: { key: key, value: value },
    });
  }, []);

  const getTableData = async (condition) => {
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    try {
      const data = await tokenAwareFetch(`/orders/orders/get/${condition}`);
      console.log(data);
      dispatch({ type: ACTIONS.set_tableData, payload: data });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_is_loading, payload: false });
    }
  };

  useEffect(() => {
    if (state.searchText == "") {
      getTableData("sent");
      return;
    }
    dispatch({
      type: ACTIONS.set_is_loading,
      payload: true,
    });

    const time = setTimeout(async () => {
      try {
        // "/orders/search/:status/:filter/:searchText",
        const data = await tokenAwareFetch(
          `/orders/orders/search/${state.tableTab}/${state.filter}/${state.searchText}`
        );
        dispatch({ type: ACTIONS.set_tableData, payload: data });
      } catch (error) {
        toastMessage("error", error.message);
        dispatch({
          type: ACTIONS.set_is_loading,
          payload: true,
        });
      }
    }, 1500);

    return () => clearTimeout(time);
  }, [state.searchText, state.filter]);

  //console.log(state);

  return [state, dispatch, getTableData, setState];
};

export default useOrders;
