import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContextProvider";

import Routing from "./Routing";
const Router = () => {
  return (
    <>
      <AuthContextProvider>
        <Routing />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
};

export default Router;
