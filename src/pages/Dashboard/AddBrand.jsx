import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import useAuth from "@/hooks/useAuth";
import useModal from "../../hooks/useModal";

const AddBrand = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const initialBrandState = {
    addedBy: user?.email,
    name: "",
    description: "",
    image_urls: "",
  };

  const [brand, setBrand] = useState(initialBrandState);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleAddBrand = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/brands`,
        brand,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Brand added successfully!", { autoClose: 3000 });
        setBrand(initialBrandState);
      }
    } catch (error) {
      toast.error("Failed to add brand.", { autoClose: 2000 });
      console.error(error);
    }
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };

  return (
    <div className="min-h-fit bg-gray-100 flex">
      <ToastContainer />
      <div className="lg:w-2/3 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Brand</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-[500px] mx-auto"
        >
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Brand name"
              value={brand.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write brand details..."
              value={brand.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image_urls"
              placeholder="https://www.example.com/media/example.jpg"
              value={brand.image_urls}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Brand
          </button>
        </form>
      </div>

      <ConfirmModal
        action={"Add"}
        actionOn={"Brand"}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={handleAddBrand}
      />
    </div>
  );
};

export default AddBrand;
