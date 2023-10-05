export const initialState = {
  checkAll: false,
  isLoading: false,
  employeeTableData: [],
  selected: [],
  searchText: "",
  deleteBtnIsloading: false,
  filter: "firstname",
  dropDown: [
    { text: "First Name", value: "firstname" },
    { text: "Last Name", value: "lastname" },
    { text: "Email", value: "email" },
    { text: "ID", value: "employee_id" },
    { text: "Role", value: "role" },
  ],
  model: {
    name: "",
    id: "",
    isLoading: false,
    visible: false,
  },
};

export const ACTIONS = {
  set_employee_table: "set_employee_table",
  set_is_loading: "set_is_loading",
  set_search_text: "set_search_text",
  set_filter_value: "set_filter_value",
  setState: "setState",
  delete_btn_is_loading: "delete_btn_is_loading",
  single_select: "single_select",
  single_deselect: "single_deselect",
  select_all: "select_all",
  clear_selected: "clear_selected",

  set_model_visibility: "set_model_visibility",
  set_model_isLoading: "set_model_isLoading",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "set_employee_table": {
      return {
        ...state,
        employeeTableData: action.payload,
        isLoading: false,
      };
    }
    case "set_is_loading":
      return { ...state, isLoading: action.payload };

    case "set_search_text":
      return { ...state, searchText: action.payload };

    case "set_filter_value":
      return { ...state, filter: action.payload };

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
        selected: state.employeeTableData.map((row) => row.id),
      };

    case "clear_selected":
      return { ...state, checkAll: false, selected: [] };
    case "set_model_visibility": {
      const visible = action.payload.visible;
      const id = action.payload.id;
      const name = action.payload.name;
      return {
        ...state,
        model: {
          ...state.model,
          visible: visible,
          id: id,
          name: name,
          isLoading: false,
        },
      };
    }
    case "set_model_isLoading":
      return {
        ...state,
        model: { ...state.model, isLoading: action.payload },
      };
    default:
      return state;
  }
};
