import DoubleCard from "../../components/doubleCardcard/DoubleCard";
import ModelWithDropDown from "../../components/model-with-dropdown/ModelWithDropDown";
import SingleCard from "../../components/single-card/SingleCard";
import Button from "../../../../components/button/Button";
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

      <div className="flex flex-col gap-2 max-w-sm mt-2">
        <Button
          className="h-8 text-sm"
          onClick={addBtnOnClick}
          text={"Add"}
          isLoading={state.isLoading}
        />
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
