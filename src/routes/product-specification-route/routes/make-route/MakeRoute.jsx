import SingleCard from "../../components/single-card/SingleCard";
import useMake from "./useMake";
import SingleModel from "../../components/single-model/SingleModel";

const MakeRoute = () => {
  const [state, dispatch, addBtnOnClick, ModelBtnOnClickHander] = useMake();
  return (
    <>
      <SingleModel
        modelData={state.modelData}
        dispatch={dispatch}
        buttonFunc={ModelBtnOnClickHander}
        dispatchType={"set_model_data"}
      />
      {state.isLoading ? ".......ISLOADING" : null}
      <div className="flex flex-col gap-2 max-w-sm mt-2">
        <button className="text-white bg-secondary" onClick={addBtnOnClick}>
          Add
        </button>
        {state.tableData.map((data) => {
          return (
            <SingleCard
              data={data}
              key={data.id}
              dispatch={dispatch}
              state={state}
              dispatchType={"set_model_data"}
            />
          );
        })}
      </div>
    </>
  );
};

export default MakeRoute;
/**
 * 
 * 

        
 */
