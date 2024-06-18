import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import useAuth from "@/hooks/useAuth";
import useModal from "../../hooks/useModal";

const AddProduct = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const initialProductState = {
    addedBy: user?.email,
    name: "",
    brand: "",
    price: "",
    quantity: "",
    rating: "",
    category: "",
    subcategory: "",
    description: "",
    image_urls: [""],
  };

  const [product, setProduct] = useState(initialProductState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    async function loadCategoriesAndBrands() {
      const fetchedCategories = await axios.get(
        "http://localhost:5000/api/v1/category"
      );
      if (fetchedCategories.status === 200) {
        setCategories(
          fetchedCategories?.data?.data?.map((category) => ({
            value: category._id,
            label: category.name,
          }))
        );
      }
      const fetchedBrands = await axios.get(
        "http://localhost:5000/api/v1/brands"
      );
      if (fetchedBrands.status === 200) {
        setBrands(
          fetchedBrands?.data?.data?.map((brand) => ({
            value: brand._id,
            label: brand.name,
          }))
        );
      }
    }
    loadCategoriesAndBrands();
  }, []);

  const handleBrandChange = (selectedOption) => {
    setProduct({
      ...product,
      brand: selectedOption ? selectedOption.label : "",
    });
  };
  const handleCategoryChange = async (selectedOption) => {
    setProduct({
      ...product,
      category: selectedOption ? selectedOption.label : "",
      subcategory: "",
    });
    if (selectedOption) {
      const data = await axios.get(
        `http://localhost:5000/api/v1/category/subcategories/${selectedOption.value}`
      );
      if (data.status === 200) {
        setSubcategories(
          data.data.data.map((subcategory) => ({
            value: subcategory,
            label: subcategory,
          }))
        );
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleSubcategoryChange = (selectedOption) => {
    setProduct({
      ...product,
      subcategory: selectedOption ? selectedOption.label : "",
    });
  };

  const handleAddProduct = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/products/`,
        product,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product added successfully!", { autoClose: 3000 });
        setProduct(initialProductState);
      }
    } catch (error) {
      toast.error("Failed to add product.", { autoClose: 2000 });
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
    if (name === "image_urls") {
      setProduct({ ...product, image_urls: [value] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  return (
    <div className="min-h-fit bg-gray-100 flex">
      <ToastContainer />
      <div className="lg:w-2/3 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3 items-center">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="name"
              placeholder="product name"
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
            <Select
              value={brands.find((option) => option.label === product.brand)}
              onChange={handleBrandChange}
              options={brands}
              className="mt-1 block w-full"
              classNamePrefix="react-select"
              isClearable
              placeholder="Select or type to search..."
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
              Rating
            </label>
            <input
              type="number"
              name="rating"
              placeholder="10"
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
              Subcategory
            </label>
            <div className="flex-1 relative">
              <Select
                value={subcategories.find(
                  (option) => option.label === product.subcategory
                )}
                onChange={handleSubcategoryChange}
                options={subcategories}
                className="mt-1 block w-full"
                classNamePrefix="react-select"
                isClearable
                placeholder="Select or type to search..."
                required
              />
            </div>
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
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={handleAddProduct}
      />
    </div>
  );
};

export default AddProduct;
