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
import ProductsRoute from "./routes/products-route/ProductsRoute";
import AddProductsRoute from "./routes/add-products-route/AddProductsRoute";
import OrdersRoute from "./routes/orders-route/OrdersRoute";
import OrdersEditRoute from "./routes/orders-edit-route/OrdersEditRoute";

import UsersRoute from "./routes/users-route/UsersRoute";
import UserEditRoute from "./routes/user-edit-route/UserEditRoute";
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
        {
          path: "/home/products/",
          element: <ProductsRoute />,
        },
        {
          path: "/home/products/add",
          element: <AddProductsRoute />,
        },
        {
          path: "/home/orders/",
          element: <OrdersRoute />,
        },
        {
          path: "/home/orders/edit",
          element: <OrdersEditRoute />,
        },
        {
          path: "/home/users/",
          element: <UsersRoute />,
        },
        {
          path: "/home/users/edit",
          element: <UserEditRoute />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
};

export default Router;
