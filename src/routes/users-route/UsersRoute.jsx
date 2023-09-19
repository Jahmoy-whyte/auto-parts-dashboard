import CustomTable from "../../components/custom-table/CustomTable";
import Pagination from "../../components/pagination/Pagination";
import ToolBar from "../../components/tool-bar/ToolBar";
import useUsers from "./useUsers";

const UsersRoute = () => {
  const [state, dispatch, tableHeading] = useUsers();
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">users</h1>
        <div className="flex flex-col flex-1 bg-white p-5">
          <ToolBar isLoading={state.isLoading} />

          <Pagination totalPages={10} />
        </div>
      </div>
    </div>
  );
};

export default UsersRoute;
/**
 * 
 * 
 
          <CustomTable
            columnData={tableHeading}
            rowData={state.usersTableData}
          />
 */
