import useEmployee from "./useEmployee";
import TableRows from "./components/table-rows/TableRows";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "./helper/reducerHelper";
import ToolBar from "../../components/tool-bar/ToolBar";
import Button from "../../components/button/Button";
import Model from "../../components/model/Model";
const EmployeeRoute = () => {
  const [
    state,
    dispatch,
    pages,
    prev,
    next,
    currentPage,
    getEmployees,
    deleteRow,
    signOutEmployee,
  ] = useEmployee();
  const nav = useNavigate();
  return (
    <>
      <Model
        title={"Sign Out"}
        close={() =>
          state.model.isLoading
            ? null
            : dispatch({ type: ACTIONS.set_model_visibility, payload: false })
        }
        show={state.model.visible}
      >
        <div className="text-sm">
          <p>
            Are you sure you want to sign out <b>{state.model.name}</b> on all
            divices?
          </p>
        </div>
        <Button
          className="h-8 text-sm self-end px-2 rounded-md"
          onClick={signOutEmployee}
          isLoading={state.model.isLoading}
          text={"SignOut"}
        />
      </Model>

      <div className="outlet-outer-container">
        <div className="outlet-inner-container">
          <h1 className="text-2xl font-bold mb-5">Employee Accounts</h1>
          <div className="flex flex-col flex-1 bg-white p-5">
            <ToolBar
              isLoading={state.isLoading}
              searchTextOnChange={(value) =>
                dispatch({ type: ACTIONS.set_search_text, payload: value })
              }
              filterOnChange={(value) =>
                dispatch({ type: ACTIONS.set_filter_value, payload: value })
              }
              searchText={state.searchText}
              dropDownOptions={state.dropDown}
              deleteBtnIsloading={state.deleteBtnIsloading}
              deleteFunc={deleteRow}
              selected={state.selected}
            >
              <Button
                className="h-9  min-w-[56px] px-2  text-sm border-2 border-white flex-1"
                onClick={() => nav("/home/employees/edit/add")}
                text={"Add"}
              />
            </ToolBar>

            <div className="flex flex-col bg-white   overflow-x-auto">
              <table className="text-sm">
                <thead className="text-left ">
                  <tr className="h-11 bg-slate-100">
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
                    <th className="px-6 py-4 ">Role</th>
                    <th className="px-6 py-4 ">Edit</th>
                    <th className="px-6 py-4 ">Sign out</th>
                  </tr>
                </thead>

                <tbody>
                  {state.employeeTableData.map((row) => (
                    <TableRows
                      data={row}
                      dispatch={dispatch}
                      key={row.id}
                      selected={state.selected}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            next={next}
            prev={prev}
            pages={pages}
            currentPage={currentPage}
            onClick={getEmployees}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeRoute;
