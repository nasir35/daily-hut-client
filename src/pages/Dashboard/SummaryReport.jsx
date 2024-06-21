import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

const SummaryReport = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState({});
  const [categoryCount, setCategoryCount] = useState(0);
  const [brandsCount, setBrandsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/api/v1/products"
        );
        const userResponse = await axios.get(
          "http://localhost:5000/api/v1/users/users-count",
          { headers: { authorization: `Bearer ${token}` } }
        );
        const brandResponse = await axios.get(
          "http://localhost:5000/api/v1/brands"
        );
        const categoryResponse = await axios.get(
          "http://localhost:5000/api/v1/category"
        );

        setProductCount(productResponse.data.totalProducts);
        setUserCount(userResponse.data.data);
        setCategoryCount(categoryResponse.data.data.length);
        setBrandsCount(brandResponse.data.data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-8">Summary</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-1 ">
            Total Products
          </h2>
          <p className="text-4xl font-bold">{productCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-1 ">
            Total Users
          </h2>
          <p className="text-lg font-bold">Admin - {userCount.adminsCount}</p>
          <p className="text-lg font-bold">
            Supplier - {userCount.suppliersCount}
          </p>
          <p className="text-lg font-bold">Member - {userCount.membersCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-1 ">
            Total Brands
          </h2>
          <p className="text-4xl font-bold">{brandsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-200 pb-1 ">
            Total Categories
          </h2>
          <p className="text-4xl font-bold">{categoryCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;
