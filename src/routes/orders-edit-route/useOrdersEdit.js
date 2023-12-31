import { useReducer, useEffect, useCallback, useMemo } from "react";
import toastMessage from "../../helper/toast-message/toastMessage";
import useFetchInstance from "../../hooks/useFetchInstance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import formattedCost from "../../helper/format-cost/formattedCost";
import useSocket from "../../hooks/useSocket";
const useOrdersEdit = () => {
  const { tokenAwareFetch } = useFetchInstance();
  const loc = useLocation();
  const nav = useNavigate();

  // const orderId = loc.state?.orderId ? loc.state?.orderId : "2";
  // const passedStatus = loc.state?.orderId ? loc.state?.status : "sent";

  const params = useParams();
  const status = params.status;
  const orderId = params.id;

  const { socketData } = useSocket();
  const initialState = {
    model: {
      visible: false,
      text: "",
      isLoading: false,
    },
    orderData: [],
    isLoading: true,
    btnIsLoading: false,
    status: status,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_order_data":
        return { ...state, orderData: action.payload, isLoading: false };
      case "set_btn_is_loading":
        return { ...state, btnIsLoading: action.payload };
      case "set_status":
        return { ...state, status: action.payload };
      case "set_model":
        return { ...state, model: { ...state.model, ...action.payload } };
      default:
        return state;
    }
  };

  const ACTIONS = {
    set_order_data: "set_order_data",
    set_is_loading: "set_is_loading",
    set_btn_is_loading: "set_btn_is_loading",
    set_model: "set_model",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const data = await tokenAwareFetch(`/orders/${orderId}`);
        console.log(data);
        dispatch({ type: ACTIONS.set_order_data, payload: data[0] });
      } catch (error) {
        toastMessage("error", error.message);
      }
    };
    getOrderData();
  }, []);

  const displayTotal = useMemo(() => {
    try {
      const data = state.orderData?.items ? [...state.orderData?.items] : [];
      let total = 0;
      data.forEach((data1) => {
        total += data1.price * data1.quantity;
      });
      return formattedCost(Number(total) + Number(46));
    } catch (error) {
      return "%0 error";
    }
  }, [state?.orderData?.items]);

  const update = async () => {
    if (socketData.error) return toastMessage(socketData.error);

    dispatch({ type: ACTIONS.set_btn_is_loading, payload: true });
    try {
      const msg = await tokenAwareFetch(`/orders/update/status`, "PATCH", {
        status: state.status,
        orderId: state.orderData.id,
      });
      socketData.socket.emit("OrderUpdate", {
        userId: state.orderData.userId,
      });

      toastMessage("success", msg);
      nav(-1);
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({ type: ACTIONS.set_btn_is_loading, payload: false });
  };

  const sendNotification = async () => {
    if (state.model.text == "")
      return toastMessage("error", "Please enter message");
    dispatch({ type: ACTIONS.set_model, payload: { isLoading: true } });
    try {
      const msg = await tokenAwareFetch("/notifications/notify-user", "POST", {
        message: state.model.text,
        userId: state.orderData?.userId,
      });
      toastMessage("success", msg);
    } catch (error) {
      toastMessage("error", error.message);
    }
    dispatch({
      type: ACTIONS.set_model,
      payload: { isLoading: false, text: "", visible: false },
    });
  };

  return [state, dispatch, displayTotal, update, sendNotification, socketData];
};

export default useOrdersEdit;
