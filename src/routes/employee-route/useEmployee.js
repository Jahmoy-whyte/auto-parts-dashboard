import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import usePagination from "../../hooks/usePagination";
import { ACTIONS, initialState, reducer } from "./helper/reducerHelper";
const useEmployee = () => {
  const NUMBER_OF_ROWS_PER_PAGE = 5;
  const NUMBER_OF_PAGES_PER_CHUNKS = 3;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();
  const { pages, currentPage, calulatePages, next, prev, setCurrentPage } =
    usePagination();

  useEffect(() => {
    if (state.searchText == "") {
      getEmployees();
      return;
    }
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    const timeOut = setTimeout(() => {
      search();
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [state.searchText]);

  useEffect(() => {
    countEmployee();
  }, []);

  const search = async () => {
    try {
      const data = await tokenAwareFetch(
        `/employee/employee-search/${state.filter}/${state.searchText}`
      );

      dispatch({
        type: ACTIONS.set_employee_table,
        payload: data,
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const countEmployee = async () => {
    try {
      const data = await tokenAwareFetch(`/employee/count-all-employees`);

      calulatePages(
        data.count,
        NUMBER_OF_ROWS_PER_PAGE,
        NUMBER_OF_PAGES_PER_CHUNKS
      );
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const getEmployees = useCallback(async (start = 0) => {
    setCurrentPage(start);
    const startingNumber = start * NUMBER_OF_ROWS_PER_PAGE;
    dispatch({ type: ACTIONS.set_is_loading, payload: true });
    try {
      const data = await tokenAwareFetch(
        `/employee/all-employees/${startingNumber}/${NUMBER_OF_ROWS_PER_PAGE}`
      );

      dispatch({
        type: ACTIONS.set_employee_table,
        payload: data,
      });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_is_loading, payload: false });
    }
  }, []);

  const deleteRow = async () => {
    dispatch({
      type: ACTIONS.delete_btn_is_loading,
      payload: true,
    });
    const selected = state.selected;
    try {
      for (let i = 0; i < selected.length; i++) {
        const msg = await tokenAwareFetch("/employee", "DELETE", {
          employeeId: selected[i],
        });
      }

      dispatch({ type: ACTIONS.clear_selected });
      toastMessage("success", "Delete Successful");

      if (state.searchText == "") {
        getEmployees();
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

  const signOutEmployee = async () => {
    dispatch({ type: ACTIONS.set_model_isLoading, payload: true });
    try {
      const message = await tokenAwareFetch(
        `/employee/invalidate-refresh-token/${state.model.id}`,
        "DELETE"
      );
      toastMessage("success", message);
      dispatch({
        type: ACTIONS.set_model_visibility,
        payload: {
          visible: false,
          id: "",
          name: "",
        },
      });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({ type: ACTIONS.set_model_isLoading, payload: false });
    }
  };

  return [
    state,
    dispatch,
    pages,
    prev,
    next,
    currentPage,
    getEmployees,
    deleteRow,
    signOutEmployee,
  ];
};

export default useEmployee;
