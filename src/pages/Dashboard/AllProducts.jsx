import { useLoaderData, useNavigate } from "react-router-dom";
import ProductRow from "@/components/Dashboard/ProductRow";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const data = useLoaderData()?.data;
  const navigate = useNavigate();
  const handleDelete = (id) => {
    setProductId(id);
    openModal();
  };
  const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        `https://daily-hut-backend.vercel.app/api/v1/products/${productId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        toast.success("Product Deleted!");
        setTimeout(() => {
          navigate("/dashboard/all-products");
          closeModal();
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      closeModal();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-300">
            <tr>
              <th>Sl no</th>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((p, index) => (
                <ProductRow
                  key={index}
                  index={index}
                  product={p}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
          {/* foot */}
          <tfoot className="bg-gray-300">
            <tr>
              <th>Sl no</th>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="text-center">Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <ConfirmModal
        action={"Delete"}
        actionOn={"Product"}
        isModalOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={deleteProduct}
      />
    </div>
  );
};

export default AllProducts;
