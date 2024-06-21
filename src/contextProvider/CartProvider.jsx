import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const cartApi = "https://daily-hut-backend.vercel.app/api/v1/cart";

  useEffect(() => {
    const initializeCart = async () => {
      const cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || {
        products_id: [],
        totalCount: 0,
        totalPrice: 0.0,
      };

      setCartCount(parseInt(cartDetails.totalCount));
      setTotalPrice(parseFloat(cartDetails.totalPrice));

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${cartApi}/`, {
            headers: { authorization: `Bearer ${token}` },
          });
          const dbCartDetails = response.data.data?.cartDetails;

          // Merge local storage and database cart details
          const mergedCartDetails = mergeCartDetails(
            cartDetails,
            dbCartDetails
          );

          // Update state and local storage with merged data
          setCartCount(mergedCartDetails.totalCount);
          setTotalPrice(mergedCartDetails.totalPrice);
          localStorage.setItem(
            "cartDetails",
            JSON.stringify(mergedCartDetails)
          );

          // Update the database with the merged cart details
          await axios.patch(cartApi, mergedCartDetails, {
            headers: { authorization: `Bearer ${token}` },
          });
        } catch (error) {
          console.error("Error fetching cart from database:", error);
        }
      }
    };

    initializeCart();
  }, []);

  const mergeCartDetails = (localCart, dbCart) => {
    const mergedProducts = [...localCart.products_id];
    dbCart?.products_id?.forEach((dbProduct) => {
      const localProduct = mergedProducts.find((p) => p.id === dbProduct.id);
      if (localProduct) {
        localProduct.quantity += dbProduct.quantity;
      } else {
        mergedProducts.push(dbProduct);
      }
    });

    const totalCount = mergedProducts.reduce(
      (total, p) => total + p.quantity,
      0
    );
    const totalPrice = mergedProducts
      .reduce((total, p) => total + p.quantity * parseFloat(p.price), 0)
      .toFixed(2);

    return {
      products_id: mergedProducts,
      totalCount,
      totalPrice,
    };
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      let cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || {
        products_id: [],
        totalCount: 0,
        totalPrice: 0.0,
      };
      const { products_id, totalPrice } = cartDetails;

      let matchIndex = products_id.findIndex((p) => p.id === product._id);

      if (matchIndex !== -1) {
        products_id[matchIndex].quantity += 1;
      } else {
        products_id.push({
          id: product._id,
          quantity: 1,
          price: product.price,
        });
      }

      let updatedTotalPrice =
        parseFloat(totalPrice) + parseFloat(product.price);
      updatedTotalPrice = updatedTotalPrice.toFixed(2);

      const quantityCount = products_id.reduce(
        (total, p) => total + p.quantity,
        0
      );

      const updatedCartDetails = {
        products_id,
        totalCount: quantityCount,
        totalPrice: updatedTotalPrice,
      };

      localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));

      setCartCount(quantityCount);
      setTotalPrice(parseFloat(updatedTotalPrice));

      if (token) {
        await axios.patch(cartApi, updatedCartDetails, {
          headers: { authorization: `Bearer ${token}` },
        });
      }
      toast.success("Added to cart", { autoClose: 1000 });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      let cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || {
        products_id: [],
        totalCount: 0,
        totalPrice: 0.0,
      };

      const { products_id, totalPrice } = cartDetails;

      const indexToRemove = products_id.findIndex((p) => p.id === productId);

      if (indexToRemove !== -1) {
        const removedItem = products_id.splice(indexToRemove, 1)[0];
        const rItem = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/products/${productId}`
        );
        const product = rItem.data.data;

        let updatedTotalPrice =
          parseFloat(totalPrice) -
          removedItem.quantity * parseFloat(product.price);
        updatedTotalPrice = updatedTotalPrice.toFixed(2);

        const quantityCount = products_id.reduce(
          (total, p) => total + p.quantity,
          0
        );

        const updatedCartDetails = {
          products_id,
          totalCount: quantityCount,
          totalPrice: updatedTotalPrice,
        };

        localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));
        setCartCount(quantityCount);
        setTotalPrice(parseFloat(updatedTotalPrice));

        if (token) {
          await axios.patch(cartApi, updatedCartDetails, {
            headers: { authorization: `Bearer ${token}` },
          });
        }
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  const decreaseQuantity = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      let cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || {
        products_id: [],
        totalCount: 0,
        totalPrice: 0.0,
      };

      const { products_id, totalPrice } = cartDetails;

      const indexToRemove = products_id.findIndex((p) => p.id === productId);

      if (indexToRemove !== -1) {
        const rItem = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/products/${productId}`
        );
        const product = rItem.data.data;

        let updatedTotalPrice =
          parseFloat(totalPrice) - parseFloat(product.price);
        updatedTotalPrice = updatedTotalPrice.toFixed(2);
        products_id[indexToRemove].quantity--;

        const quantityCount = products_id.reduce(
          (total, p) => total + p.quantity,
          0
        );

        const updatedCartDetails = {
          products_id,
          totalCount: quantityCount,
          totalPrice: updatedTotalPrice,
        };

        localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));
        setCartCount(quantityCount);
        setTotalPrice(parseFloat(updatedTotalPrice));

        if (token) {
          await axios.patch(cartApi, updatedCartDetails, {
            headers: { authorization: `Bearer ${token}` },
          });
        }
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };
  const cartInfo = {
    cartCount,
    totalPrice,
    addToCart,
    removeFromCart,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
