import Button from "../../components/button/Button";
import TextBox from "../../components/text-box/TextBox";
import { useNavigate } from "react-router-dom";
import useSignUp from "./useSignUp";
const SignUpRoute = () => {
  const nav = useNavigate();
  const [textBox, isLoading, textBoxHandler, submit] = useSignUp();
  return (
    <div className="flex h-screen justify-center ">
      <div className="flex bg-white max-w-sm w-full p-4 flex-col gap-2 mt-5">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Sign up for account</h1>
          <p className="text-sm text-gray-500 ">
            Please enter your information correctly and create a password to
            continue.
          </p>
        </div>
        <TextBox
          label={"Firstname:"}
          placeHolder={"Please enter your first name"}
          onChangeHandler={textBoxHandler}
          name={"firstName"}
          isDisabled={isLoading}
        />
        <TextBox
          label={"Lastname:"}
          placeHolder={"Please enter your last name"}
          onChangeHandler={textBoxHandler}
          name={"lastName"}
          isDisabled={isLoading}
        />
        <TextBox
          label={"Email:"}
          placeHolder={"Please enter your email"}
          onChangeHandler={textBoxHandler}
          name={"email"}
          isDisabled={isLoading}
        />

        <TextBox
          label={"Password:"}
          placeHolder={"Please enter a password"}
          onChangeHandler={textBoxHandler}
          name={"password"}
          isDisabled={isLoading}
          type="password"
        />

        <Button text={"Sign Up"} isLoading={isLoading} onClick={submit} />

        <div className="flex flex-row items-center text-sm gap-1">
          <p>Already have an account? </p>
          <p
            onClick={() => nav("/")}
            className="text-secondary font-bold cursor-pointer"
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpRoute;
