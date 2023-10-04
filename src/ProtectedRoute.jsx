import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContextProvider";

const ProtectedRoute = ({ permissions = [], children }) => {
  const { isAuth, user } = useAuthContext();
  if (!isAuth) return <Navigate to={"/"} />;
  if (permissions.includes(user.role)) {
    return <>{children} </>;
  }
  return (
    <div className="bg-white flex flex-1 justify-center items-center">
      Open Menu {">"} And Select An Option
    </div>
  );
};

export default ProtectedRoute;
