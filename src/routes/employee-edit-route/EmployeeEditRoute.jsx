import Button from "../../components/button/Button";
import TextBox from "../../components/text-box/TextBox";
import { useNavigate } from "react-router-dom";

import CustomDropDown from "../../components/custom-drop-down/CustomDropDown";
import useEmployeeEdit from "./useEmployeeEdit";
const EmployeeEditRoute = () => {
  const nav = useNavigate();
  const [state, dispatch, dropDownOnClick, setTextBox, submit] =
    useEmployeeEdit();
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <form className="flex flex-col max-w-xs bg-white p-5">
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
            onChangeHandler={setTextBox}
            name={"firstName"}
            isDisabled={state.disableForm}
            value={state.firstName}
          />
          <TextBox
            label={"Lastname:"}
            placeHolder={"Please enter your last name"}
            onChangeHandler={setTextBox}
            name={"lastName"}
            isDisabled={state.disableForm}
            value={state.lastName}
          />
          <TextBox
            label={"Email:"}
            placeHolder={"Please enter your email"}
            onChangeHandler={setTextBox}
            name={"email"}
            isDisabled={state.disableForm}
            value={state.email}
          />

          <TextBox
            label={"Password:"}
            placeHolder={"Please enter a password"}
            onChangeHandler={setTextBox}
            name={"password"}
            isDisabled={state.disableForm}
            value={state.password}
            type="password"
          />

          <CustomDropDown
            label="Role:"
            isDisabled={state.disableForm}
            placeHolder="select"
            options={state.role.dropDown}
            value={state.role.text}
            name="role"
            onClick={dropDownOnClick}
          />
          <div className="mb-5"></div>
          <Button
            text={"Sign Up"}
            isLoading={state.btnIsLoading}
            onClick={submit}
          />
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditRoute;
