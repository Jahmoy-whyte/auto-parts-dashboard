import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { lazy, Suspense } from "react";
import LoginRoute from "./routes/login-route/LoginRoute";
import HomeRoute from "./routes/home-route/HomeRoute";

//import DashBoard from "./routes/dashboard/DashBoard";
const DashBoard = lazy(() => import("./routes/dashboard/DashBoard"));

//import ProductsRoute from "./routes/products-route/ProductsRoute";
const ProductsRoute = lazy(() =>
  import("./routes/products-route/ProductsRoute")
);

//import ProductSpecificationRoute from "./routes/product-specification-route/ProductSpecificationRoute";
const ProductSpecificationRoute = lazy(() =>
  import("./routes/product-specification-route/ProductSpecificationRoute")
);

//import OrdersRoute from "./routes/orders-route/OrdersRoute";
const OrdersRoute = lazy(() => import("./routes/orders-route/OrdersRoute"));

//import UsersRoute from "./routes/users-route/UsersRoute";
const UsersRoute = lazy(() => import("./routes/users-route/UsersRoute"));
//import EmployeeRoute from "./routes/employee-route/EmployeeRoute";
const EmployeeRoute = lazy(() =>
  import("./routes/employee-route/EmployeeRoute")
);

import AddProductsRoute from "./routes/add-products-route/AddProductsRoute";
import OrdersEditRoute from "./routes/orders-edit-route/OrdersEditRoute";
import UserEditRoute from "./routes/user-edit-route/UserEditRoute";
import EmployeeEditRoute from "./routes/employee-edit-route/EmployeeEditRoute";
import MakeRoute from "./routes/product-specification-route/routes/make-route/MakeRoute";
import ModelRoute from "./routes/product-specification-route/routes/model-route/ModelRoute";
import YearRoute from "./routes/product-specification-route/routes/year-route/YearRoute";
import CategoriesRoute from "./routes/product-specification-route/routes/categories-route/CategoriesRoute";
import ProtectedRoute from "./ProtectedRoute";
import {
  ADMIN_AND_EMPLOYEE,
  ADMIN_ONLY,
} from "./helper/permissions/permissions";
import { useAuthContext } from "./context/AuthContextProvider";

import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";

const NotificationsRoute = lazy(() =>
  import("./routes/notifications-route/NotificationsRoute")
);

const Routing = () => {
  const { isAuth } = useAuthContext();

  const routes = [
    {
      path: "/",
      element: isAuth ? <Navigate to="/home" /> : <LoginRoute />,
    },

    {
      path: "/home",
      element: (
        <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
          <HomeRoute />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home/",
          element: (
            <ProtectedRoute permissions={ADMIN_ONLY}>
              <DashBoard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/products/",
          element: (
            <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
              <ProductsRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/products/:id",
          element: (
            <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
              <AddProductsRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/orders/",
          element: (
            <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
              <OrdersRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/orders/edit/:status/:id",
          element: (
            <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
              <OrdersEditRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/users/",
          element: (
            <ProtectedRoute permissions={ADMIN_ONLY}>
              <UsersRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/users/edit/:userId",
          element: (
            <ProtectedRoute permissions={ADMIN_ONLY}>
              <UserEditRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/employees/",
          element: (
            <ProtectedRoute permissions={ADMIN_ONLY}>
              <EmployeeRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/employees/edit/:employeeId",
          element: (
            <ProtectedRoute permissions={ADMIN_ONLY}>
              <EmployeeEditRoute />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home/notifications/",
          element: (
            <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
              <NotificationsRoute />
            </ProtectedRoute>
          ),
        },

        {
          path: "/home/ProductSpecification/",
          element: (
            <ProtectedRoute permissions={ADMIN_AND_EMPLOYEE}>
              <ProductSpecificationRoute />
            </ProtectedRoute>
          ),
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
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routing;
/*

const timeout = (module) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(module);
    }, 6000);
  });
};
*/
