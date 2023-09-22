import { useEffect, useState, useReducer, useCallback } from "react";

import toastMessage from "../../helper/toast-message/toastMessage";
import useFetchInstance from "../../hooks/useFetchInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

const useEmployeeEdit = () => {
  const initialState = {
    formActionType: "add",
    btnIsLoading: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    disableForm: true,
    role: {
      text: "",
      value: "",
      dropDown: [
        { text: "employee", value: "employee" },
        { text: "admin", value: "admin" },
      ],
    },
  };

  const ACTIONS = {
    set_btn_loading: "set_btn_loading",
    set_text_box: "set_text_box",
    disable_form: "disable_form",
    set_drop_down: "set_drop_down",
    set_employee_data: "set_employee_data",
    set_from_action_type: "set_from_action_type",
  };
  /*
employee_id	
firstname	
lastname	
email	
password	
role

*/
  const reducer = (state, action) => {
    switch (action.type) {
      case "set_btn_loading":
        return { ...state, btnIsLoading: action.payload };
      case "set_employee_data": {
        const employeeData = action.payload;
        return {
          ...state,
          disableForm: false,
          formActionType: "update",
          employeeId: employeeData.id,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          email: employeeData.email,
          password: "",
          role: {
            ...state.role,
            text: employeeData.role,
            value: employeeData.role,
          },
        };
      }
      case "set_text_box": {
        const key = action.payload.key;
        const value = action.payload.value;
        return { ...state, [key]: value };
      }
      case "set_drop_down": {
        const key = action.payload.key;
        const value = action.payload.value;
        const text = action.payload.text;
        return { ...state, [key]: { ...state[key], text: text, value: value } };
      }

      case "set_from_action_type": {
        return { ...state, formActionType: action.payload, disableForm: false };
      }
      case "disable_form": {
        return { ...state, disableForm: action.payload };
      }
      default:
        return state;
    }
  };

  const nav = useNavigate();
  const { signUp } = useAuthContext();
  const params = useParams();
  const { tokenAwareFetch } = useFetchInstance();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const employee = await tokenAwareFetch(
          `/employee/employee-by-id/${params.employeeId}`
        );

        console.log(employee);
        dispatch({ type: ACTIONS.set_employee_data, payload: employee });
      } catch (error) {
        dispatch({ type: ACTIONS.disable_form, payload: true });
        toastMessage("error", error.message);
      }
    };

    if (params.employeeId != "add") {
      getEmployee();
    } else {
      dispatch({ type: ACTIONS.set_from_action_type, payload: "add" });
    }
  }, []);

  const dropDownOnClick = useCallback((key, value, text) => {
    dispatch({
      type: ACTIONS.set_drop_down,
      payload: {
        key: key,
        value: value,
        text: text,
      },
    });
  }, []);

  const setTextBox = useCallback((key, value) => {
    dispatch({
      type: ACTIONS.set_text_box,
      payload: {
        key: key,
        value: value,
      },
    });
  }, []);

  const submit = async () => {
    const { bool, message } = checkTextBox();
    if (bool) return toastMessage("error", message);
    setIsLoading(true);

    try {
      await signUp(
        textBox.firstName.trim(),
        textBox.lastName.trim(),
        textBox.email.trim(),
        textBox.password.trim()
      );
      toastMessage("success", "Account created successfully");
      nav("/");
    } catch (error) {
      toastMessage("error", error.message);
    }
    setIsLoading(false);
  };

  const checkTextBox = () => {
    let bool = false;
    let message = "";
    if (textBox.firstName == "") {
      (bool = true), (message = "Please enter your first name");
    } else if (textBox.lastName == "") {
      (bool = true), (message = "Please enter your last name");
    } else if (textBox.email == "") {
      (bool = true), (message = "Please enter your email");
    } else if (textBox.password == "") {
      (bool = true), (message = "Please enter a password");
    }

    return { bool, message };
  };
  return [state, dispatch, dropDownOnClick, setTextBox, submit];
};

export default useEmployeeEdit;
