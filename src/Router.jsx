import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContextProvider";

import Routing from "./Routing";
import { Suspense } from "react";
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";
const Router = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex">
            <LoadingIndicator />
          </div>
        }
      >
        <AuthContextProvider>
          <Routing />
        </AuthContextProvider>
        <ToastContainer hideProgressBar />
      </Suspense>
    </>
  );
};

export default Router;
