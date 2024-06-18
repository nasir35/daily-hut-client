import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchedUser, setFetchedUser] = useState(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/get-with-email/${user?.email}`
        );
        if (response?.status === 200) {
          setFetchedUser(response?.data.data);
          setIsAdmin(response?.data?.data.role === "admin" ? true : false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    setIsAdmin(fetchedUser?.role === "admin" ? true : false);
  }, [fetchedUser]);

  if (user) {
    if (fetchedUser) {
      return isAdmin ? (
        <div>{children}</div>
      ) : (
        <Navigate to="/not-authorized" />
      );
    } else {
      return <div>Loading...</div>;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
