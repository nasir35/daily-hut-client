import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import useModal from "../../hooks/useModal";
import UploadImage from "../../components/Shared/UploadImage";
import useImageUpload from "../../hooks/useImageUpload";
import InputModal from "../../components/Shared/InputModal";
import useAuth from "@/hooks/useAuth";

const EditProductPage = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const initialProductState = {
    modifiedBy: [],
    name: "",
    brand: "",
    price: "",
    quantity: "",
    rating: "",
    category: "",
    subcategory: "",
    description: "",
    image_urls: [],
  };
  const [product, setProduct] = useState(initialProductState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const { getImageURLs, images } = useImageUpload();
  const [callingFrom, setCallingFrom] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = (event, callingFrom) => {
    event.preventDefault();
    event.stopPropagation();
    setCallingFrom(callingFrom);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => setIsAddModalOpen(false);

  useEffect(() => {
    async function loadCategoriesAndBrands() {
      try {
        const [categoryRes, brandRes] = await Promise.all([
          axios.get("http://localhost:5000/api/v1/category"),
          axios.get("http://localhost:5000/api/v1/brands"),
        ]);

        if (categoryRes.status === 200) {
          setCategories(
            categoryRes.data.data.map((category) => ({
              value: category._id,
              label: category.name,
            }))
          );
        }

        if (brandRes.status === 200) {
          setBrands(
            brandRes.data.data.map((brand) => ({
              value: brand._id,
              label: brand.name,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load categories and brands:", error);
      }
    }

    loadCategoriesAndBrands();
  }, []);

  const handleBrandChange = (selectedOption) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      brand: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleCategoryChange = async (selectedOption) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedOption ? selectedOption.label : "",
      subcategory: "",
    }));
    if (selectedOption) {
      try {
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
      } catch (error) {
        console.error("Failed to load subcategories:", error);
      }
    } else {
      setSubcategories([]);
    }
  };

  const handleSubcategoryChange = (selectedOption) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      subcategory: selectedOption ? selectedOption.label : "",
    }));
  };

  useEffect(() => {
    async function load() {
      const res = await axios.get(
        `http://localhost:5000/api/v1/products/${id}`
      );
      setProduct(res?.data.data);
    }
    load();
  }, [id]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "price" || name === "quantity") {
      if (value < 0) {
        toast.error("please enter a positive value", {
          autoClose: 1000,
        });
        return;
      }
    }
    if (name === "rating") {
      if (value < 0 || value > 5) {
        toast.error("Rating value should be in range of 0 - 5", {
          autoClose: 1500,
        });
        return;
      }
    }

    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const saveNewVal = async (newVal, route) => {
    if (!route.includes("category/")) {
      const res = await axios.post(
        `http://localhost:5000/api/v1/${route}/`,
        newVal,
        { headers: { authorization: `Bearer ${token}` } }
      );
      return res;
    } else {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/${route}/`,
        newVal,
        { headers: { authorization: `Bearer ${token}` } }
      );
      return res;
    }
  };

  const handleNewVal = async (newVal, addingTo, setIsSaving) => {
    try {
      if (addingTo === "brands") {
        let savedBrand = (await saveNewVal(newVal, addingTo)).data;

        setBrands((prevBrands) => [
          ...prevBrands,
          {
            value: savedBrand.data.insertedId,
            label: newVal.name,
          },
        ]);
        handleBrandChange(savedBrand.data.insertedId);
        toast.success("Brand added successfully!", { autoClose: 1500 });
        setIsSaving(false);
      } else if (addingTo === "category") {
        try {
          let matched = categories.find(
            (c) => c.label.toLowerCase() === newVal.name.toLowerCase()
          );
          if (matched) {
            try {
              const savedData = await axios.get(
                `http://localhost:5000/api/v1/category?name=${matched.label}`
              );
              newVal.itemsCount = savedData.data?.data[0]?.itemsCount || 0;
              const response = await axios.patch(
                `http://localhost:5000/api/v1/category/${matched.value}`,
                newVal,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                }
              );
              const data = response.data.data;
              if (response.status === 200) {
                setIsSaving(false);
                toast.success("Category updated Successfully!", {
                  autoClose: 2000,
                });
              } else {
                toast.error("Failed to update the Category!", {
                  autoClose: 2000,
                });
                setIsSaving(false);
              }
            } catch (error) {
              toast.error("Failed to update the Category!", {
                autoClose: 2000,
              });
              setIsSaving(false);
            }
          } else {
            const response = await saveNewVal(newVal, addingTo);
            if (response.status === 200) {
              setIsSaving(false);
              toast.success("Category Added Successfully!", {
                autoClose: 2000,
              });
              setCategories((prevCategory) => [
                ...prevCategory,
                { value: response.data.insertedId, label: newVal.name },
              ]);
              handleBrandChange(response.data.insertedId);
            } else {
              toast.error("Failed to Add new Category!", { autoClose: 3000 });
              setIsSaving(false);
              console.log("Failed to add category:", response);
            }
          }
        } catch (e) {
          setIsSaving(false);
          console.log("Failed to add category:", e);
        } finally {
          setIsSaving(false);
          closeAddModal();
        }
      } else {
        try {
          let savedSubCategoryRes = await saveNewVal(newVal, addingTo);
          if (savedSubCategoryRes.status === 200) {
            newVal.subCategories.forEach((subcategory) =>
              setSubcategories((prevCategory) => [
                ...prevCategory,
                {
                  value: subcategory,
                  label: subcategory,
                },
              ])
            );
            toast.success("Subcategory added successfully!", {
              autoClose: 1500,
            });
            setIsSaving(false);
          }
        } catch (error) {
          toast.error("Something went wrong!", { autoClose: 1000 });
          console.error("Error saving new Value:", error);
        } finally {
          setIsSaving(false);
          closeAddModal();
        }
      }
    } catch (err) {
      setIsSaving(false);
      console.log(err);
    } finally {
      closeAddModal();
    }
  };

  const handleSave = async () => {
    let { _id, addedBy, ...productWithoutId } = product;
    try {
      setLoading(true);
      if (images.length) {
        try {
          let uploadedImageUrls = await getImageURLs();
          productWithoutId.image_urls = uploadedImageUrls;
        } catch (error) {
          toast.error("Error occured on Image uploading.");
          console.log(error);
        }
      }
      if (!productWithoutId.modifiedBy) {
        productWithoutId.modifiedBy = [];
      }
      productWithoutId.modifiedBy.push(user.email);
      let userSet = new Set(productWithoutId.modifiedBy);
      productWithoutId.modifiedBy = Array.from(userSet);
      const res = await axios.patch(
        `http://localhost:5000/api/v1/products/${id}`,
        productWithoutId,
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setLoading(false);
        toast.success("Product Details Updated!");
        setTimeout(() => {
          navigate("/dashboard/all-products");
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error! Couldn't update the product!");
      console.log(err);
    } finally {
      setLoading(false);
      closeModal();
    }
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
          <InputModal
            isOpen={isAddModalOpen}
            onRequestClose={closeAddModal}
            handleNewVal={handleNewVal}
            callingFrom={callingFrom}
          />
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
          <div className="flex gap-3 items-center relative">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select
              value={
                categories.find(
                  (option) => option.label === product.category
                ) || ""
              }
              onChange={handleCategoryChange}
              options={categories}
              className="mt-1 block w-full"
              classNamePrefix="react-select"
              isClearable
              placeholder="Select or type to search..."
              required
            />
            <button
              type="button"
              onClick={() => openAddModal(event, "category")}
              className="absolute right-0 bottom-0 ml-2 p-[7px] w-fit bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
          {subcategories.length > 0 && (
            <div className="flex gap-3 items-center relative">
              <label className="w-24 block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <Select
                value={
                  subcategories.find(
                    (option) => option.label === product.subcategory
                  ) || ""
                }
                onChange={handleSubcategoryChange}
                options={subcategories}
                className="mt-1 block w-full"
                classNamePrefix="react-select"
                isClearable
                placeholder="Select or type to search..."
              />
              <button
                type="button"
                onClick={() =>
                  openAddModal(
                    event,
                    `category/subcategories/${product?.category}`
                  )
                }
                className="absolute right-0 bottom-0 ml-2 p-[7px] w-fit bg-blue-500 text-white rounded-r hover:bg-blue-600"
              >
                Add Subcategory
              </button>
            </div>
          )}
          <div className="flex gap-3 items-center relative">
            <label className="w-24 block text-sm font-medium text-gray-700">
              Brand
            </label>
            <Select
              value={
                brands.find((option) => option.label === product.brand) || ""
              }
              onChange={handleBrandChange}
              options={brands}
              className="mt-1 block w-full"
              classNamePrefix="react-select"
              isClearable
              placeholder="Select or type to search..."
              required
            />
            <button
              type="button"
              onClick={() => openAddModal(event, "brands")}
              className="absolute right-0 bottom-0 ml-2 p-[7px] w-fit bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Add New Brand
            </button>
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
          <UploadImage numberOfImages={5} />
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
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditProductPage;
