import emailTester from "../../../helper/email-tester/emailTester";

const validateInput = (state) => {
  let bool = true;
  let errorMsg = "";
  if (state.firstName == "") {
    bool = false;
    errorMsg = "Enter first name";
  } else if (state.lastName == "") {
    bool = false;
    errorMsg = "Enter last name";
  } else if (!emailTester(state.email)) {
    bool = false;
    errorMsg = "Enter email";
  } else if (state.phone == "") {
    bool = false;
    errorMsg = "Enter phone number";
  } else if (state.formActionType == "add" && state.password == "") {
    bool = false;
    errorMsg = "Enter password";
  } else if (state.userStatus.value == "") {
    bool = false;
    errorMsg = "Enter select user status option";
  } else if (state.emailVerified.text == "") {
    bool = false;
    errorMsg = "Enter select email verified option";
  }
  return { bool, errorMsg };
};

export default validateInput;
