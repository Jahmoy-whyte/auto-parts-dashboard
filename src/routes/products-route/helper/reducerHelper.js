export const initialState = {
  deleteBtnIsloading: false,
  isLoading: true,
  products: [],
  numberOfPages: 0,
  numberOfPageChunks: 0,
  pageChunk: [],
  currentPageChunk: 1,
  currentPage: 0,
  productsPerPage: 15,
  searchText: "",
  searchTextFilter: "product_name",
  selected: [],
};

export const ACTIONS = {
  SET_PRODUCTS: "set-products",
  SET_PAGE_CHUNK: "set-page-chunk",
  PAGE_SETUP: "page-setup",
  SET_SEARCH_TEXT: "set-search-text",
  SET_FILTER: "set-filter",
  SET_IS_LOADING: "set-is-loading",
  SET_SELECTED: "set-selected",
  DESELECT: "deselect",
  DELETE_BTN_IS_LOADING: "delete-btn-is-loading",
  CLEAR_SELECTED: "clear-selected",
};
