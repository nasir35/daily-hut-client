import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import NotAuthorized from "../pages/ErrorPages/NotAuthorized";
import NotFound from "../pages/ErrorPages/NotFound";
import Profile from "../pages/Dashboard/Profile/Profile";
import AddProduct from "../pages/Dashboard/AddProduct";
import AddCategory from "../pages/Dashboard/AddCategory";
import AllCategory from "../pages/Dashboard/AllCategory";
import Products from "@/pages/Products/Products";
import CategoryBasedProducts from "@/pages/Products/CategoryBasedProducts";
import ProductDetails from "@/pages/Products/ProductDetails";
import NumberParamRoute from "./NumberParamRoute";
import ProfileSettings from "../pages/Dashboard/Profile/ProfileSettings";
import Preferences from "../pages/Dashboard/Profile/Preferences";
import NotificationSettings from "../pages/Dashboard/Profile/NotificationSettings";
import ChangePassword from "../pages/Dashboard/Profile/ChangePassword";
import AccountSettings from "../pages/Dashboard/Profile/AccountSettings";
import ProfileSettingsLayout from "../layouts/ProfileSettingsLayout";
import AllProducts from "../pages/Dashboard/AllProducts";
import EditProductPage from "../pages/Dashboard/EditProductPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Categories";
import SummaryReport from "../pages/Dashboard/SummaryReport";
import ViewCart from "../pages/Dashboard/ViewCart";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddBrand from "../pages/Dashboard/AddBrand";

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
        path: "/products",
        children: [
          {
            index: true,
            element: <Products page={1} />,
          },
          {
            path: ":pageNo",
            element: (
              <NumberParamRoute>
                <Products />
              </NumberParamRoute>
            ),
          },
          {
            path: "category/:categoryId",
            element: <CategoryBasedProducts />,
          },
          {
            path: "product-details/:product_id",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "/categories",
        element: <Categories />,
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
        element: <Dashboard />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
        loader: async () => {
          return await fetch("http://localhost:5000/api/v1/products");
        },
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
        path: "add-brand",
        element: <AddBrand />,
      },
      {
        path: "all-categories",
        element: <AllCategory />,
      },
      {
        path: "summary-report",
        element: <SummaryReport />,
      },
      {
        path: "view-cart",
        element: <ViewCart />,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "product-edit/:id",
        element: <EditProductPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <ProfileSettingsLayout />,
        children: [
          {
            index: true,
            element: <ProfileSettings />,
          },
          {
            path: "account",
            element: <AccountSettings />,
          },
          {
            path: "password",
            element: <ChangePassword />,
          },
          {
            path: "notifications",
            element: <NotificationSettings />,
          },
          {
            path: "preferences",
            element: <Preferences />,
          },
        ],
      },
    ],
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
  // {
  //   path: "/test",
  //   element: < />,
  // },
]);

export default router;
