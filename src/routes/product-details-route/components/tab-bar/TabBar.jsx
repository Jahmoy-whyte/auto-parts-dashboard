import TabButton from "../../../../components/tab-buttons/TabButton";
const TabBar = ({ state, dispatch }) => {
  return (
    <div className="flex bg-gray-100 p-1 rounded-md max-w-sm">
      <TabButton
        text={"Make"}
        selected={state.selected}
        value="make"
        onClick={(value) => dispatch({ type: "set_selected", payload: value })}
      />
      <TabButton
        text={"Model"}
        selected={state.selected}
        value="model"
        onClick={(value) => dispatch({ type: "set_selected", payload: value })}
      />
      <TabButton
        text={"Year"}
        selected={state.selected}
        value="year"
        onClick={(value) => dispatch({ type: "set_selected", payload: value })}
      />
      <TabButton
        text={"Categories"}
        selected={state.selected}
        value="categories"
        onClick={(value) => dispatch({ type: "set_selected", payload: value })}
      />
    </div>
  );
};
export default TabBar;
