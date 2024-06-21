import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeading from "@/components/Shared/SectionHeading";
import ProductCard from "./ProductCard";
import "./Products.css";

const Products = () => {
  const [displayProducts, setDisplayProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [fadeClass, setFadeClass] = useState("fade-enter-active");
  let { page } = useParams();
  if (!page) page = 1;

  const loadProducts = async (page) => {
    try {
      const response = await axios.get(
        `https://daily-hut-backend.vercel.app/api/v1/products?page=${page}`
      );
      if (response.status === 200) {
        setDisplayProducts(response.data.data);
        setPages(Math.ceil(response.data.totalProducts / 20));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const handlePageChange = async (newPage) => {
    setFadeClass("fade-enter");
    await loadProducts(newPage);
    setTimeout(() => {
      setFadeClass("fade-enter-active");
    }, 500);
  };

  return (
    <div className={`px-10 mb-8 ${fadeClass}`}>
      <SectionHeading
        title="Products"
        subTitle="We have a vast collection of products in different categories! Check out from the below and get your desired one."
      />
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mb-8">
        {displayProducts.length > 0 &&
          displayProducts.map((product) => (
            <ProductCard key={product._id} data={product} />
          ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="join">
          {pages > 1 &&
            [...Array(pages).keys()].map((pageIndex) => (
              <input
                key={pageIndex}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={`${pageIndex + 1}`}
                checked={parseInt(page, 10) === pageIndex + 1}
                onChange={() => handlePageChange(pageIndex + 1)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
