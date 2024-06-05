import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  if (user) return <div>{children}</div>;
  else return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
