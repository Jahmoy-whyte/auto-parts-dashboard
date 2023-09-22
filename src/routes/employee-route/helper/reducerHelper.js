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
};

export const ACTIONS = {
  set_employee_table: "set_employee_table",
  set_is_loading: "set_is_loading",
  set_search_text: "set_search_text",
  setState: "setState",
  delete_btn_is_loading: "delete_btn_is_loading",
  single_select: "single_select",
  single_deselect: "single_deselect",
  select_all: "select_all",
  clear_selected: "clear_selected",
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
    case "setState":
      const key = action.payload.key;
      const value = action.payload.value;
      return {
        ...state,
        [key]: value,
      };

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

    default:
      return state;
  }
};
