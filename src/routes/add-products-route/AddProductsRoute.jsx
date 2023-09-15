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
    isUpdate,
    update,
  ] = useAddProducts();

  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto relative">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold ">Products</h1>
          <button
            disabled={state.isLoading}
            onClick={isUpdate ? update : save}
            className="bg-secondary text-white font-bold text-sm h-8 w-14 rounded-md flex justify-center items-center hover:bg-orange-600 active:scale-95"
          >
            {state.isLoading ? (
              <Oval width={18} height={18} color="white" />
            ) : isUpdate ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
          <div className="bg-white p-5 flex flex-col gap-1 ">
            <h1 className="text-lg font-bold">Products</h1>
            <TextBox
              label={"Name:"}
              placeHolder={"Enter product name"}
              name={"name"}
              onChangeHandler={setTextBox}
              value={state.name}
            />
            <DropDownBox
              label="Make:"
              placeHolder="Select Make"
              onClick={getModel}
              name="make"
              state={state.make}
            />

            <DropDownBox
              label="Model:"
              placeHolder="Select Model"
              state={state.model}
              onClick={getYear}
              name="model"
            />

            <DropDownBox
              label="year:"
              placeHolder="Select Year"
              state={state.year}
              onClick={selectOption}
              name="year"
            />
          </div>

          <div className="bg-white p-5 flex flex-col gap-1">
            <h1 className="text-lg font-bold">Image & Description</h1>

            <div className=" rounded-md flex justify-center items-center relative text-sm border-[1px] border-dashed border-secondary">
              <div className="flex justify-center items-center flex-col py-4">
                <img
                  src={
                    state.image?.passedImage
                      ? state.image.image
                      : state.image
                      ? URL.createObjectURL(state.image)
                      : img
                  }
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
                value={state.description}
              />
            </div>
          </div>

          <div className="bg-white p-5 flex flex-col gap-1">
            <h1 className="text-lg font-bold">Products</h1>
            <TextBox
              label={"Price:"}
              placeHolder={"Enter price"}
              name={"price"}
              onChangeHandler={setTextBox}
              value={state.price}
              type="number"
            />
            <DropDownBox
              placeHolder="Select condition"
              name="condition"
              label="condition:"
              state={state.condition}
              onClick={selectOption}
            />
            <DropDownBox
              label="New arrival:"
              placeHolder="Select"
              name="newArrival"
              state={state.newArrival}
              onClick={selectOption}
            />
            <DropDownBox
              label="Subcategory:"
              placeHolder="Select status"
              name="subCategory"
              state={state.subCategory}
              onClick={selectOption}
            />
            <DropDownBox
              label="Status:"
              placeHolder="Select status"
              name="status"
              state={state.status}
              onClick={selectOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsRoute;
