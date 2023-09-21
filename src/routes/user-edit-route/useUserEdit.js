import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import usePagination from "../../hooks/usePagination";
import { useNavigate } from "react-router-dom";

const useUserEdit = () => {
  const initialState = {
    isLoading: false,
    usersTableData: [],
    selected: [],
    searchText: "",
    filter: "firstname",
    dropDown: [
      { text: "First Name", value: "firstname" },
      { text: "Last Name", value: "lastname" },
    ],
  };

  const ACTIONS = {
    set_is_loading: "set_is_loading",
    set_users_table: "set_users_table",
    set_search_text: "set_search_text",
    setState: "setState",
    delete_btn_is_loading: "delete_btn_is_loading",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_users_table": {
        return { ...state, usersTableData: action.payload, isLoading: false };
      }
      case "set_is_loading":
        return { ...state, isLoading: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();

  const nav = useNavigate();

  /*
  
Full texts
user_id	
user_status	
email	
emailverified	
password	
firstname	
lastname	
phone	
selected_address_id
  */

  useEffect(() => {
    if (state.searchText == "") {
      getUsers();
      return;
    }
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    const timeOut = setTimeout(() => {
      search();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [state.searchText]);

  useEffect(() => {
    countUser();
  }, []);

  const search = async () => {
    try {
      const data = await tokenAwareFetch(
        `/users/user-search/${state.filter}/${state.searchText}`
      );

      dispatch({
        type: ACTIONS.set_users_table,
        payload: data,
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const deleteRow = useCallback(async () => {
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
      getUsers();
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({
        type: ACTIONS.delete_btn_is_loading,
        payload: false,
      });
    }
  }, []);

  return [state, dispatch];
};

export default useUserEdit;
