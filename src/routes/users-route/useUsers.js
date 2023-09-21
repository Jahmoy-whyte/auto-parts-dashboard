import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import usePagination from "../../hooks/usePagination";
import { useNavigate } from "react-router-dom";

const useUsers = () => {
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

  const NUMBER_OF_ROWS_PER_PAGE = 10;
  const NUMBER_OF_CHUNKS_PER_SHOWN = 5;
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
    set_search_text: "set_search_text",
    setState: "setState",
    delete_btn_is_loading: "delete_btn_is_loading",

    single_select: "single_select",
    single_deselect: "single_deselect",
    select_all: "select_all",
    clear_selected: "clear_selected",
  };

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
          selected: state.usersTableData.map((row) => row.id),
        };

      case "clear_selected":
        return { ...state, selected: [] };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();
  const { pages, currentPage, calulatePages, next, prev, setCurrentPage } =
    usePagination();
  const nav = useNavigate();

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
        NUMBER_OF_CHUNKS_PER_SHOWN
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

  const rowSelect = useCallback((actionType, id) => {
    dispatch({
      type: ACTIONS[actionType],
      payload: id,
    });
  }, []);
  const navigate = useCallback((id) => {
    nav("/home/users/edit");
  }, []);

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

  return [
    state,
    dispatch,
    tableHeading,
    pages,
    prev,
    next,
    currentPage,
    getUsers,
    rowSelect,
    deleteRow,
    setState,
    navigate,
  ];
};

export default useUsers;
