import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS } from "./helper/reducerHelper";
import useSocket from "../../hooks/useSocket";
const useOrders = () => {
  const { tokenAwareFetch } = useFetchInstance();

  const { socketData } = useSocket();
  const initialState = {
    sent: [],
    delivered: [],
    cancelled: [],
    selected: [],
    isLoading: true,
    currentTable: "sent",
    searchText: "",
    filter: "user_id",
    searchData: [],
    deleteBtnIsloading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_tableData": {
        const table = action.payload.table;
        const data = action.payload.data;
        return { ...state, [table]: data, isLoading: false, selected: [] };
      }
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
      case "set_search_data":
        return { ...state, searchData: action.payload, isLoading: false };
      case "delete_btn_is_loading":
        return { ...state, deleteBtnIsloading: action.payload };
      case "clear_selected":
        return { ...state, selected: [] };

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

  const getTableData = async (tableStatus) => {
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    try {
      const data = await tokenAwareFetch(`/orders/orders/get/${tableStatus}`);

      dispatch({
        type: ACTIONS.set_tableData,
        payload: { table: tableStatus, data: data },
      });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_is_loading, payload: false });
    }
  };

  useEffect(() => {
    socketData.socket?.on("OrderSent", (msg) => {
      dispatch({ type: ACTIONS.set_is_loading, payload: true });
      toastMessage("success", "new order just in");
      getTableData("sent");
    });
  }, [socketData.socket]);

  useEffect(() => {
    if (state.searchText == "") {
      dispatch({ type: ACTIONS.set_search_data, payload: [] });
      getTableData(state.currentTable);
      return;
    }
    dispatch({
      type: ACTIONS.set_is_loading,
      payload: true,
    });

    const timeId = setTimeout(async () => {
      try {
        // "/orders/search/:status/:filter/:searchText",
        const data = await tokenAwareFetch(
          `/orders/orders/search/${state.currentTable}/${state.filter}/${state.searchText}`
        );
        dispatch({ type: ACTIONS.set_search_data, payload: data });
      } catch (error) {
        toastMessage("error", error.message);
        dispatch({
          type: ACTIONS.set_is_loading,
          payload: false,
        });
      }
    }, 1500);

    return () => clearTimeout(timeId);
  }, [state.searchText, state.currentTable, state.filter]);

  const deleteOrders = async () => {
    dispatch({
      type: ACTIONS.delete_btn_is_loading,
      payload: true,
    });
    const selected = state.selected;
    try {
      for (let i = 0; i < selected.length; i++) {
        const msg = await tokenAwareFetch("/orders", "DELETE", {
          orderId: selected[i],
        });
      }

      dispatch({ type: ACTIONS.clear_selected });
      toastMessage("success", "Delete Successful");
      getTableData(state.currentTable);
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({
        type: ACTIONS.delete_btn_is_loading,
        payload: false,
      });
    }
  };

  return [state, dispatch, setState, deleteOrders];
};

export default useOrders;
