import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-800 min-h-[80vh]  bg-opacity-50  bg-[url('@/assets/images/hero-bg.jpg')] bg-no-repeat bg-cover bg-left-bottom">
      <div className="overlay bg-black min-h-[80vh] flex flex-col justify-center items-center bg-opacity-20 top-0 left-0 w-full h-full">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mt-6 text-white">
            Welcome to <span className="text-orange-500">Daily Hut</span>
          </h1>
          <p className="my-4 text-lg text-gray-400">
            Find the best products at the best prices
          </p>
          <Link
            to={"/products"}
            className="inline-block mb-12 px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-indigo-700"
          >
            Shop Now
          </Link>
          <p className="max-w-[500px] mx-auto px-5 text-[#E5E5E5] backdrop-blur-[2px] text-sm">
            Daily Hut is an E-commerce platform that offers a wide variety of
            products including fashion, technology, accessories, groceries, and
            more
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
