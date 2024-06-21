import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import ProductCard from "../../pages/Products/ProductCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const electronicRes = await axios.get(
          "http://localhost:5000/api/v1/products?category=Electronics&limit=4"
        );

        if (electronicRes.status === 200) {
          setFeaturedProducts(electronicRes.data.data);
        }
        setLoading(false);
      } catch (error) {
        // Handle error
      }
    };
    fetchData();
  }, []);
  if (loading) return <LoadingSpinner />;
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center">Featured Products</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts?.map((product) => (
            <Link
              key={product?._id}
              to={`/product/${product?._id}`}
              className="block"
            >
              <ProductCard data={product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
