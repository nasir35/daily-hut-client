import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faStar as faStarBlank,
} from "@fortawesome/free-regular-svg-icons";

import useCart from "@/hooks/useCart";
import HoverToolTip from "../../components/HoverToolTip";
const ProductCard = ({ data }) => {
  const { _id, name, price, brand, image_urls } = data;
  const rating = data?.rating || 4;
  const flag = parseFloat(rating) / parseInt(rating) == 1;
  const { addToCart } = useCart();

  return (
    <div className="relative cursor-pointer overflow-hidden border rounded-lg shadow-lg transition-shadow duration-300 p-4">
      <img
        src={
          image_urls != undefined
            ? image_urls[0]
            : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
        }
        alt={name}
        className="w-full min-h-[180px] max-h-[180px] mb-5 object-contain"
      />
      <div className="text-left">
        <h6 className="text-base font-normal mb-2">
          {name.slice(0, 50)}
          {name.length > 50 && "..."}
        </h6>
        <p className="text-base font-normal mb-2">Brand : {brand}</p>
        <p className="text-gray-600 mb-2">$ {parseFloat(price).toFixed(2)}</p>
        <div className="flex items-center gap-1 text-orange-500">
          {Array.from({ length: rating }, (v, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
          {flag === false && <FontAwesomeIcon icon={faStarHalfStroke} />}
          {Array.from(
            { length: 5 - (flag === false ? rating + 1 : rating) },
            (v, i) => (
              <FontAwesomeIcon key={i} icon={faStarBlank} />
            )
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-400  bg-opacity-0 hover:bg-opacity-15 transition-bg duration-300 flex  opacity-0 hover:opacity-100">
        <div className="flex w-full h-[210px] flex-col justify-between items-end gap-4 p-3 pb-0">
          <HoverToolTip text={"Quick view"}>
            <button
              className="bg-gray-700 p-2 w-[40px] h-[40px] flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 transition-colors duration-300"
              aria-label="View"
            >
              <FontAwesomeIcon icon={faEye} className="text-gray-100" />
            </button>
          </HoverToolTip>
          <HoverToolTip text={"Add to cart"}>
            <button
              className="bg-white p-2 w-[40px] h-[40px] flex items-center justify-center border-2 border-orange-400 hover:border-orange-600 rounded-full shadow-md hover:bg-white transition-colors duration-300"
              aria-label="Add to Cart"
              onClick={() => addToCart(data)}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-gray-700 hover:text-gray-900"
              />
            </button>
          </HoverToolTip>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
