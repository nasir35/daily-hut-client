import CategoryRow from "@/components/Dashboard/CategoryRow";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import useModal from "../../hooks/useModal";

const AllCategory = () => {
  const token = localStorage.getItem("token");
  const [idToDelete, setIdToDelete] = useState("");
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isModalOpen, closeModal, openModal } = useModal();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://daily-hut-backend.vercel.app/api/v1/category"
      );
      if (response.status === 200) {
        setCategories(response.data.data);
      } else {
        toast.error("Failed to load categories.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `https://daily-hut-backend.vercel.app/categories/${idToDelete}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Deleted category successfully.", { autoClose: 2000 });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Deletion failed.", { autoClose: 2000 });
    } finally {
      closeModal();
    }
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    openModal();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full overflow-x-auto">
      <ToastContainer />
      {categories?.length === 0 ? (
        <div className="w-full h-full lg:py-32 py-12 flex justify-center items-center">
          <h3 className="text-2xl font-semibold text-center text-blue-500">
            There are no categories added yet!
          </h3>
        </div>
      ) : (
        <table className="table w-full">
          <thead className="bg-gray-300 w-full">
            <tr>
              <th>Sl no</th>
              <th>Image</th>
              <th>Category</th>
              <th>Items Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {categories?.length > 0 &&
              categories.map((c, index) => (
                <CategoryRow
                  key={index}
                  category={c}
                  index={index}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
          <tfoot className="bg-gray-300">
            <tr>
              <th>Sl no</th>
              <th>Image</th>
              <th>Category</th>
              <th>Items Count</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      )}
      <ConfirmModal
        action={"Delete"}
        actionOn={"Category"}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={deleteCategory}
      />
    </div>
  );
};

export default AllCategory;
