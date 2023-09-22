import Button from "../../components/button/Button";
import CustomDropDown from "../../components/custom-drop-down/CustomDropDown";
import TextBox from "../../components/text-box/TextBox";
import { ACTIONS } from "./helper/reducerHelper";
import useUserEdit from "./useUserEdit";

const UserEditRoute = () => {
  const [state, dispatch, submit, dropDownOnClick, setTextBox] = useUserEdit();
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">Edit</h1>
        <div className="flex flex-col flex-1 bg-white p-5 max-w-sm">
          <form
            className="flex flex-col gap-2 flex-wrap max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextBox
              label={"First Name:"}
              placeHolder={"Enter Firstname"}
              value={state.firstName}
              name={"firstName"}
              onChangeHandler={setTextBox}
              isDisabled={state.disableForm}
            />
            <TextBox
              label={"Last Name:"}
              placeHolder={"Enter Lastname"}
              value={state.lastName}
              name={"lastName"}
              onChangeHandler={setTextBox}
              isDisabled={state.disableForm}
            />
            <TextBox
              label={"Email:"}
              placeHolder={"Enter Email Address"}
              value={state.email}
              name={"email"}
              onChangeHandler={setTextBox}
              isDisabled={state.disableForm}
            />
            <TextBox
              label={"Phone Number:"}
              placeHolder={"Enter Phone Number"}
              value={state.phone}
              name={"phone"}
              onChangeHandler={setTextBox}
              isDisabled={state.disableForm}
            />

            {state.formActionType == "add" ? (
              <TextBox
                label={"Password:"}
                placeHolder={"Enter Password"}
                value={state.password}
                name={"password"}
                onChangeHandler={setTextBox}
                isDisabled={state.disableForm}
              />
            ) : null}

            <CustomDropDown
              label="User Status"
              placeHolder="Select"
              value={state.userStatus.text}
              options={state.userStatus.dropDown}
              onClick={dropDownOnClick}
              isDisabled={state.disableForm}
              name="userStatus"
            />
            <CustomDropDown
              label="Email Verified"
              placeHolder="Select"
              value={state.emailVerified.text}
              options={state.emailVerified.dropDown}
              name="emailVerified"
              onClick={dropDownOnClick}
              isDisabled={state.disableForm}
            />
            <Button
              text={"Save"}
              isLoading={state.btnIsLoading}
              onClick={submit}
              isDisabled={state.disableForm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditRoute;
