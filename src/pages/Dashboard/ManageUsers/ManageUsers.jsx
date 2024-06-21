import { useEffect, useState } from "react";
import UserType from "./UserType";
import UserTable from "./UserTable";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

const ManageUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [members, setMembers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "supplier", label: "Supplier" },
    { value: "member", label: "Member" },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://daily-hut-backend.vercel.app/api/v1/users",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log("Error on fetching users : ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (users) {
      setAdmins(users.filter((user) => user.role === "admin"));
      setSuppliers(users.filter((user) => user.role === "supplier"));
      setMembers(users.filter((user) => user.role === "member"));
    }
  }, [users]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUserEdit = (user) => {
    setSelectedUser(user);
    handleOpenModal();
  };

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption.value);
  };
  const updateUserRole = async () => {
    try {
      const res = await axios.patch(
        `https://daily-hut-backend.vercel.app/api/v1/users/get-with-email/${selectedUser.email}`,
        { role: selectedRole },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        fetchData();
        setSelectedUser(null);
        toast.success("User role updated successfully!", { autoClose: 1500 });
        handleCloseModal();
      }
    } catch (error) {
      toast.error("Something went wrong. Couldn't update the role!", {
        autoClose: 1500,
      });
      setSelectedUser(null);
      handleCloseModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserType title="Admins">
        {admins?.length > 0 ? (
          <UserTable users={admins} editFunc={handleUserEdit} />
        ) : (
          <p>No admins found.</p>
        )}
      </UserType>
      <UserType title="Suppliers">
        {suppliers?.length > 0 ? (
          <UserTable users={suppliers} editFunc={handleUserEdit} />
        ) : (
          <p>No Suppliers found.</p>
        )}
      </UserType>
      <UserType title="Members">
        {members?.length > 0 ? (
          <UserTable users={members} editFunc={handleUserEdit} />
        ) : (
          <p>No members found.</p>
        )}
      </UserType>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">
                Edit role for {selectedUser.email}
              </h2>
              <p className="text-orange-500 mb-4 border border-orange-600 max-w-fit rounded px-3">
                current role : {selectedUser.role}
              </p>
              {roles.length > 0 && (
                <div className="flex gap-3 items-center">
                  <label className="w-24 block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <Select
                    value={roles.find((option) => option.label === "role")}
                    onChange={handleRoleChange}
                    options={roles}
                    className="mt-1 block w-full"
                    classNamePrefix="react-select"
                    isClearable
                    placeholder="Select or type to search..."
                  />
                </div>
              )}
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => updateUserRole()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Change Role
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
