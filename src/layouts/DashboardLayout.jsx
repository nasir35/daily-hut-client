import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import cartIcon from "@images/cart-icon-white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faTags,
  faUsersCog,
  faChartLine,
  faFileLines,
  faCubesStacked,
  faSquarePlus,
  faBars,
  faTimes,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActiveTab = (path) => {
    if (path === "/dashboard/product-edit/") {
      return location.pathname.includes(path);
    } else return location.pathname === path;
  };

  const closeDropdown = () => {
    const dropdownContainer = document.getElementById("user-dropdown");
    if (dropdownContainer?.classList?.contains("dropdown-open")) {
      dropdownContainer?.classList?.remove("dropdown-open");
    }
  };

  const handleBarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-y-hidden">
      <aside className="bg-gray-800 text-white hidden md:flex flex-col p-4 md:w-20 lg:w-64">
        <button
          onClick={handleBarClick}
          className="hidden md:flex lg:hidden pb-5 mb-2 justify-center border-b border-gray-500"
        >
          <FontAwesomeIcon icon={faBars} className="lg:hidden text-xl" />
        </button>
        <Link
          to={"/"}
          className="hidden lg:flex gap-2 items-center text-2xl font-bold mb-4 "
        >
          <img src={cartIcon} className="w-[35px]" alt="logo-icon" />
          <span className="hidden lg:block">Daily Hut</span>
        </Link>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link
                to=""
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard") ? "text-yellow-300" : ""
                }`}
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="all-products"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard/all-products")
                    ? "text-yellow-300"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faCubesStacked}
                  className="mr-0 lg:mr-2"
                />
                <span className="hidden lg:block">All Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="all-categories"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard/all-categories")
                    ? "text-yellow-300"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faBox} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">All Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="add-product"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard/add-product") ? "text-yellow-300" : ""
                }`}
              >
                <FontAwesomeIcon icon={faSquarePlus} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">Add Product</span>
              </Link>
            </li>
            <li>
              <Link
                to="add-category"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard/add-category")
                    ? "text-yellow-300"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faTags} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">Add Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="add-brand"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard/add-brand") ? "text-yellow-300" : ""
                }`}
              >
                <FontAwesomeIcon icon={faIndustry} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">Add A Brand</span>
              </Link>
            </li>
            <li>
              <Link
                to="manage-users"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/manage-users") ? "bg-gray-700" : ""
                }`}
              >
                <FontAwesomeIcon icon={faUsersCog} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="summary-report"
                className={`flex items-center justify-center lg:justify-start ${
                  isActiveTab("/dashboard/summary-report")
                    ? "text-yellow-300"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={faFileLines} className="mr-0 lg:mr-2" />
                <span className="hidden lg:block">Summary Report</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link
            to="/"
            className="flex gap-2 items-center text-orange-500 justify-center lg:justify-start"
          >
            <FontAwesomeIcon icon={faHome} />
            <span className="hidden lg:block">Back to Home</span>
          </Link>
        </div>
      </aside>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      >
        <div
          className={`w-4/5 flex flex-col h-full bg-gray-800 text-white p-4 transform transition-transform ${
            isModalOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 p-2 flex justify-center items-center rounded-full border-[1.5px] border-white"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
          <Link
            to={"/"}
            className="flex gap-2 items-center text-2xl font-bold mb-4"
          >
            <img src={cartIcon} className="w-[35px]" alt="logo-icon" />
            Daily Hut
          </Link>
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link
                  to=""
                  className={`flex items-center ${
                    isActiveTab("/dashboard") ? "text-yellow-300" : ""
                  }  ${
                    isActiveTab("/dashboard/product-edit/")
                      ? "text-yellow-300"
                      : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="all-products"
                  className={`flex items-center ${
                    isActiveTab("/dashboard/all-products")
                      ? "text-yellow-300"
                      : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faCubesStacked} className="mr-2" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="all-categories"
                  className={`flex items-center ${
                    isActiveTab("/dashboard/all-categories")
                      ? "text-yellow-300"
                      : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faBox} className="mr-2" />
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  to="add-product"
                  className={`flex items-center ${
                    isActiveTab("/dashboard/add-product")
                      ? "text-yellow-300"
                      : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="add-category"
                  className={`flex items-center ${
                    isActiveTab("/dashboard/add-category")
                      ? "text-yellow-300"
                      : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faTags} className="mr-2" />
                  Add Categories
                </Link>
              </li>
              <li>
                <Link
                  to="add-brand"
                  className={`flex items-center ${
                    isActiveTab("/add-brand") ? "bg-gray-700" : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faIndustry} className="mr-2" />
                  Add A Brand
                </Link>
              </li>
              <li>
                <Link
                  to="manage-users"
                  className={`flex items-center ${
                    isActiveTab("/manage-users") ? "bg-gray-700" : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faUsersCog} className="mr-2" />
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="summary-report"
                  className={`flex items-center ${
                    isActiveTab("/dashboard/summary-report")
                      ? "text-yellow-300"
                      : ""
                  }`}
                  onClick={closeModal}
                >
                  <FontAwesomeIcon icon={faFileLines} className="mr-2" />
                  Summary Report
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Link to="/" className="flex gap-2 items-center text-orange-500">
              <FontAwesomeIcon icon={faHome} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-hidden">
        <header className="flex items-center justify-between px-3 lg:px-4 py-1 bg-gray-100 border-b border-gray-300 shadow-lg">
          <div className="text-xl font-semibold text-orange-500 flex gap-2 items-center">
            <button onClick={handleBarClick}>
              <FontAwesomeIcon
                icon={faBars}
                className="md:hidden text-gray-500"
              />
            </button>
            Dashboard Panel
          </div>
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={closeDropdown}>
                  <Link to="/dashboard/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li onClick={closeDropdown}>
                  <Link to="/dashboard/settings">Settings</Link>
                </li>
                <li onClick={closeDropdown}>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </header>
        <main className="flex-1 p-3  lg:p-4 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
