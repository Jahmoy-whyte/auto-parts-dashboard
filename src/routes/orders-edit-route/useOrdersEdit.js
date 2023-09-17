import { useReducer, useEffect, useCallback, useMemo } from "react";
import toastMessage from "../../helper/toast-message/toastMessage";
import useFetchInstance from "../../hooks/useFetchInstance";
import { useLocation, useNavigate } from "react-router-dom";
import formattedCost from "../../helper/format-cost/formattedCost";
const useOrdersEdit = () => {
  const { tokenAwareFetch } = useFetchInstance();
  const loc = useLocation();
  const nav = useNavigate();
  const orderId = loc.state?.orderId ? loc.state?.orderId : "2";
  const passedStatus = loc.state?.orderId ? loc.state?.status : "sent";

  const initialState = {
    orderData: [],
    isLoading: true,
    btnIsLoading: false,
    status: passedStatus,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_order_data":
        return { ...state, orderData: action.payload, isLoading: false };
      case "set_btn_is_loading":
        return { ...state, btnIsLoading: action.payload };
      case "set_status":
        return { ...state, status: action.payload };
      default:
        return state;
    }
  };

  const ACTIONS = {
    set_order_data: "set_order_data",
    set_is_loading: "set_is_loading",
    set_btn_is_loading: "set_btn_is_loading",
    set_status: "set_status",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const data = await tokenAwareFetch(`/orders/${orderId}`);
        dispatch({ type: ACTIONS.set_order_data, payload: data[0] });
      } catch (error) {
        toastMessage("error", error.message);
      }
    };
    getOrderData();
  }, []);

  const displayTotal = useMemo(() => {
    const data = state.orderData?.items ? [...state.orderData?.items] : [];
    let total = 0;
    data.forEach((data1) => {
      total += data1.price * data1.quantity;
    });
    return formattedCost(Number(total) + Number(46));
  }, [state?.orderData?.items]);

  const update = async () => {
    dispatch({ type: ACTIONS.set_btn_is_loading, payload: true });
    try {
      const msg = await tokenAwareFetch(`/orders/update/status`, "PATCH", {
        status: state.status,
        orderId: state.orderData.id,
      });

      toastMessage("success", msg);
      nav(-1);
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({ type: ACTIONS.set_btn_is_loading, payload: false });
  };

  return [state, dispatch, displayTotal, update];
};

export default useOrdersEdit;
