import { useCallback, useEffect, useReducer, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import { ACTIONS, initialState } from "./helper/reducerHelper";

const useProducts = () => {
  const chunks = 4;

  const reducer = (state, action) => {
    switch (action.type) {
      case "set-products":
        return {
          ...state,
          products: action.payload.products,
          currentPage: action.payload.currentPage,
          isLoading: false,
          selected: [],
        };

      case "set-page-chunk":
        return {
          ...state,
          pageChunk: action.payload.pageChunk,
          currentPageChunk: action.payload.currentPageChunk,
        };

      case "page-setup":
        return {
          ...state,
          numberOfPages: action.payload.numberOfPages,
          pageChunk: action.payload.pageChunk,
          numberOfPageChunks: action.payload.numberOfPageChunks,
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
      case "set-selected":
        return {
          ...state,
          selected: [...state.selected, action.payload],
        };

      case "deselect":
        return {
          ...state,
          selected: state.selected.filter((id) => id != action.payload),
        };

      default:
        state;
    }
  };

  const { tokenAwareFetch } = useFetchInstance();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (pageNumber = 0) => {
    const productsPerPage = state.productsPerPage;
    const startingNumber = productsPerPage * pageNumber;
    const products = await tokenAwareFetch(
      `/products/products/get?start=${startingNumber}&limit=${productsPerPage}`
    );
    dispatch({
      type: ACTIONS.SET_PRODUCTS,
      payload: { products: products, currentPage: pageNumber },
    });
  };

  useEffect(() => {
    // start up useEffect =======
    const getInitialProducts = async () => {
      try {
        const count = await tokenAwareFetch("/products/product/count");
        const [numberOfPages, numberOfPageChunks, pageChunk] = caluPages(
          count?.numOfProducts
        );
        dispatch({
          type: ACTIONS.PAGE_SETUP,
          payload: {
            numberOfPages: numberOfPages,
            pageChunk: pageChunk,
            numberOfPageChunks: numberOfPageChunks,
          },
        });
      } catch (error) {
        toastMessage("error", error.message);
      }
    };

    getInitialProducts();
  }, []);

  const caluPages = (numOfProducts) => {
    // get number of pages
    //to get total page number numOfProducts / productsPerPage
    //productsPerPage is the limit of how many products is return after a query
    const numberOfPages = Math.ceil(numOfProducts / state.productsPerPage);

    const numberOfPageChunks = Math.ceil(numberOfPages / chunks); //chunks is how many page number to show at a time

    const pages = [...Array(numberOfPages).keys()];
    const pageChunk = pages.length > chunks ? pages.slice(0, chunks) : pages;
    return [numberOfPages, numberOfPageChunks, pageChunk];
  };

  useEffect(() => {
    // search useEffect =======
    if (state.numberOfPages == 0) return;
    if (state.searchText == "") {
      getProducts(0);
      return;
    }

    dispatch({
      type: ACTIONS.SET_IS_LOADING,
      payload: true,
    });

    const time = setTimeout(async () => {
      try {
        const products = await tokenAwareFetch(
          `/products/products/search?text=${state.searchText}&filter=${state.searchTextFilter}`
        );

        dispatch({
          type: ACTIONS.SET_PRODUCTS,
          payload: { products: products, currentPage: state.currentPage },
        });
      } catch (error) {
        toastMessage("error", error.message);
        dispatch({
          type: ACTIONS.SET_IS_LOADING,
          payload: true,
        });
      }
    }, 1500);

    return () => clearTimeout(time);
  }, [state.searchText, state.numberOfPages]);

  const next = () => {
    const currentPageChunk = state.currentPageChunk;

    if (currentPageChunk == state.numberOfPageChunks) return;

    const pages = [...Array(state.numberOfPages).keys()];
    const start = state.pageChunk[0] + chunks;
    const end = start + chunks;

    dispatch({
      type: ACTIONS.SET_PAGE_CHUNK,
      payload: {
        pageChunk: pages.slice(start, end),
        currentPageChunk: currentPageChunk + 1,
      },
    });
  };

  const prev = () => {
    const currentPageChunk = state.currentPageChunk;
    if (currentPageChunk == 1) return;
    const pages = [...Array(state.numberOfPages).keys()];
    const start = state.pageChunk[0] - chunks;
    const end = start + chunks;

    dispatch({
      type: ACTIONS.SET_PAGE_CHUNK,
      payload: {
        pageChunk: pages.slice(start, end),
        currentPageChunk: state.currentPageChunk - 1,
      },
    });
  };

  //console.log(state.currentPageChunk + "==" + state.numberOfPageChunks);
  console.log(state.selected);
  return [state, dispatch, getProducts, prev, next];
};

export default useProducts;
