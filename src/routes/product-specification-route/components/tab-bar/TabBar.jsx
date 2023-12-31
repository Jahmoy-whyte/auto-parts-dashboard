import TabButton from "../../../../components/tab-buttons/TabButton";
import InitialCapitalization from "../../../../helper/initial-capitalization/InitialCapitalization";
import { SPECIFICATIONS } from "../../constants/constants";
const TabBar = ({ state, dispatch, nav }) => {
  return (
    <div className="flex flex-col bg-gray-100 p-1 rounded-md max-w-sm sm:flex-row ">
      <TabButton
        text={InitialCapitalization(SPECIFICATIONS.make)}
        selected={state.selected}
        value={SPECIFICATIONS.make}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/");
        }}
      />
      <TabButton
        text={InitialCapitalization(SPECIFICATIONS.model)}
        selected={state.selected}
        value={SPECIFICATIONS.model}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/model");
        }}
      />
      <TabButton
        text={InitialCapitalization(SPECIFICATIONS.year)}
        selected={state.selected}
        value={SPECIFICATIONS.year}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/year");
        }}
      />
      <TabButton
        text={InitialCapitalization(SPECIFICATIONS.categories)}
        selected={state.selected}
        value={SPECIFICATIONS.categories}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/categories");
        }}
      />
    </div>
  );
};
export default TabBar;
