import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dbLogin } from "../../services/employeeApi";
const useLogin = () => {
  const [textBox, setTextBox] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const textBoxHandler = (textBoxName, value) => {
    setTextBox((prev) => ({ ...prev, [textBoxName]: value }));
  };

  const submit = async () => {
    const { bool, message } = checkTextBox();
    if (bool) return toast.error(message);
    setIsLoading(true);
    const { email, password } = textBox;
    try {
      const tokens = await dbLogin(email.trim(), password.trim());
      console.log("==========================");
      console.log(tokens);
    } catch (error) {
      toast.error(error.message);
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
  return [textBox, isLoading, textBoxHandler, submit];
};

export default useLogin;
