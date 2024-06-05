import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || {
      products_id: [],
      totalPrice: 0,
    };
    setCartCount(cartDetails?.products_id.length);
    setTotalPrice(cartDetails?.totalPrice);
  }, []);

  const addToCart = (product) => {
    const cartDetails = JSON.parse(localStorage.getItem("cartDetails")) || {
      products_id: [],
      totalPrice: 0,
    };
    const { products_id, totalPrice } = cartDetails;
    products_id.push(product.id);
    let updatedTotalPrice = parseFloat(totalPrice) + parseFloat(product.price);
    updatedTotalPrice = updatedTotalPrice.toFixed(2);
    const updatedCartDetails = {
      ...cartDetails,
      products_id,
      totalPrice: updatedTotalPrice,
    };
    localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));
    setCartCount(products_id.length);
    setTotalPrice(totalPrice);
  };
  const cartInfo = {
    cartCount,
    totalPrice,
    addToCart,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;