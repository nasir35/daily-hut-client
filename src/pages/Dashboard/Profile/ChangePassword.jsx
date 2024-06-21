import { Link } from "react-router-dom";
import useModal from "@/hooks/useModal";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ConfirmModal from "@/components/Shared/ConfirmModal";

const ChangePassword = () => {
  const { user, changePassword } = useAuth();
  const [userPassword, setUserPassword] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/get-with-email/${user?.email}`
        );
        if (response.status === 200) {
          setUserPassword(response.data?.data?.password);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., show error message)
      }
    };
    fetchData();
  }, [user]);

  const updatePassword = async () => {
    try {
      const form = document.getElementById("change-password-form");
      const data = {
        currentPassword: form.currentPassword?.value,
        newPassword: form.newPassword?.value,
        confirmPassword: form.confirmPassword?.value,
      };

      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      if (data.newPassword.length < 6) {
        toast.error("Password should be at least 6 characters long.");
        return;
      }

      const res = await changePassword(data.newPassword);
      const DBres = await axios.patch(
        `http://localhost:5000/api/v1/users/get-with-email/${user?.email}`,
        { password: data.newPassword },
        { headers: { authorization: `Bearer ${token}` } }
      );
      closeModal();
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">
        {userPassword === undefined ? "Set New Password" : "Change Password"}
      </h2>
      <form onSubmit={handleSubmit} id="change-password-form">
        {userPassword !== undefined && (
          <div className="mb-4">
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className="border p-2 rounded w-full"
              required
              autoComplete="true"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="border p-2 rounded w-full"
            required
            autoComplete="true"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="border p-2 rounded w-full"
            required
            autoComplete="true"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {userPassword === undefined ? "Set Password" : "Change Password"}
          </button>
          <Link
            to="/dashboard/settings"
            className="btn btn-neutral min-w-[150px]"
          >
            Cancel
          </Link>
        </div>
      </form>
      <ConfirmModal
        action={`${userPassword === undefined ? "Set" : "Change"}`}
        actionOn="Password"
        onConfirm={updatePassword}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
      />
    </div>
  );
};

export default ChangePassword;
