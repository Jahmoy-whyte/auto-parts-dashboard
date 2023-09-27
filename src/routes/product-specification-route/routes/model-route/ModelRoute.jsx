import DoubleCard from "../../components/doubleCardcard/DoubleCard";
import ModelWithDropDown from "../../components/model-with-dropdown/ModelWithDropDown";
import SingleCard from "../../components/single-card/SingleCard";

import useModel from "./useModel";

const ModelRoute = () => {
  const [state, dispatch, addBtnOnClick, modelButtonOnClickHandler] =
    useModel();
  return (
    <>
      <ModelWithDropDown
        modelData={state.modelData}
        dispatch={dispatch}
        buttonFunc={modelButtonOnClickHandler}
      />
      {state.isLoading ? ".......ISLOADING" : null}
      <div className="flex flex-col gap-2 max-w-sm mt-2">
        <button className="text-white bg-secondary" onClick={addBtnOnClick}>
          Add
        </button>
        {state.tableData.map((data) => {
          return (
            <DoubleCard
              text1={data.make}
              id1={data.makeId}
              text2={data.model}
              id2={data.id}
              key={data.id}
              dispatch={dispatch}
              state={state}
            />
          );
        })}
      </div>
    </>
  );
};

export default ModelRoute;
/**
 * 
 * 

        
 */
