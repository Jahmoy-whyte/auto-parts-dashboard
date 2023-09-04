import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dbSignup } from "../../services/employeeApi";

const useSignUp = () => {
  const [textBox, setTextBox] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const textBoxHandler = (textBoxName, value) => {
    setTextBox((prev) => ({ ...prev, [textBoxName]: value }));
  };

  const submit = async () => {
    const { bool, message } = checkTextBox();
    if (bool) return toast.error(message);
    setIsLoading(true);

    const { firstName, lastName, email, password } = textBox;
    try {
      await dbSignup(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        password.trim()
      );
      toast.success("Account Created");
    } catch (error) {
      toast.error(error.message);
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
