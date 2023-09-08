import { useEffect, useReducer, useState } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";

const useProducts = () => {
  const initialState = {
    isLoading: true,
    products: [],
    pageCount: 0,
    page: 0,
  };

  const ACTIONS = {
    SET_PRODUCTS: "set-products",
    SET_PAGE_COUNT: "set-page-count",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "set-products":
        return {
          ...state,
          products: action.payload.products,
          pageNumber: action.payload.pageNumber,
          isLoading: false,
        };
      case "set-page-count":
        return {
          ...state,
          pageCount: action.payload,
        };
      default:
        state;
    }
  };

  const { tokenAwareFetch } = useFetchInstance();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (PageNumber = 0) => {
    const startingNumber = 15 * PageNumber;
    const products = await tokenAwareFetch(
      `/products/get-products/${startingNumber}`
    );
    dispatch({
      type: ACTIONS.SET_PRODUCTS,
      payload: { products: products, pageNumber: PageNumber },
    });
  };

  useEffect(() => {
    const getInitialProducts = async () => {
      try {
        const count = await tokenAwareFetch("/products/product/count");
        dispatch({
          type: ACTIONS.SET_PAGE_COUNT,
          payload: caluPages(count?.numOfProducts),
        });
        await getProducts(0);

        console.log(caluPages(count?.numOfProducts));
      } catch (error) {
        toastMessage("error", error.message);
      }
    };

    getInitialProducts();
  }, []);

  const caluPages = (count) => {
    const pages = Math.ceil(count / 15);
    return pages;
  };

  return [state, dispatch, getProducts];
};

export default useProducts;
