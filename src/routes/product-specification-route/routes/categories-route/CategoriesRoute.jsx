import SingleCard from "../../components/single-card/SingleCard";
import useCategories from "./useCategories";
import SingleModel from "../../components/single-model/SingleModel";
import Button from "../../../../components/button/Button";
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

      <div className="flex flex-col gap-2 max-w-sm mt-2">
        <Button
          className="h-8 text-sm"
          onClick={addBtnOnClick}
          text={"Add"}
          isLoading={state.isLoading}
        />
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
