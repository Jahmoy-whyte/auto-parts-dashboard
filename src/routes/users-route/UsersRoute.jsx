import { useMemo } from "react";
import CustomTable from "../../components/custom-table/CustomTable";
import Pagination from "../../components/pagination/Pagination";
import ToolBar from "../../components/tool-bar/ToolBar";
import useUsers from "./useUsers";

const UsersRoute = () => {
  const [
    state,
    dispatch,
    tableHeading,
    pages,
    prev,
    next,
    currentPage,
    getUsers,
    rowSelect,
    deleteRow,
    setState,
    navigate,
  ] = useUsers();

  const headings = useMemo(() => {
    return [
      { field: "id", head: "id" },
      { field: "firstName", head: "Firstname" },
      { field: "lastName", head: "Lastname" },
      { field: "email", head: "Email" },
      { field: "userStatus", head: "User status" },
      { field: "phone", head: "Phone" },
      { field: "address", head: "Address" },
    ];
  }, []);
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">users</h1>
        <div className="flex flex-col flex-1 bg-white p-5">
          <ToolBar
            isLoading={state.isLoading}
            setState={setState}
            deleteBtnIsloading={state.deleteBtnIsloading}
            searchText={state.searchText}
            deleteFunc={deleteRow}
            dropDownOptions={state.dropDown}
            selected={state.selected}
          />

          <CustomTable
            columnData={headings}
            rowData={state.usersTableData}
            selectFunc={rowSelect}
            selected={state.selected}
            navigate={navigate}
          />

          <Pagination
            next={next}
            prev={prev}
            pages={pages}
            currentPage={currentPage}
            onClick={getUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersRoute;
/**
 * 
 * 
 
        
 */
