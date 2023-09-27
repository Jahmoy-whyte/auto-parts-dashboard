import DoubleCard from "../../components/doubleCardcard/DoubleCard";
import ModelWithDropDown from "../../components/model-with-dropdown/ModelWithDropDown";
import useYear from "./useYear";

const YearRoute = () => {
  const [state, dispatch, addBtnOnClick, modelButtonOnClickHandler] = useYear();
  return (
    <>
      <ModelWithDropDown
        modelData={state.modelData}
        dispatch={dispatch}
        buttonFunc={modelButtonOnClickHandler}
      />
      {state.isLoading ? ".......ISLOADING" : null}
      <div className="flex flex-col gap-2 max-w-sm mt-2 overflow-y">
        <button className="text-white bg-secondary" onClick={addBtnOnClick}>
          Add
        </button>
        {state.tableData.map((data) => {
          return (
            <DoubleCard
              text1={data.model}
              id1={data.modelId}
              text2={data.year}
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

export default YearRoute;
/**
 * 
 * 

        
 */
