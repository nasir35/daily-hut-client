import React, { useState, useEffect } from "react";
import axios from "axios";
import useCart from "@/hooks/useCart";
import useModal from "@/hooks/useModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "@/components/Shared/ConfirmModal";
import { ToastContainer, toast } from "react-toastify";

const ViewCart = () => {
  const { totalPrice, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const cartDetails = JSON.parse(localStorage.getItem("cartDetails"));
  const { isModalOpen, openModal, closeModal } = useModal();
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchCartDetails = async () => {
      if (!cartDetails) {
        setLoading(false);
        return;
      }
      const productPromises = cartDetails.products_id.map(async (idObject) => {
        const response = await axios.get(
          `http://localhost:5000/api/v1/products/${idObject.id}`
        );
        return response.data.data;
      });

      const products = await Promise.all(productPromises);
      setCartProducts(products);
      setLoading(false);
    };
    fetchCartDetails();
  }, []);

  const changeQuantity = async (itemId, increment) => {
    let product = await axios.get(
      `http://localhost:5000/api/v1/products/${itemId}`
    );
    product = product.data.data;
    if (increment > 0) {
      await addToCart(product);
    } else {
      if (
        cartDetails.products_id[
          cartDetails.products_id.findIndex((i) => i.id === itemId)
        ].quantity > 1
      )
        await decreaseQuantity(itemId);
      else return;
    }
  };

  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    openModal();
  };
  const removeItem = async () => {
    await removeFromCart(itemToRemove);
    setCartProducts(cartProducts.filter((p) => p._id !== itemToRemove));
    toast.success("Item removed successfully!", { autoClose: 2000 });
    closeModal();
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>
      {cartProducts?.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts?.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2 flex items-center justify-center">
                    <button
                      onClick={() => changeQuantity(item._id, -1)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-400"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="px-4">
                      {
                        cartDetails.products_id[
                          cartDetails.products_id.findIndex(
                            (i) => i.id === item._id
                          )
                        ]?.quantity
                      }
                    </span>
                    <button
                      onClick={() => changeQuantity(item._id, 1)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-400"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    $
                    {parseFloat(
                      item.price *
                        cartDetails.products_id[
                          cartDetails.products_id.findIndex(
                            (i) => i.id === item._id
                          )
                        ]?.quantity
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-right flex gap-4 items-center justify-end">
            <h2 className="text-xl font-semibold">
              Total: ${parseFloat(totalPrice).toFixed(2)}
            </h2>
            <button className="btn btn-neutral" onClick={handleOpenModal}>
              Checkout
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Notice</h2>
            <p className="mb-6">Checkout process will be added soon</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ConfirmModal
        action="Remove"
        actionOn="Item"
        isModalOpen={isModalOpen}
        onConfirm={removeItem}
        onCancel={closeModal}
      />
    </div>
  );
};

export default ViewCart;
