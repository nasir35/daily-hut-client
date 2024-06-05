import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "@/hooks/useAuth";
import ConfirmModal from "@/components/Shared/ConfirmModal";

const AddCategory = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState({
    userMail: user?.email,
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    openModal();
  };

  const handleAddCategory = async () => {
    try {
      await fetch("https://daily-hut-backend.vercel.app/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      })
        .then((res) => res.json())
        .then((data) => {});
      toast.success("Category Added Successfully!");
      setNewCategory({
        userMail: user?.email,
        name: "",
        itemsCount: 0,
        description: "",
        image_url: "",
      });
    } catch (e) {
      console.log("Failed to add");
      toast.error("Failed to Add new Category!");
    } finally {
      closeModal();
    }
    setTimeout(() => {
      navigate("/dashboard/all-categories");
    }, 1000);
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              placeholder="Sherwani"
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              placeholder="Write a small description.."
              name="description"
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image_url"
              placeholder="https://m.media-amazon.com/images/I/515c+nXHjQL._AC_SY741_.jpg"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/all-categories")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
      <ConfirmModal
        action={"Add"}
        actionOn={"Category"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleAddCategory}
      />
    </div>
  );
};

export default AddCategory;
