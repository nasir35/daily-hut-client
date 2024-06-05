import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-base-200 text-white p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="flex justify-center space-x-4">
          <button onClick={handleGoBack} className="btn px-8 btn-neutral">
            Go Back
          </button>
          <button onClick={handleHome} className=" btn px-8 btn-primary">
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
