import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import usePagination from "../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "./helper/reducerHelper";
const useUsers = () => {
  const initialState = {
    checkAll: false,
    isLoading: false,
    usersTableData: [],
    selected: [],
    searchText: "",
    filter: "firstname",
    dropDown: [
      { text: "First Name", value: "firstname" },
      { text: "Last Name", value: "lastname" },
      { text: "Email", value: "email" },
      { text: "ID", value: "id" },
      { text: "User Status", value: "user_status" },
    ],
  };

  const NUMBER_OF_ROWS_PER_PAGE = 10;
  const NUMBER_OF_PAGES_PER_CHUNKS = 5;

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_users_table": {
        return { ...state, usersTableData: action.payload, isLoading: false };
      }
      case "set_is_loading":
        return { ...state, isLoading: action.payload };

      case "set_search_text":
        return { ...state, searchText: action.payload };
      case "setState":
        const key = action.payload.key;
        const value = action.payload.value;
        return {
          ...state,
          [key]: value,
        };
      //=======================================================================
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
          selected: state.usersTableData.map((row) => row.id),
        };

      case "clear_selected":
        return { ...state, checkAll: false, selected: [] };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();
  const { pages, currentPage, calulatePages, next, prev, setCurrentPage } =
    usePagination();

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

  const countUser = async () => {
    try {
      const data = await tokenAwareFetch(`/users/count-all-users`);
      calulatePages(
        data.count,
        NUMBER_OF_ROWS_PER_PAGE,
        NUMBER_OF_PAGES_PER_CHUNKS
      );
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const getUsers = useCallback(async (start = 0) => {
    setCurrentPage(start);
    const startingNumber = start * NUMBER_OF_ROWS_PER_PAGE;
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    try {
      const data = await tokenAwareFetch(
        `/users/all-users/${startingNumber}/${NUMBER_OF_ROWS_PER_PAGE}`
      );

      dispatch({
        type: ACTIONS.set_users_table,
        payload: data,
      });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_is_loading, payload: false });
    }
  }, []);

  const setState = useCallback((key, value) => {
    dispatch({
      type: ACTIONS.setState,
      payload: { key: key, value: value },
    });
  }, []);

  const deleteRow = async () => {
    dispatch({
      type: ACTIONS.delete_btn_is_loading,
      payload: true,
    });
    const selected = state.selected;
    try {
      for (let i = 0; i < selected.length; i++) {
        const msg = await tokenAwareFetch("/users", "DELETE", {
          userId: selected[i],
        });
      }

      dispatch({ type: ACTIONS.clear_selected });
      toastMessage("success", "Delete Successful");

      if (state.searchText == "") {
        getUsers();
      } else {
        search();
      }
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
    pages,
    prev,
    next,
    currentPage,
    getUsers,
    deleteRow,
    setState,
  ];
};

export default useUsers;
