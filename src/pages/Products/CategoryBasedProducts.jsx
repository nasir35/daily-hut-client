import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import SectionHeading from "@/components/Shared/SectionHeading";
import ProductCard from "./ProductCard";
import "./Products.css";

const CategoryBasedProducts = () => {
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  useEffect(() => {
    async function load() {
      try {
        const categoryResponse = await axios.get(
          `http://localhost:5000/api/v1/category/${categoryId}`
        );
        const productsResponse = await axios.get(
          `http://localhost:5000/api/v1/products?category=${categoryTitle}`
        );
        if (categoryResponse?.status === 200) {
          const category = categoryResponse.data.data;
          setCategoryTitle(category?.name);
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
  }, [categoryId, categoryTitle]);

  if (loading) return <LoadingSpinner />;
  else
    return (
      <div className="px-10 mb-8">
        <SectionHeading
          title={`Products for ${categoryTitle} category!`}
          subTitle="We have a vast collection of products in different categories! Check out from the below and get your desired one."
        />
        {filteredProducts?.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
          </div>
        )}
        {filteredProducts?.length === 0 && (
          <div className="max-w-[90%] min-h-[40vh] mx-auto text-center flex justify-center items-center text-orange-600">
            There are no products added yet for this category. Please visit
            later again. Thanks for your patience.{" "}
          </div>
        )}
      </div>
    );
};

export default CategoryBasedProducts;
