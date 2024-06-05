import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  if (user) {
    if (user?.rule === "admin") return <div>{children}</div>;
    else return <Navigate to="/not-authorized" state={{ from: location }} />;
  } else return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;
