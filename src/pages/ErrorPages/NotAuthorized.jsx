import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NotAuthorized = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";
  // navigate(from, { replace: true });
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleLoginAsAdmin = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Not Authorized</h1>
      <p className="text-lg text-gray-600 mb-8">
        You are not authorized to access this page.
      </p>
      <div className="flex space-x-4">
        <button className="btn btn-primary" onClick={handleGoBack}>
          Go Back
        </button>
        <button className="btn btn-outline" onClick={handleLoginAsAdmin}>
          Login As Admin
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
