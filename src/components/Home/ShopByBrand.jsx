import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShopByBrand = () => {
  const [brands, setBrands] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://daily-hut-backend.vercel.app/api/v1/brands"
        );
        if (response.status === 200) {
          setBrands(response.data.data);
        } else {
          // Handle other status codes
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  let topBrands;
  if (brands) {
    topBrands = brands?.sort((a, b) => b.itemsCount - a.itemsCount).slice(0, 4);
  }
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center">
          Shop by Trusted Brands
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topBrands?.map((brand) => (
            <Link
              key={brand.name}
              to={`products/brand/${brand.name}`}
              className="block"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={brand.image_urls}
                  alt={brand.name}
                  className="w-full h-40 object-contain"
                />
                <div className="absolute inset-0 bg-black opacity-25"></div>
                <h3 className="absolute bottom-0 left-0 p-4 text-white text-lg font-bold">
                  {brand.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByBrand;
