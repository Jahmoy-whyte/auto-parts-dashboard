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
import EmployeeRoute from "./routes/employee-route/EmployeeRoute";
import EmployeeEditRoute from "./routes/employee-edit-route/EmployeeEditRoute";

import ProductSpecificationRoute from "./routes/product-specification-route/ProductSpecificationRoute";
import MakeRoute from "./routes/product-specification-route/routes/make-route/MakeRoute";
import ModelRoute from "./routes/product-specification-route/routes/model-route/ModelRoute";
import YearRoute from "./routes/product-specification-route/routes/year-route/YearRoute";
import CategoriesRoute from "./routes/product-specification-route/routes/categories-route/CategoriesRoute";
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
          path: "/home/products/:id",
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
          path: "/home/users/edit/:userId",
          element: <UserEditRoute />,
        },
        {
          path: "/home/employees/",
          element: <EmployeeRoute />,
        },
        {
          path: "/home/employees/edit/:employeeId",
          element: <EmployeeEditRoute />,
        },

        {
          path: "/home/ProductSpecification/",
          element: <ProductSpecificationRoute />,
          children: [
            {
              path: "/home/ProductSpecification/",
              element: <MakeRoute />,
            },
            {
              path: "/home/ProductSpecification/model",
              element: <ModelRoute />,
            },

            {
              path: "/home/ProductSpecification/year",
              element: <YearRoute />,
            },
            {
              path: "/home/ProductSpecification/categories",
              element: <CategoriesRoute />,
            },
          ],
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
