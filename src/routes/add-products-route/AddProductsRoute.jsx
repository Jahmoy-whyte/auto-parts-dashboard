import CustomDropDown from "../../components/custom-drop-down/CustomDropDown";
import TextBox from "../../components/text-box/TextBox";
import img from "../../assets/images/placeholderimg.svg";
const arr = [1, 2, 3, 4, 5, 6];
const AddProductsRoute = () => {
  return (
    <div className="flex h-screen flex-col  bg-slate-100 items-center  flex-1 overflow-y-auto">
      <div className="flex w-full max-w-6xl mt-5 flex-1 flex-col px-5">
        <h1 className="text-2xl font-bold mb-5">Products</h1>

        <div className="grid grid-cols-2 gap-5 ">
          <div className="bg-white p-5">
            <h1 className="text-lg font-bold">Products</h1>
            <TextBox label={"Name:"} placeHolder={"Enter product name"} />
            <CustomDropDown
              options={arr}
              placeHolder="Select make"
              dropDownId="w1"
              label="Make:"
            />
            <CustomDropDown
              options={arr}
              label="Model:"
              placeHolder="Select model"
              dropDownId="w2"
            />
            <CustomDropDown
              options={arr}
              label="Year:"
              placeHolder="Select year"
              dropDownId="w6"
            />
          </div>

          <div className="bg-white p-5">
            <h1 className="text-lg font-bold">Description</h1>

            <div>
              <div>
                <img src={img} className="w-24 h-24" />
              </div>
              <label>image:</label>
              <input
                type="file"
                onChange={(e) => console.log(e.currentTarget.files)}
              />
            </div>
            <TextBox label={"Description:"} />
          </div>

          <div className="bg-white p-5">
            <h1 className="text-lg font-bold">Products</h1>
            <TextBox label={"Price:"} placeHolder={"Enter product name"} />
            <CustomDropDown
              options={arr}
              placeHolder="Select condition"
              dropDownId="b1"
              label="condition:"
            />
            <CustomDropDown
              options={arr}
              label="New arrival:"
              placeHolder="Select"
              dropDownId="wdwd"
            />
            <CustomDropDown
              options={arr}
              label="Subcategory:"
              placeHolder="Select status"
              dropDownId="dww2"
            />
            <CustomDropDown
              options={arr}
              label="Status:"
              placeHolder="Select status"
              dropDownId="dww2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsRoute;
