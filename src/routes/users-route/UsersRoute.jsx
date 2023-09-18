import ToolBar from "../../components/tool-bar/ToolBar";

const UsersRoute = () => {
  return (
    <div className="outlet-outer-container">
      <div className="outlet-inner-container">
        <h1 className="text-2xl font-bold mb-5">users</h1>
        <div className="flex flex-col flex-1 bg-white p-5">
          <ToolBar />
        </div>
      </div>
    </div>
  );
};

export default UsersRoute;
