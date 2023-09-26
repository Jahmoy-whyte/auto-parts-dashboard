import TabButton from "../../components/tab-buttons/TabButton";
import useProductDetails from "./useProductDetails";
import Card from "./components/card/Card";
import AddModel from "./components/add-model/AddModel";
import Button from "../../components/button/Button";
import { ACTIONS } from "./helper/reducerHelper";
import TabBar from "./components/tab-bar/TabBar";
import useRegularModelButton from "./hooks/useRegularModelButton";
import { BUTTON_ACTION_TYPE } from "./constants/buttonActionType";
const ProductDetailsRoute = () => {
  const [state, dispatch, getData, addBtnOnClick] = useProductDetails();
  const [regularModelBtnOnClick] = useRegularModelButton(
    state,
    dispatch,
    getData
  );
  //  console.log("ddddddddddddddddddddddddddddddddddddddd");
  return (
    <div className="outlet-outer-container relative">
      <AddModel
        dispatch={dispatch}
        modelData={state.regularModelData}
        buttonFunc={regularModelBtnOnClick}
      />
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">Product Details</h1>
        <div className="flex flex-col flex-1 bg-white p-5">
          <TabBar dispatch={dispatch} state={state} />
          {state.isLoading ? ".......ISLOADING" : null}

          <div className="flex flex-col gap-2 max-w-sm mt-2">
            <button className="text-white bg-secondary" onClick={addBtnOnClick}>
              Add
            </button>
            {state.tableData.map((data) => {
              return <Card data={data} key={data.id} dispatch={dispatch} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRoute;
/**
 * 
 * 

        
 */
