import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import useDebounce from "../../hooks/useDebounce";

const useUsers = () => {
  const initialState = {
    isLoading: true,
    usersTableData: [],
    count: 0,
  };

  const tableHeading = [
    { field: "id", head: "id" },
    { field: "firstName", head: "firstname" },
    { field: "lastName", head: "lastname" },
    { field: "email", head: "email" },
    { field: "userStatus", head: "userStatus" },
    { field: "phone", head: "phone" },
    { field: "address", head: "address" },
  ];

  const ACTIONS = {
    set_is_loading: "set_is_loading",
    set_users_table: "set_users_table",
    set_selected: "set_selected",
    deselect: "deselect",
    setState: "setState",
    delete_btn_is_loading: "delete_btn_is_loading",
    clear_selected: "clear_selected",
    set_count: "set_count",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_users_table": {
        return { ...state, usersTableData: action.payload, isLoading: false };
      }
      case "set_is_loading":
        return { ...state, isLoading: action.payload };

      case "set_selected":
        return {
          ...state,
          selected: [...state.selected, action.payload],
        };

      case "set_count":
        return {
          ...state,
          count: action.payload,
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

      case "delete_btn_is_loading":
        return { ...state, deleteBtnIsloading: action.payload };
      case "clear_selected":
        return { ...state, selected: [] };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();
  const debouncedValue = useDebounce("");

  const setState = useCallback((key, value) => {
    dispatch({
      type: ACTIONS.setState,
      payload: { key: key, value: value },
    });
  }, []);

  const getUsers = async () => {
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    try {
      const data = await tokenAwareFetch(`/users/all-users/${1}`);

      console.log(data);
      dispatch({
        type: ACTIONS.set_users_table,
        payload: data,
      });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_is_loading, payload: false });
    }
  };

  const countUser = async () => {
    try {
      const data = await tokenAwareFetch(`/users/count-all-users`);
      dispatch({ type: ACTIONS.set_count, payload: data.count });
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  useEffect(() => {
    countUser();
    getUsers();
  }, []);

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

  return [state, dispatch, tableHeading];
};

export default useUsers;
