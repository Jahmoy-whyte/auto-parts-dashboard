import { useEffect, useReducer, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";

const useProducts = () => {
  const initialState = {
    isLoading: true,
    products: [],
    pageCount: 0,
    pageEnd: 0,
    pages: [],
    currentPage: 0,
  };

  const ACTIONS = {
    SET_PRODUCTS: "set-products",
    SET_PAGE: "set-page",
    PAGE_SETUP: "page-setup",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "set-products":
        return {
          ...state,
          products: action.payload.products,
          currentPage: action.payload.currentPage,
          isLoading: false,
        };

      case "set-page":
        return {
          ...state,
          pages: action.payload,
        };

      case "page-setup":
        return {
          ...state,
          pageCount: action.payload.pageCount,
          pages: action.payload.pages,
          pageEnd: action.payload.pageEnd,
        };
      default:
        state;
    }
  };

  const { tokenAwareFetch } = useFetchInstance();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (pageNumber = 0) => {
    const startingNumber = 15 * pageNumber;
    const products = await tokenAwareFetch(
      `/products/get-products/${startingNumber}`
    );
    dispatch({
      type: ACTIONS.SET_PRODUCTS,
      payload: { products: products, currentPage: pageNumber },
    });
  };

  useEffect(() => {
    const getInitialProducts = async () => {
      try {
        const count = await tokenAwareFetch("/products/product/count");
        const [pageCount, pageEnd, pages] = caluPages(count?.numOfProducts);
        dispatch({
          type: ACTIONS.PAGE_SETUP,
          payload: { pageCount: pageCount, pages: pages, pageEnd: pageEnd },
        });
        await getProducts(0);

        // console.log(caluPages(count?.numOfProducts));
      } catch (error) {
        toastMessage("error", error.message);
      }
    };

    getInitialProducts();
  }, []);

  const caluPages = (count) => {
    const pageCount = Math.ceil(count / 15);
    const pageEnd = Math.ceil(pageCount / 4);
    const pages = [...Array(pageCount).keys()];
    return [pageCount, pageEnd, pages.length > 4 ? pages.slice(0, 4) : pages];
  };

  const next = () => {
    const pages = [...Array(state.pageCount).keys()];
    const start = state.pages[0] + 4;
    const end = 4;

    console.log(start + "========" + end);
    dispatch({
      type: ACTIONS.SET_PAGE,
      payload: pages.splice(start, end),
    });
  };

  const prev = () => {
    const pages = [...Array(state.pageCount).keys()];
    const start = state.pages[0] - 4;
    const end = 4;

    console.log(start + "========" + end);
    dispatch({
      type: ACTIONS.SET_PAGE,
      payload: pages.splice(start, end),
    });
  };

  console.log(state.currentPage);

  return [state, dispatch, getProducts, prev, next];
};

export default useProducts;
