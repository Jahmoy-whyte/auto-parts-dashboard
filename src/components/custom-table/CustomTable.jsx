const CustomTable = ({
  isLoading,
  columnData = [{ field: "", head: "" }],
  rowData = [],
  selectAllFunc,
  selectFunc,
}) => {
  return (
    <div className="flex flex-col bg-white   overflow-x-auto">
      <table className="text-sm">
        <thead className="text-left ">
          <tr className="h-11 bg-slate-100">
            <th className="px-6 py-4 ">
              <input type="checkbox" onChange={(e) => selectAllFunc} />
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
                  <input type="checkbox" onChange={(e) => selectFunc(row.id)} />
                </td>

                {columnData.map((column) => {
                  return (
                    <td className="px-6 py-4">
                      {rowData[rowIndex][column.field]}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
