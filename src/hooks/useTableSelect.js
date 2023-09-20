import { useState } from "react";

const useTableSelect = () => {
  const [selected, setSelected] = useState({ tableArray: [], selected: [] });
  console.log(selected);
  const rowSelect = (actionType, id) => {
    if (actionType == "single_select") {
      setSelected((prev) => ({
        ...prev,
        selected: [...prev.selected, id],
      }));
    } else if (actionType == "single_delect") {
      setSelected((prev) => ({
        ...prev,
        selected: prev.selected.filter((id) => id != id),
      }));
    } else if (actionType == "select_all") {
      setSelected((prev) => ({
        ...prev,
        selected: prev.tableArray.map((row1) => row1.id),
      }));
    } else if (actionType == "delect_all") {
      setSelected((prev) => ({ ...prev, selected: [] }));
    }
  };

  const setTableArray = (tableArray) => {
    setSelected((prev) => ({ ...prev, tableArray: tableArray, selected: [] }));
  };

  const clearSelected = () => {
    setSelected((prev) => ({ ...prev, selected: [] }));
  };

  return {
    setTableArray,
    rowSelect,
    clearSelected,
    selected: selected.selected,
  };
};

export default useTableSelect;
