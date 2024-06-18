import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SectionHeading from "@/components/Shared/SectionHeading";
import ProductCard from "./ProductCard";
import "./Products.css";

const CategoryBasedProducts = () => {
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { categoryId } = useParams();
  console.log(categoryTitle);
  useEffect(() => {
    async function load() {
      try {
        const categoriesResponse = await axios.get(
          "https://daily-hut-backend.vercel.app/categories"
        );
        // const productsResponse = await axios.get(
        //   "https://daily-hut-backend.vercel.app/"
        // );
        if (categoriesResponse?.status === 200) {
          const category = categoriesResponse.data.find(
            (c) => c._id === categoryId
          );
          setCategoryTitle(category?.name);
        }

        // if (productsResponse.status === 200) {
        //   setProducts(productsResponse.data);
        // }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    load();
    window.scroll(0, 0);
  }, [categoryId]);
  useEffect(() => {
    if (categoryTitle && products?.length > 0) {
      const filtered = products?.filter((p) => p.category === categoryTitle);
      setFilteredProducts(filtered);
    }
  }, [categoryTitle, products]);

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
              <ProductCard key={product.id} data={product} />
            ))}
        </div>
      )}
      {filteredProducts?.length === 0 && (
        <div className="max-w-[90%] min-h-[40vh] mx-auto text-center flex justify-center items-center text-orange-600">
          There are no products added yet for this category. Please visit later
          again. Thanks for your patience.{" "}
        </div>
      )}
    </div>
  );
};

export default CategoryBasedProducts;
