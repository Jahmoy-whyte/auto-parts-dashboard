import { useNavigate } from "react-router-dom";
import TabButton from "../../../../components/tab-buttons/TabButton";
import { SPECIFICATIONS } from "../../constants/constants";
const TabBar = ({ state, dispatch }) => {
  const nav = useNavigate();
  return (
    <div className="flex bg-gray-100 p-1 rounded-md max-w-sm">
      <TabButton
        text={SPECIFICATIONS.make}
        selected={state.selected}
        value={SPECIFICATIONS.make}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/");
        }}
      />
      <TabButton
        text={SPECIFICATIONS.model}
        selected={state.selected}
        value={SPECIFICATIONS.model}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/model");
        }}
      />
      <TabButton
        text={SPECIFICATIONS.year}
        selected={state.selected}
        value={SPECIFICATIONS.year}
        onClick={(value) => {
          dispatch({ type: "set_selected", payload: value });
          nav("/home/ProductSpecification/year");
        }}
      />
      <TabButton
        text={SPECIFICATIONS.categories}
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
