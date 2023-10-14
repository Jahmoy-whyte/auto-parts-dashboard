import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS } from "./helper/reducerHelper";
import useSocket from "../../hooks/useSocket";
import usePagination from "../../hooks/usePagination";
const useOrders = () => {
  const NUMBER_OF_ROWS_PER_PAGE = 8;
  const NUMBER_OF_PAGES_PER_CHUNKS = 4;
  const initialState = {
    checkAll: false,
    sent: [],
    transit: [],
    delivered: [],
    cancelled: [],
    selected: [],
    isLoading: true,
    currentTable: "sent",
    searchText: "",
    filter: "user_id",
    searchData: [],
    deleteBtnIsloading: false,
    orderCounts: {
      sent: 0,
      transit: 0,
      delivered: 0,
      cancelled: 0,
    },
    filterOptions: [
      { value: "user_id", text: "User Id" },
      { value: "order_id", text: "Order Id" },
      { value: "date", text: "Date" },
    ],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_tableData": {
        const table = action.payload.table;
        const data = action.payload.data;
        return {
          ...state,
          [table]: data,
          isLoading: false,
          selected: [],
          checkAll: false,
        };
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

      case "set_search_text":
        return { ...state, searchText: action.payload };

      case "set_filter_value":
        return { ...state, filter: action.payload };

      case "set_search_data":
        return { ...state, searchData: action.payload, isLoading: false };
      case "set_order_counts":
        return { ...state, orderCounts: action.payload };
      case "delete_btn_is_loading":
        return { ...state, deleteBtnIsloading: action.payload };

      case "single_select":
        return {
          ...state,
          selected: [...state.selected, action.payload],
        };

      case "single_deselect":
        return {
          ...state,
          selected: state.selected.filter((id) => id != action.payload),
        };

      case "select_all":
        return {
          ...state,
          checkAll: true,
          selected: state[state.currentTable].map((row) => row.id),
        };

      case "clear_selected":
        return {
          ...state,
          checkAll: false,
          selected: [],
        };

      default:
        return state;
    }
  };

  const { tokenAwareFetch } = useFetchInstance();
  const { socketData } = useSocket();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { calulatePages, currentPage, next, pages, prev, setCurrentPage } =
    usePagination();
  const setState = useCallback((key, value) => {
    dispatch({
      type: ACTIONS.setState,
      payload: { key: key, value: value },
    });
  }, []);

  const orderCount = async () => {
    try {
      const counts = await tokenAwareFetch(`/orders/orders/count-orders`);

      calulatePages(
        counts[state.currentTable],
        NUMBER_OF_ROWS_PER_PAGE,
        NUMBER_OF_PAGES_PER_CHUNKS
      );

      dispatch({ type: ACTIONS.set_order_counts, payload: counts });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_is_loading, payload: false });
    }
  };

  const getTableData = async (tableStatus) => {
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    const limit = NUMBER_OF_ROWS_PER_PAGE;
    const start = currentPage * NUMBER_OF_PAGES_PER_CHUNKS;
    try {
      const data = await tokenAwareFetch(
        `/orders/orders/get/${tableStatus}/${start}/${limit}`
      );

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
      orderCount();
    });
  }, [socketData.socket]);

  useEffect(() => {
    setCurrentPage(0);
  }, [state.currentTable]);

  useEffect(() => {
    if (state.searchText == "") {
      dispatch({ type: ACTIONS.set_search_data, payload: [] });
      getTableData(state.currentTable);
      orderCount();
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
  }, [state.searchText, state.currentTable, state.filter, currentPage]);

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

      socketData.socket.emit("refresh", "all");

      dispatch({ type: ACTIONS.clear_selected });
      toastMessage("success", "Delete Successful");
      getTableData(state.currentTable);
    } catch (error) {
      toastMessage("error", error.message);
    }

    dispatch({
      type: ACTIONS.delete_btn_is_loading,
      payload: false,
    });
  };

  return [
    state,
    dispatch,
    setState,
    deleteOrders,
    currentPage,
    next,
    pages,
    prev,
    setCurrentPage,
    socketData,
  ];
};

export default useOrders;
