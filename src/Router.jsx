import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginRoute from "./routes/login-route/LoginRoute";
import SignUpRoute from "./routes/sign-route/SignUpRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <LoginRoute /> },
    { path: "/signup", element: <SignUpRoute /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
};

export default Router;
