import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import useModal from "../../hooks/useModal";

const EditProductPage = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    quantity: "",
    rating: "",
    description: "",
    image_urls: [""],
  });

  const [categories, setCategories] = useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    async function load() {
      const data = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(data?.data);
    }
    load();
  }, [id]);

  useEffect(() => {
    async function load() {
      const data = await axios.get("http://localhost:5000/categories");
      if (data.status === 200) {
        setCategories(
          data.data.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      }
    }
    load();
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setProduct({
      ...product,
      category: selectedOption ? selectedOption.label : "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image_urls") {
      setProduct({ ...product, image_urls: [value] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSave = async () => {
    const { _id, ...productWithoutId } = product;
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productWithoutId),
    });
    toast.success("Product Details Updated!", { autoClose: 2500 });
    setTimeout(() => {
      navigate("/dashboard/all-products");
    }, 1000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 ">Edit Product</h2>
        <div className="space-y-4">
          <div className="flex gap-3 items-center ">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Kashmiri Punjabi"
              value={product.name}
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
              value={product.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 custom-number-input"
              required
            />
          </div>
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={product.rating}
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
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/dashboard/all-products")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
        <ConfirmModal
          action={"Edit"}
          actionOn={"Product"}
          isModalOpen={isModalOpen}
          onCancel={closeModal}
          onConfirm={handleSave}
        />
      </div>
    </div>
  );
};

export default EditProductPage;
