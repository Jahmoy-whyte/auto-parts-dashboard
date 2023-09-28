import { useCallback, useEffect, useReducer, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS, initialState } from "./helper/reducerHelper";
import usePagination from "../../hooks/usePagination";

const useProducts = () => {
  const NUMBER_OF_PAGES_PER_CHUNKS = 4;
  const NUMBER_OF_ROWS_PER_PAGE = 15;
  const reducer = (state, action) => {
    switch (action.type) {
      case "delete-btn-is-loading":
        return {
          ...state,
          deleteBtnIsloading: action.payload,
        };

      case "set-products":
        return {
          ...state,
          products: action.payload,

          isLoading: false,
          selected: [],
        };

      case "set-search-text":
        return {
          ...state,
          searchText: action.payload,
        };

      case "set-filter":
        return {
          ...state,
          searchTextFilter: action.payload,
        };

      case "set-is-loading":
        return {
          ...state,
          isLoading: action.payload,
        };

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
          selected: state.products.map((row) => row.id),
        };

      case "clear_selected":
        return {
          ...state,
          selected: [],
          checkAll: false,
          deleteBtnIsloading: false,
        };

      default:
        return state;
    }
  };

  const { pages, prev, setCurrentPage, calulatePages, currentPage, next } =
    usePagination();
  const { tokenAwareFetch } = useFetchInstance();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    try {
      const productsPerPage = NUMBER_OF_ROWS_PER_PAGE;
      const startingNumber = currentPage * NUMBER_OF_ROWS_PER_PAGE;
      const products = await tokenAwareFetch(
        `/products/products/get?start=${startingNumber}&limit=${productsPerPage}`
      );

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  useEffect(() => {
    // start up useEffect =======
    const getInitialProducts = async () => {
      try {
        const count = await tokenAwareFetch("/products/product/count");

        calulatePages(
          count?.numOfProducts,
          NUMBER_OF_ROWS_PER_PAGE,
          NUMBER_OF_PAGES_PER_CHUNKS
        );
      } catch (error) {
        toastMessage("error", error.message);
      }
    };

    getInitialProducts();
  }, []);

  useEffect(() => {
    // search useEffect =======

    if (state.searchText == "") {
      getProducts();
      return;
    }

    dispatch({
      type: ACTIONS.SET_IS_LOADING,
      payload: true,
    });

    const time = setTimeout(async () => {
      productSearch();
    }, 1500);

    return () => clearTimeout(time);
  }, [state.searchText, currentPage, state.searchTextFilter]);

  const productSearch = async () => {
    try {
      const products = await tokenAwareFetch(
        `/products/products/search?text=${state.searchText}&filter=${state.searchTextFilter}`
      );

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({
        type: ACTIONS.SET_IS_LOADING,
        payload: true,
      });
    }
  };
  const deleteProduct = async () => {
    dispatch({
      type: ACTIONS.DELETE_BTN_IS_LOADING,
      payload: true,
    });
    const selected = state.selected;
    try {
      for (let i = 0; i < selected.length; i++) {
        const msg = await tokenAwareFetch("/products", "DELETE", {
          id: selected[i],
        });
      }

      dispatch({ type: ACTIONS.clear_selected });
      toastMessage("success", "Delete Successful");

      if (state.searchText == "") {
        getProducts();
      } else {
        productSearch();
      }
    } catch (error) {
      toastMessage("error", error.message);
      dispatch({
        type: ACTIONS.DELETE_BTN_IS_LOADING,
        payload: false,
      });
    }
  };

  //console.log(state.currentPageChunk + "==" + state.numberOfPageChunks);

  return [
    state,
    dispatch,

    deleteProduct,
    pages,
    setCurrentPage,
    currentPage,
    prev,
    next,
  ];
};

export default useProducts;
