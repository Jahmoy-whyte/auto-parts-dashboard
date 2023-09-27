import SingleCard from "../../components/single-card/SingleCard";
import useCategories from "./useCategories";
import SingleModel from "../../components/single-model/SingleModel";

const CategoriesRoute = () => {
  const [state, dispatch, addBtnOnClick, modelButtonOnClickHandler] =
    useCategories();
  return (
    <>
      <SingleModel
        modelData={state.modelData}
        dispatch={dispatch}
        buttonFunc={modelButtonOnClickHandler}
      />
      {state.isLoading ? ".......ISLOADING" : null}
      <div className="flex flex-col gap-2 max-w-sm mt-2">
        <button
          className="text-white bg-secondary rounded-md"
          onClick={addBtnOnClick}
        >
          Add
        </button>
        {state.tableData.map((data) => {
          return (
            <SingleCard
              id={data.id}
              text={data.category}
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

export default CategoriesRoute;
/**
 * 
 * 

        
 */
