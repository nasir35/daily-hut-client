import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import useCart from "@/hooks/useCart";
import cartIcon from "@images/cart-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, fas } from "@fortawesome/free-solid-svg-icons";
import GetLinksItem from "./GetLinksItem";

const LinksModal = ({ showModal, setShowModal, user }) => {
  return (
    <div className={`fixed inset-0`}>
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div
        className={`bg-white absolute top-0 h-full z-50 w-[75%] p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
          showModal ? "left-0 opacity-100" : "-left-[100%] opacity-0"
        }`}
      >
        <ul className="flex w-fit flex-col gap-3">
          <GetLinksItem
            hasUser={user == null ? false : true}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </ul>
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showLinks, setShowLinks] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { cartCount, totalPrice } = useCart();

  useEffect(() => {
    if (showLinksModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLinksModal]);

  const closeDropdown = () => {
    const dropdownContainer = document.getElementById("user-dropdown");
    if (dropdownContainer.classList.contains("dropdown-open")) {
      dropdownContainer.classList.remove("dropdown-open");
    }
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };
  return (
    <div className="navbar xl:px-5 lg:px-4 md:px-3 px-2 lg:flex-row md:flex-col flex-row  sticky top-0 z-10 opacity-100 bg-base-200">
      <div className="w-full flex justify-between flex-wrap max-w-[1440px] mx-auto">
        {/* logo  */}
        <div className="flex gap-2">
          {showLinks ? (
            <button
              className="text-gray-800 focus:outline-none"
              onClick={() => setShowLinks(false)}
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
          ) : (
            <button
              className="lg:hidden md:block hidden"
              onClick={() => setShowLinks(!showLinks)}
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          )}
          <button
            className="md:hidden"
            onClick={() => setShowLinksModal(!showLinksModal)}
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
          <Link to="/" className="btn px-0 gap-0 btn-ghost text-xl">
            <img src={cartIcon} className="w-[35px]" alt="logo-icon" />
            Daily Hut
          </Link>
        </div>
        {/* links */}
        <div className="lg:flex hidden">
          <ul className="flex gap-5 items-center flex-wrap">
            <GetLinksItem hasUser={user == null ? false : true} />
          </ul>
        </div>
        {/* nav end  */}
        <div className="flex gap-2">
          <div className="py-2 md:block hidden">
            <SearchBar />
          </div>
          <button className="md:hidden">
            <FontAwesomeIcon
              icon={fas.faMagnifyingGlass}
              className="w-5 h-5 cursor-pointer"
              onClick={handleSearchIconClick}
            />
          </button>
          <div className="dropdown dropdown-end z-0">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge border-orange-600 badge-sm indicator-item">
                  {cartCount}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cartCount} Items</span>
                <span className="text-info">Subtotal: ${totalPrice}</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {user && (
            <div className="dropdown dropdown-end" id="user-dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      user?.photoURL ||
                      "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
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
                {/* <li onClick={closeDropdown}>
                <a>Settings</a>
              </li> */}
                <li onClick={closeDropdown}>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
          {showLinksModal && (
            <LinksModal
              showModal={showLinksModal}
              setShowModal={setShowLinksModal}
              user={user}
            />
          )}
        </div>
        <div
          className={`md:hidden w-full ${showSearchBar ? "flex" : "hidden"}`}
        >
          <SearchBar />
        </div>
      </div>
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out md:${
          showLinks ? "flex opacity-100" : "opacity-0"
        } hidden pt-3 w-full justify-start`}
      >
        <ul className="flex gap-5 items-center flex-wrap">
          <GetLinksItem hasUser={user == null ? false : true} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
