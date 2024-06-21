import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import useModal from "../../hooks/useModal";
import axios from "axios";
import UploadImage from "../../components/Shared/UploadImage";
import useImageUpload from "../../hooks/useImageUpload";

const AddCategory = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [categories, setCategories] = useState([]);
  const { getImageURLs } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    addedBy: user?.email,
    name: "",
    image_url: "",
    itemsCount: 0,
    subCategories: [],
  });
  const [subCategoryInput, setSubCategoryInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://daily-hut-backend.vercel.app/api/v1/category"
        );
        if (response.status === 200) {
          setCategories(response.data.data);
        } else {
          // Handle other status codes
        }
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    openModal();
  };

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      let matched = categories.find(
        (c) => c.name.toLowerCase() === newCategory.name.toLowerCase()
      );
      if (matched) {
        try {
          const urls = await getImageURLs();
          newCategory.image_url = urls[0];
        } catch (err) {
          newCategory.image_url;
        }
        const response = await axios.patch(
          `https://daily-hut-backend.vercel.app/api/v1/category/${matched._id}`,
          newCategory,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (response.status === 200) {
          setLoading(false);
          toast.success("Category updated Successfully!", { autoClose: 2000 });
          setNewCategory({
            addedBy: user?.email,
            name: "",
            image_url: "",
            itemsCount: 0,
            subCategories: [],
          });
          setTimeout(() => {
            navigate("/dashboard/all-categories");
          }, 1000);
        } else {
          toast.error("Failed to update the Category!", { autoClose: 2000 });
          console.log("Failed to add category:", data);
        }
      } else {
        try {
          const urls = await getImageURLs();
          newCategory.image_url = urls[0];
        } catch (err) {
          toast.error("Error. Image is required!", { autoClose: 1500 });
          return;
        }
        const response = await fetch(
          "https://daily-hut-backend.vercel.app/api/v1/category",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCategory),
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          setLoading(false);
          toast.success("Category Added Successfully!", { autoClose: 2000 });
          setNewCategory({
            addedBy: user?.email,
            name: "",
            image_url: "",
            itemsCount: 0,
            subCategories: [],
          });
          setTimeout(() => {
            navigate("/dashboard/all-categories");
          }, 1000);
        } else {
          setLoading(false);
          toast.error("Failed to Add new Category!", { autoClose: 3000 });
          console.log("Failed to add category:", data);
        }
      }
    } catch (e) {
      console.log("Failed to add category:", e);
      toast.error("Failed to Add new Category!", { autoClose: 3000 });
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
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

          <UploadImage numberOfImages={1} />
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
        onConfirm={handleAddCategory}
        onCancel={closeModal}
        isModalOpen={isModalOpen}
        loading={loading}
      />
    </div>
  );
};

export default AddCategory;
