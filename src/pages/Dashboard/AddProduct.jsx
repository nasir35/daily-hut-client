import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import useAuth from "@/hooks/useAuth";

const AddProduct = () => {
  const { user } = useAuth();
  const initialProductState = {
    userMail: user?.email,
    title: "",
    brand: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    image_urls: [""],
  };

  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await axios.get("http://localhost:3000/categories");
      if (data.status === 200) {
        setCategories(
          data.data.map((category) => ({
            value: category.id,
            label: category.title,
          }))
        );
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image_urls") {
      setProduct({ ...product, image_urls: [value] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setProduct({
      ...product,
      category: selectedOption ? selectedOption.label : "",
    });
  };

  const handleAddProduct = async () => {
    try {
      const res = await axios.post("http://localhost:3000/products", product);
      if (res.status === 201) {
        toast.success("Product added successfully!");
        setProduct(initialProductState);
      }
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div className="min-h-fit bg-gray-100 flex">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="lg:w-2/3 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              name="id"
              value={product.id}
              onChange={handleChange}
              placeholder="121"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Kashmiri Punjabi"
              value={product.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              placeholder="Kashmiri"
              value={product.brand}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="123"
              value={product.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 custom-number-input"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="10"
              value={product.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 custom-number-input"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select
              value={categories.find(
                (option) => option.label === product.category
              )}
              onChange={handleCategoryChange}
              options={categories}
              className="mt-1 block w-full"
              classNamePrefix="react-select"
              isClearable
              placeholder="Select or type to search..."
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write about product details..."
              value={product.description}
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
              value={product.image_urls[0]}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>

      <ConfirmModal
        action={"Add"}
        actionOn={"Product"}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleAddProduct}
      />
    </div>
  );
};

export default AddProduct;
