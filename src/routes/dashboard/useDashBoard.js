import { useEffect, useReducer } from "react";

import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
const useDashBoard = () => {
  const { tokenAwareFetch } = useFetchInstance();

  const initialState = {
    isLoading: false,
    orders: [],
  };

  const ACTIONS = {
    SET_ORDERS: "set-orders",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "set-orders":
        return { ...state, orders: action.payload };
      default:
        state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await tokenAwareFetch("/orders/orders/get");
        console.log(orders);
        dispatch({ type: ACTIONS.SET_ORDERS, payload: orders });
      } catch (error) {
        console.log(error);
        toastMessage("error", error.message);
      }
    };

    getOrders();
  }, []);

  return [state, dispatch];
};

export default useDashBoard;
