import CustomDropDown from "../../components/custom-drop-down/CustomDropDown";
import TextBox from "../../components/text-box/TextBox";
import img from "../../assets/images/placeholderimg1.svg";
import SelectBox from "./components/select-box/SelectBox";
import CustomModel from "./components/model/CustomModel";
import useAddProducts from "./useAddProducts";
import DropDownBox from "./components/drop-down-box/DropDownBox";
import { Oval } from "react-loader-spinner";

const AddProductsRoute = () => {
  const [
    state,
    dispatch,
    getModel,
    getYear,
    selectOption,
    setTextBox,
    save,
    setImage,
  ] = useAddProducts();
  console.log(state);
  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto relative">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold ">Products</h1>
          <button
            onClick={save}
            className="bg-secondary text-white font-bold text-sm h-8 w-14 rounded-md"
          >
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
          <div className="bg-white p-5 flex flex-col gap-1">
            <h1 className="text-lg font-bold">Products</h1>
            <TextBox
              label={"Name:"}
              placeHolder={"Enter product name"}
              name={"name"}
              onChangeHandler={setTextBox}
            />
            <DropDownBox
              label="Make:"
              placeHolder="Select Make"
              text={state.make.text}
              options={state.make.data}
              disabled={state.make.isDisabled}
              onClick={getModel}
              name="make"
            />

            <DropDownBox
              label="Model:"
              placeHolder="Select Model"
              text={state.model.text}
              options={state.model.data}
              disabled={state.model.isDisabled}
              onClick={getYear}
              name="model"
            />

            <DropDownBox
              label="year:"
              placeHolder="Select Year"
              options={state.year.data}
              text={state.year.text}
              disabled={state.year.isDisabled}
              onClick={selectOption}
              name="year"
            />
          </div>

          <div className="bg-white p-5 flex flex-col gap-1">
            <h1 className="text-lg font-bold">Image & Description</h1>

            <div className=" rounded-md flex justify-center items-center relative text-sm border-[1px] border-dashed border-secondary">
              <div className="flex justify-center items-center flex-col py-4">
                <img
                  src={state.image ? URL.createObjectURL(state.image) : img}
                  className="w-24 h-24"
                />
                <p className="text-sm">
                  {state.image ? state.image?.name : "Drap And Drop Image"}
                </p>
              </div>

              <input
                className="absolute h-full bg-blue-300 opacity-0"
                type="file"
                accept="image/png"
                onChange={setImage}
              />
            </div>

            <div>
              <label className="text-sm">Description:</label>
              <textarea
                placeholder="Enter description"
                className="w-full border-2 rounded-md resize-none px-2  text-sm"
                onChange={(e) => setTextBox("description", e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-5 flex flex-col gap-1">
            <h1 className="text-lg font-bold">Products</h1>
            <TextBox
              label={"Price:"}
              placeHolder={"Enter product name"}
              name={"price"}
              onChangeHandler={setTextBox}
            />
            <DropDownBox
              placeHolder="Select condition"
              name="condition"
              label="condition:"
              text={state.condition.text}
              options={state.condition.data}
              onClick={selectOption}
            />
            <DropDownBox
              label="New arrival:"
              placeHolder="Select"
              name="newArrival"
              text={state.newArrival.text}
              options={state.newArrival.data}
              onClick={selectOption}
            />
            <DropDownBox
              label="Subcategory:"
              placeHolder="Select status"
              name="subCategory"
              text={state.subCategory.text}
              options={state.subCategory.data}
              disabled={state.subCategory.isDisabled}
              onClick={selectOption}
            />
            <DropDownBox
              label="Status:"
              placeHolder="Select status"
              name="status"
              text={state.status.text}
              options={state.status.data}
              onClick={selectOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsRoute;
