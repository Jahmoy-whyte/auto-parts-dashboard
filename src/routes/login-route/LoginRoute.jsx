import Button from "../../components/button/Button";
import TextBox from "../../components/text-box/TextBox";
import EmailType from "./components/email-type/EmailType";

import useLogin from "./useLogin";
const LoginRoute = () => {
  const [textBox, isLoading, textBoxHandler, submit, nav, setTextBox] =
    useLogin();
  return (
    <div className="flex h-screen justify-center ">
      <form
        className="flex bg-white max-w-sm w-full p-4 flex-col gap-2 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Log in to your account</h1>
          <p className="text-sm text-gray-500 ">
            Please enter your email address and password to continue.
          </p>
        </div>
        <TextBox
          label={"Email:"}
          placeHolder={"Please enter your email"}
          onChangeHandler={textBoxHandler}
          name={"email"}
          isDisabled={isLoading}
          value={textBox.email}
        />
        <EmailType setTextBox={setTextBox} isLoading={isLoading} />
        <TextBox
          label={"Password:"}
          placeHolder={"Please enter your password"}
          onChangeHandler={textBoxHandler}
          name={"password"}
          isDisabled={isLoading}
          type="password"
          value={textBox.password}
        />

        <Button text={"Log In"} isLoading={isLoading} onClick={submit} />
        <div className="flex flex-row items-center text-sm gap-1">
          <p>Dont have an account? </p>
          <p className="text-secondary font-bold cursor-pointer">
            Contact Admin
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginRoute;
