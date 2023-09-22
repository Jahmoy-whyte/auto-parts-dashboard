import { useCallback, useEffect, useReducer, useRef } from "react";
import useFetchInstance from "../../hooks/useFetchInstance";
import toastMessage from "../../helper/toast-message/toastMessage";
import usePagination from "../../hooks/usePagination";
import { useNavigate, useParams } from "react-router-dom";
import { ACTIONS, initialState, reducer } from "./helper/reducerHelper";
import validateInput from "./helper/validateInput";
const useUserEdit = () => {
  const params = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tokenAwareFetch } = useFetchInstance();
  const nav = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await tokenAwareFetch(
          `/users/user-by-id/${params.userId}`
        );

        dispatch({ type: ACTIONS.set_user, payload: user });
      } catch (error) {
        dispatch({ type: ACTIONS.disable_form, payload: true });
        toastMessage("error", error.message);
      }
    };

    if (params.userId != "add") {
      getUser();
    } else {
      dispatch({ type: ACTIONS.set_from_action_type, payload: "add" });
    }
  }, []);

  const submit = async () => {
    const { bool, errorMsg } = validateInput(state);
    if (!bool) return toastMessage("error", errorMsg);
    dispatch({
      type: ACTIONS.set_btn_loading,
      payload: true,
    });

    const userData = {
      ...state,
      emailVerified: state.emailVerified.value,
      userStatus: state.userStatus.value,
    };

    try {
      let msg = "";
      if (state.formActionType === "update") {
        msg = await tokenAwareFetch(`/users/user-update`, "PUT", {
          userData: userData,
        });
      } else {
        msg = await tokenAwareFetch(`/users/user-add`, "POST", {
          userData: userData,
        });
      }

      toastMessage("success", msg);
      nav("/home/users");
    } catch (error) {
      toastMessage("error", error.message);
    }

    dispatch({
      type: ACTIONS.set_btn_loading,
      payload: false,
    });
  };

  const dropDownOnClick = useCallback((key, value, text) => {
    dispatch({
      type: ACTIONS.set_dropdown,
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

  return [state, dispatch, submit, dropDownOnClick, setTextBox];
};

export default useUserEdit;
