import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContextProvider";
import { Suspense } from "react";
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";

const ProtectedRoute = ({ permissions = [], children }) => {
  const { isAuth, user } = useAuthContext();
  if (!isAuth) return <Navigate to={"/"} replace={true} />;
  if (permissions.includes(user.role)) {
    return <Suspense fallback={<LoadingIndicator />}>{children} </Suspense>;
  }
  return (
    <div className="bg-white flex flex-1 justify-center items-center">
      Open Menu {">"} And Select An Option
    </div>
  );
};

export default ProtectedRoute;
