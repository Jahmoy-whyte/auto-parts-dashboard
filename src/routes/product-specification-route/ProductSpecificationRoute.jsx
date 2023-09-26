import useProductSpecification from "./useProductSpecification";
import TabBar from "./components/tab-bar/TabBar";
import { Outlet } from "react-router-dom";
import SingleModel from "./components/single-model/SingleModel";

const ProductSpecificationRoute = () => {
  const [state, dispatch] = useProductSpecification();
  return (
    <div className="outlet-outer-container relative">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">Product Specification</h1>
        <div className="flex flex-col flex-1 bg-white p-5">
          <TabBar state={state} dispatch={dispatch} />
          {state.isLoading ? ".......ISLOADING" : null}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProductSpecificationRoute;
/**
 * 
 * 

        
 */
