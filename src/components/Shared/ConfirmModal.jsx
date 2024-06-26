import useModal from "@/hooks/useModal";
// import { useState } from "react";

const ConfirmModal = ({
  action,
  actionOn,
  onConfirm,
  onCancel,
  isModalOpen,
  loading,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">
          Confirm {action} {actionOn}
        </h2>
        <p className="mb-6">
          Are you sure you want to {action} this {actionOn}?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            {loading ? "Processing..." : `Yes, ${action}`}
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
