import { useEffect, useState } from "react";
import UserType from "./UserType";
import UserTable from "./UserTable";
import axios from "axios";

const ManageUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [members, setMembers] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.log("Error on fetching users : ", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (users) {
      setAdmins(users.filter((user) => user.role === "admin"));
      setSuppliers(users.filter((user) => user.role === "shopkeeper"));
      setMembers(users.filter((user) => user.role === "member"));
    }
  }, [users]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserType title="Admins">
        {admins?.length > 0 ? (
          <UserTable users={admins} />
        ) : (
          <p>No admins found.</p>
        )}
      </UserType>
      <UserType title="Suppliers">
        {suppliers?.length > 0 ? (
          <UserTable users={suppliers} />
        ) : (
          <p>No Suppliers found.</p>
        )}
      </UserType>
      <UserType title="Members">
        {members?.length > 0 ? (
          <UserTable users={members} />
        ) : (
          <p>No members found.</p>
        )}
      </UserType>
    </div>
  );
};

export default ManageUsers;
