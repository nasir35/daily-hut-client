import { Link, useLocation } from "react-router-dom";

const GetLinksItem = ({ hasUser, showModal, setShowModal }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    if (path === "/" && path === location.pathname) {
      return "font-mono text-gray-800 font-medium uppercase border-b-2 border-indigo-500";
    } else if (path === "/" && path !== location.pathname) {
      return "font-mono text-gray-800 font-medium uppercase";
    } else {
      return location.pathname.includes(path)
        ? "font-mono text-gray-800 font-medium uppercase border-b-2 border-indigo-500 max-w-fit"
        : "font-mono text-gray-800 font-medium uppercase max-w-fit";
    }
  };
  const handleLinkClick = () => {
    if (showModal) {
      setShowModal(false);
    }
  };

  return [
    <li key="/" className={getLinkClass("/")} onClick={handleLinkClick}>
      <Link to="/">Home</Link>
    </li>,
    <li
      key="/products"
      className={getLinkClass("/products")}
      onClick={handleLinkClick}
    >
      <Link to="/products">Products</Link>
    </li>,
    // <li
    //   key="/products-accessories"
    //   className={getLinkClass("/products-accessories")}
    // >
    //   <Link to="/products">Accessories</Link>
    // </li>,
    <li
      key="/categories"
      className={getLinkClass("/categories")}
      onClick={handleLinkClick}
    >
      <Link to="/categories">Categories</Link>
    </li>,
    hasUser && (
      <li
        key="/dashboard"
        className={getLinkClass("/dashboard")}
        onClick={handleLinkClick}
      >
        <Link to="/dashboard">Dashboard</Link>
      </li>
    ),
    <li
      key="/contact-us"
      className={getLinkClass("/contact-us")}
      onClick={handleLinkClick}
    >
      <Link to="/contact-us">Contact Us</Link>
    </li>,
    !hasUser && (
      <li
        key="/login"
        className={getLinkClass("/login")}
        onClick={handleLinkClick}
      >
        <Link to="/login">Login</Link>
      </li>
    ),
    !hasUser && (
      <li
        key="/register"
        className={getLinkClass("/register")}
        onClick={handleLinkClick}
      >
        <Link to="/register">Register</Link>
      </li>
    ),
  ].filter(Boolean);
};

export default GetLinksItem;
