import { memo } from "react";

const CustomTable = ({
  isLoading,
  columnData = [{ field: "", head: "" }],
  rowData = [],
  selectFunc,
  selected = [],
}) => {
  console.log("=========================== table");
  return (
    <div className="flex flex-col bg-white   overflow-x-auto">
      <table className="text-sm">
        <thead className="text-left ">
          <tr className="h-11 bg-slate-100">
            <th className="px-6 py-4 ">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    selectFunc("select_all");
                  } else {
                    selectFunc("clear_selected");
                  }
                }}
              />
            </th>
            {columnData.map((col) => (
              <th className="px-6 py-4">{col.head}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!isLoading &&
            rowData.map((row, rowIndex) => (
              <tr>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(row.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        selectFunc("single_select", row.id);
                      } else {
                        selectFunc("single_deselect", row.id);
                      }
                    }}
                  />
                </td>

                {columnData.map((column) => {
                  const row = rowData[rowIndex][column.field];

                  return <td className="px-6 py-4">{row}</td>;
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(CustomTable);
