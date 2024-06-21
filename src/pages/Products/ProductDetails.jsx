import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "@/hooks/useCart";

const ProductDetails = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function load() {
      try {
        const response = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/products/${product_id}`
        );
        if (response.status === 200) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    load();
  }, [product_id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    title,
    price,
    quantity,
    brand,
    image_urls,
    category,
    description,
  } = product;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-64 w-full object-contain md:w-64"
              src={image_urls[0]}
              alt={title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {category}
            </div>
            <h2 className="text-gray-900 text-2xl font-bold">{title}</h2>
            <p className="mt-2 text-gray-600">Brand: {brand}</p>
            <p className="mt-2 text-gray-600">Price: ${price}</p>
            <p className="mt-2 text-gray-600">Available Quantity: {quantity}</p>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className=" text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
