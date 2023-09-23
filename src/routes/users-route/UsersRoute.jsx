import { useMemo } from "react";
import CustomTable from "../../components/custom-table/CustomTable";
import Pagination from "../../components/pagination/Pagination";
import ToolBar from "../../components/tool-bar/ToolBar";
import useUsers from "./useUsers";
import TableRows from "./components/table-rows/TableRows";
import { ACTIONS } from "./helper/reducerHelper";
import { useNavigate } from "react-router-dom";
const UsersRoute = () => {
  const [
    state,
    dispatch,
    pages,
    prev,
    next,
    currentPage,
    getUsers,
    deleteRow,
    setState,
  ] = useUsers();
  const nav = useNavigate();
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">User Accounts</h1>
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

          <div className="flex flex-col bg-white mb-2  overflow-x-auto">
            <table className="text-sm ">
              <thead className="text-left ">
                <tr className="h-11 bg-gray-100 ">
                  <th className="px-6 py-4 ">
                    <input
                      type="checkbox"
                      checked={state.checkAll}
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch({ type: ACTIONS.select_all });
                        } else {
                          dispatch({ type: ACTIONS.clear_selected });
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-4 ">id</th>
                  <th className="px-6 py-4 ">Firstname</th>
                  <th className="px-6 py-4 ">Lastname</th>
                  <th className="px-6 py-4 ">Email</th>
                  <th className="px-6 py-4 ">User status</th>
                  <th className="px-6 py-4 ">Phone</th>
                  <th className="px-6 py-4 ">Address</th>
                  <th className="px-6 py-4 ">Edit</th>
                </tr>
              </thead>

              <tbody>
                {state.usersTableData.map((row) => (
                  <TableRows
                    data={row}
                    dispatch={dispatch}
                    key={row.id}
                    nav={nav}
                    selected={state.selected}
                  />
                ))}
              </tbody>
            </table>
          </div>

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
