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
  checkAll: false,

  filterOptions: [
    { text: "Product", value: "product_name" },
    { value: "product_id", text: "Id" },
  ],
};

export const ACTIONS = {
  SET_PRODUCTS: "set-products",
  SET_PAGE_CHUNK: "set-page-chunk",
  PAGE_SETUP: "page-setup",
  SET_SEARCH_TEXT: "set-search-text",
  SET_FILTER: "set-filter",
  SET_IS_LOADING: "set-is-loading",
  DELETE_BTN_IS_LOADING: "delete-btn-is-loading",

  single_select: "single_select",
  single_deselect: "single_deselect",
  select_all: "select_all",
  clear_selected: "clear_selected",
};
