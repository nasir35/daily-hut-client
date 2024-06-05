import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import Users from "../pages/Dashboard/Users";
import NotAuthorized from "../pages/ErrorPages/NotAuthorized";
import NotFound from "../pages/ErrorPages/NotFound";
import Profile from "../pages/Dashboard/Profile";
import AddProduct from "../pages/Dashboard/AddProduct";
import AddCategory from "../pages/Dashboard/AddCategory";
import AllCategory from "../pages/Dashboard/AllCategory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "all-categories",
        element: <AllCategory />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
]);
export default router;
