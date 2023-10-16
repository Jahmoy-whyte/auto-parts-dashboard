import { useEffect, useReducer } from "react";

import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
const useDashBoard = () => {
  const { tokenAwareFetch } = useFetchInstance();

  const initialState = {
    isLoading: true,
    error: false,
    orders: [],
    sales: [],
    averageDailySales: 0,
    userRatio: {},
    productCount: 0,
    newOrdersCount: 0,
    newUserThisMonth: 0,
    outOfStockProducts: [],
  };
  // "/count-all-users",
  const ACTIONS = {
    set_error: "set_error",
    set_isLoading: "set_isLoading",
    set_all: "set_all",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "set_isLoading":
        return { ...state, isLoading: action.payload };
      case "set_error":
        return { ...state, error: action.payload, isLoading: false };

      case "set_all": {
        return {
          ...state,
          orders: action.payload.orders,
          sales: action.payload.sales,
          averageDailySales: action.payload.averageDailySales,
          userRatio: action.payload.userRatio,
          productCount: action.payload.productCount,
          newOrdersCount: action.payload.newOrdersCount,
          newUserThisMonth: action.payload.newUserThisMonth,
          outOfStockProducts: action.payload.outOfStockProducts,
          isLoading: false,
          error: false,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      dispatch({
        type: ACTIONS.set_isLoading,
        payload: true,
      });
      const arrayData = await tokenAwareFetch("/dashboard/");
      console.log(arrayData);

      dispatch({
        type: ACTIONS.set_all,
        payload: {
          orders: arrayData.orders,
          sales: arrayData.sales,
          averageDailySales: arrayData.averageDailySales,
          userRatio: arrayData.userRatio,
          productCount: arrayData.productCount,
          newOrdersCount: arrayData.newOrdersCount,
          newUserThisMonth: arrayData.newUserThisMonth,
          outOfStockProducts: arrayData.outOfStockProducts,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.set_error,
        payload: error.message,
      });
      toastMessage("error", error.message);
    }
  };

  return [state, dispatch, getOrders];
};

export default useDashBoard;
