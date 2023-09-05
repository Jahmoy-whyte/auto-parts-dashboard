import { useEffect, useState } from "react";

import toastMessage from "../../helper/toast-message/toastMessage";
import useFetchInstance from "../../hooks/useFetchInstance";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";

const useSignUp = () => {
  const [textBox, setTextBox] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { signUp } = useAuthContext();

  const textBoxHandler = (textBoxName, value) => {
    setTextBox((prev) => ({ ...prev, [textBoxName]: value }));
  };

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

  console.log(textBox);

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
  return [textBox, isLoading, textBoxHandler, submit];
};

export default useSignUp;
