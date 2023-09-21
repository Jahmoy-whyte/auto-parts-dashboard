import Button from "../../components/button/Button";
import CustomDropDown from "../../components/custom-drop-down/CustomDropDown";
import TextBox from "../../components/text-box/TextBox";

const UserEditRoute = () => {
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">Edit</h1>
        <div className="flex flex-col flex-1 bg-white p-5 max-w-sm">
          <div className="flex flex-col gap-2 flex-wrap max-w-sm">
            <TextBox label={"First Name:"} />
            <TextBox label={"Last Name:"} />
            <TextBox label={"Email:"} />
            <TextBox label={"Phone Number:"} />
            <TextBox label={"Password:"} />
            <CustomDropDown label="Email Verified" />

            <Button text={"Save"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditRoute;
