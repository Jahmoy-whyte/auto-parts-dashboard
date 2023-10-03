import DoubleCard from "../../components/doubleCardcard/DoubleCard";
import ModelWithDropDown from "../../components/model-with-dropdown/ModelWithDropDown";
import useYear from "./useYear";
import Button from "../../../../components/button/Button";
const YearRoute = () => {
  const [state, dispatch, addBtnOnClick, modelButtonOnClickHandler] = useYear();
  return (
    <>
      <ModelWithDropDown
        modelData={state.modelData}
        dispatch={dispatch}
        buttonFunc={modelButtonOnClickHandler}
      />

      <div className="flex flex-col gap-2 max-w-sm mt-2 overflow-y">
        <Button
          className="h-8 text-sm"
          onClick={addBtnOnClick}
          text={"Add"}
          isLoading={state.isLoading}
        />
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
