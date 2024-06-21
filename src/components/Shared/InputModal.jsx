import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import useAuth from "@/hooks/useAuth";
import useImageUpload from "../../hooks/useImageUpload";
import { toast } from "react-toastify";
import axios from "axios";

const InputModal = ({ isOpen, onRequestClose, handleNewVal, callingFrom }) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const { getImageURLs, setImages, setImagePreviews } = useImageUpload();
  const [newCategory, setNewCategory] = useState({
    addedBy: user?.email,
    name: "",
    image_url: "",
    itemsCount: 0,
    subCategories: [],
  });
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    // changing every to initial state when modal opens
    setNewCategory({
      addedBy: user?.email,
      name: "",
      image_url: "",
      itemsCount: 0,
      subCategories: [],
    });
    setSubCategoryInput("");
    setImagePreviews([]);
    setImages([]);
    setIsSaving(false);

    // fething for finding the category if user try to add subCategories
    const fetchData = async () => {
      try {
        const selectedCategory = callingFrom?.split("/")[2];
        const response = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/category?name=${selectedCategory}`
        );
        if (response.status === 200) {
          const categoryDetails = response?.data?.data[0];
          setNewCategory((prevCategory) => ({
            ...prevCategory,
            name: categoryDetails?.name || "",
            image_url: categoryDetails?.image_url || "",
            itemsCount: categoryDetails?.itemsCount || 0,
          }));
          setSelectedCategoryId(categoryDetails?._id);
        } else {
          console.error(
            "Failed to fetch category details with status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error occurred fetching category details:", error);
      }
    };

    fetchData();
  }, [isOpen, callingFrom]);

  if (!isOpen) return;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubCategoryInputChange = (e) => {
    setSubCategoryInput(e.target.value);
  };

  const handleSubCategoryKeyPress = (e) => {
    if ((e.key === "Enter" || e.key === " ") && subCategoryInput.trim()) {
      e.preventDefault();
      if (/^[a-zA-Z\s-_]+$/.test(subCategoryInput.trim())) {
        setNewCategory((prevCategory) => ({
          ...prevCategory,
          subCategories: [
            ...prevCategory.subCategories,
            subCategoryInput.trim(),
          ],
        }));
        setSubCategoryInput("");
      } else {
        toast.error(
          "Subcategory must contain only letters, underscore or hyphen.",
          {
            autoClose: 2000,
          }
        );
      }
    }
  };

  const handleRemoveSubCategory = (index) => {
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      subCategories: prevCategory.subCategories.filter((_, i) => i !== index),
    }));
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    if (callingFrom === "brands") {
      const initialBrandState = {
        addedBy: user?.email,
        name: "",
        description: "",
        image_urls: "",
      };
      try {
        const form = document.getElementById("brand-form");
        const newBrand = { ...initialBrandState };
        newBrand.name = form.children[0].children[1].value.trim();
        if (!newBrand.name) {
          toast.error("Enter a brand name.", { autoClose: 1500 });
          return;
        }
        newBrand.description = form.children[1].children[1].value || "";
        const urls = await getImageURLs();
        newBrand.image_urls = urls[0];
        const route = callingFrom;
        handleNewVal(newBrand, route, setIsSaving);
      } catch (error) {
        toast.error("Image is required! Please insert a valid Image.", {
          autoClose: 1500,
        });
      }
    } else if (callingFrom === "category") {
      try {
        if (newCategory.name.trim() === "") {
          toast.error("Enter a category name!", { autoClose: 1000 });
          setIsSaving(false);
          return;
        }
        const urls = await getImageURLs();
        newCategory.image_url = urls[0];
        handleNewVal(newCategory, callingFrom, setIsSaving);
      } catch (error) {
        toast.error("Upload a valid image (jpg/png/svg/webp) to proceed.", {
          autoClose: 1500,
        });
        setIsSaving(false);
        return;
      }
    } else {
      if (newCategory.subCategories.length === 0) {
        toast.error("Add at least one subcategory to proceed!", {
          autoClose: 1500,
        });
        setIsSaving(false);
        return;
      } else {
        handleNewVal(
          newCategory,
          `category/${selectedCategoryId}`,
          setIsSaving
        );
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[2]">
      <div className="bg-white rounded-lg shadow-lg lg:w-1/3 md:w-1/2 w-[80%] p-4 relative">
        <button
          type="button"
          className="absolute top-2 right-2 text-red-600 hover:text-white hover:bg-red-600 transition-all duration-200 rounded-full border-2 border-red-600 w-7 h-7"
          onClick={onRequestClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div id="modal-body">
          {callingFrom === "brands" ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add New Brand</h2>
              <div className="mb-4 space-y-3" id="brand-form">
                <div className="flex gap-2 items-center">
                  <label htmlFor="name" className="flex">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter new brand"
                    className="p-1.5 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    placeholder="About the brand"
                    className="p-1.5 border border-gray-300 rounded w-full"
                    required
                  />
                </div>
                <UploadImage numberOfImages={1} />
              </div>
            </div>
          ) : callingFrom === "category" ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
              <div id="category-form">
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Sherwani"
                    value={newCategory.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Sub Categories</label>
                  <input
                    type="text"
                    name="subCategoryInput"
                    placeholder="Add subcategory and press enter or space"
                    value={subCategoryInput}
                    onChange={handleSubCategoryInputChange}
                    onKeyPress={handleSubCategoryKeyPress}
                    className="border p-2 rounded w-full"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newCategory.subCategories.map((subCategory, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                      >
                        <span>{subCategory}</span>
                        <button
                          type="button"
                          className="ml-2 text-white"
                          onClick={() => handleRemoveSubCategory(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <p>
                  Upload image <span className="text-red-500">*</span>{" "}
                  <small>Max 1 image</small>
                </p>
                <UploadImage numberOfImages={1} />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add Sub Categories</h2>
              <div id="category-form">
                <div className="mb-4">
                  <label className="block text-gray-700">Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    className="border p-2 rounded w-full"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Sub Categories</label>
                  <input
                    type="text"
                    name="subCategoryInput"
                    placeholder="Add subcategory and press enter or space"
                    value={subCategoryInput}
                    onChange={handleSubCategoryInputChange}
                    onKeyPress={handleSubCategoryKeyPress}
                    className="border p-2 rounded w-full"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newCategory.subCategories.map((subCategory, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
                      >
                        <span>{subCategory}</span>
                        <button
                          type="button"
                          className="ml-2 text-white"
                          onClick={() => handleRemoveSubCategory(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={isSaving}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
