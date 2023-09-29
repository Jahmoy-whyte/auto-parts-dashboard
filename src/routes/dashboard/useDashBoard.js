import { useEffect, useReducer } from "react";

import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
const useDashBoard = () => {
  const { tokenAwareFetch } = useFetchInstance();

  const initialState = {
    isLoading: false,
    orders: [],
    sales: [],
    usersCount: 0,
    ordersCount: 0,
    averagedailySales: 0,
    productCount: 0,
  };
  // "/count-all-users",
  const ACTIONS = {
    set_orders: "set_orders",
    set_all: "set_all",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "set_orders":
        return { ...state, orders: action.payload };

      case "set_all": {
        const orders = action.payload.orders;
        const sales = action.payload.sales;
        const usersCount = action.payload.usersCount;
        const ordersCount = action.payload.ordersCount;
        const averagedailySales = action.payload.averagedailySales;
        const productCount = action.payload.productCount;
        return {
          ...state,
          orders: orders,
          sales: sales,
          usersCount: usersCount,
          ordersCount: ordersCount,
          averagedailySales: averagedailySales,
          productCount: productCount,
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
    Promise.all([
      tokenAwareFetch("/orders/orders/get"),
      tokenAwareFetch("/orders/orders/sales"),
      tokenAwareFetch("/users/count-all-users"),
      tokenAwareFetch("/orders/orders/average-daily-sales"),
    ])
      .then((data) => {
        console.log(data);
        dispatch({
          type: ACTIONS.set_all,
          payload: {
            orders: data[0],
            sales: data[1],
            usersCount: data[2].count,
            averagedailySales: data[3].average,
            ordersCount: 0,
            productCount: 0,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        toastMessage("error", error.message);
      });

    //
  };
  return [state, dispatch];
};

export default useDashBoard;
