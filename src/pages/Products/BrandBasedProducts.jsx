import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import SectionHeading from "@/components/Shared/SectionHeading";
import ProductCard from "./ProductCard";
import "./Products.css";

const BrandBasedProducts = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { brandName } = useParams();
  useEffect(() => {
    async function load() {
      try {
        const BrandResponse = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/brands?name=${brandName}`
        );
        const productsResponse = await axios.get(
          `https://daily-hut-backend.vercel.app/api/v1/products?brand=${brandName}`
        );
        if (BrandResponse?.status === 200) {
          const brand = BrandResponse.data.data;
        }

        if (productsResponse.status === 200) {
          setFilteredProducts(productsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scroll(0, 0);
  }, [brandName]);

  if (loading) return <LoadingSpinner />;
  else
    return (
      <div className="px-10 mb-8">
        <SectionHeading
          title={`Products for ${brandName} Brand!`}
          subTitle="We have a vast collection of products in different Brands! Check out from the below and get your desired one."
        />
        {filteredProducts?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
          </div>
        )}
        {filteredProducts?.length === 0 && (
          <div className="max-w-[90%] min-h-[40vh] mx-auto text-center flex justify-center items-center text-orange-600">
            There are no products added yet for this Brand. Please visit later
            again. Thanks for your patience.{" "}
          </div>
        )}
      </div>
    );
};

export default BrandBasedProducts;
