import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginRoute from "./routes/login-route/LoginRoute";
import SignUpRoute from "./routes/sign-route/SignUpRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeRoute from "./routes/home-route/HomeRoute";
import AuthContextProvider from "./context/AuthContextProvider";
import DashBoard from "./routes/dashboard/DashBoard";
const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <LoginRoute /> },
    { path: "/signup", element: <SignUpRoute /> },
    {
      path: "/home",
      element: <HomeRoute />,
      children: [
        {
          path: "/home/",
          element: <DashBoard />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />;
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
};

export default Router;
