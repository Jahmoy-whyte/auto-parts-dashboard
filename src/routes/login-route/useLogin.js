import { useEffect, useState } from "react";

import toastMessage from "../../helper/toast-message/toastMessage";
import useFetchInstance from "../../hooks/useFetchInstance";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
const useLogin = () => {
  const [textBox, setTextBox] = useState({
    email: "",
    password: "",
  });
  const { logIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const textBoxHandler = (textBoxName, value) => {
    setTextBox((prev) => ({ ...prev, [textBoxName]: value }));
  };

  const submit = async () => {
    const { bool, message } = checkTextBox();
    if (bool) return toastMessage("error", message);
    setIsLoading(true);

    try {
      await logIn(textBox.email.trim(), textBox.password.trim());

      nav("/home");
    } catch (error) {
      toastMessage("error", error.message);
    }
    setIsLoading(false);
  };

  const checkTextBox = () => {
    let bool = false;
    let message = "";
    if (textBox.email == "") {
      (bool = true), (message = "Please enter your email");
    } else if (textBox.password == "") {
      (bool = true), (message = "Please enter a password");
    }

    return { bool, message };
  };
  return [textBox, isLoading, textBoxHandler, submit, nav];
};

export default useLogin;
