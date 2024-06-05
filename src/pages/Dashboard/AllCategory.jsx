import CategoryRow from "@/components/Shared/Dashboard/CategoryRow";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AllCategory = () => {
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    async function load() {
      const data = await axios.get(
        "https://daily-hut-backend.vercel.app/categories"
      );
      if (data?.status === 200) {
        setCategories(data.data);
      }
    }
    load();
  }, [categories]);
  const deleteCategory = async () => {
    try {
      const res = await axios.delete(
        `https://daily-hut-backend.vercel.app/categories/${idToDelete}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setIdToDelete("");
      toast.success("Deleted category Successfully");
    } catch (e) {
      toast.error("Deletion failed.");
    } finally {
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id_passed) => {
    console.log(id_passed);
    setIdToDelete(id_passed);
    openModal();
  };
  return (
    <div className="w-full overflow-x-auto">
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
      {categories?.length === 0 ? (
        <div className="w-full h-full lg:py-32 py-12 flex justify-center items-center">
          <h3 className="text-2xl font-semibold text-center text-blue-500">
            There are no categories added yet!
          </h3>
        </div>
      ) : (
        <table className="table w-full">
          {/* head */}
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
          {/* foot */}
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
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={deleteCategory}
      />
    </div>
  );
};

export default AllCategory;
