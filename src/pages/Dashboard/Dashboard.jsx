import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from "axios";
import { Bar } from "react-chartjs-2";
Chart.register(CategoryScale);
const Dashboard = () => {
  const [brands, setBrands] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await axios.get(
          "https://daily-hut-backend.vercel.app/api/v1/brands"
        );
        setBrands(brandsResponse.data.data);

        const usersResponse = await axios.get(
          "https://daily-hut-backend.vercel.app/api/v1/users/users-count",
          { headers: { authorization: `Bearer ${token}` } }
        );
        setUsers(usersResponse.data.data);

        const categoriesResponse = await axios.get(
          "https://daily-hut-backend.vercel.app/api/v1/category"
        );
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  let topBrands = brands
    .sort((a, b) => b.itemsCount - a.itemsCount)
    .slice(0, 4);
  let brandsNames = topBrands.map((c) => c.name);
  let brandItems = topBrands.map((c) => c.itemsCount);
  const productsByBrandChartData = {
    labels: [...brandsNames],
    datasets: [
      {
        label: "Product Quantity",
        data: [...brandItems],
        backgroundColor: "#4F46E5",
      },
    ],
  };

  const usersChartData = {
    labels: ["Admins", "Suppliers", "Members"],
    datasets: [
      {
        label: "User Count",
        data: [users.adminsCount, users.suppliersCount, users.membersCount],
        backgroundColor: ["#26648e", "#4f8fc0", "#53d2dc"],
      },
    ],
  };

  let topCategories = categories
    .sort((a, b) => b.itemsCount - a.itemsCount)
    .slice(0, 4);
  let categoryNames = topCategories.map((c) => c.name);
  let categoryItems = topCategories.map((c) => c.itemsCount);
  const categoriesChartData = {
    labels: [...categoryNames],
    datasets: [
      {
        label: "Category Count",
        data: [...categoryItems],
        backgroundColor: "#34D399",
      },
    ],
  };

  return (
    <div>
      <h3 className="text-center text-xl font-medium text-orange-700">
        Summary Charts
      </h3>
      <div className="container mx-auto grid lg:grid-cols-2 grid-cols-1 gap-7">
        {/* Products Chart */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Top Brand By Products</h2>
          <Bar data={productsByBrandChartData} />
        </div>

        {/* Users Chart */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Users Chart</h2>
          <Bar data={usersChartData} />
        </div>

        {/* Categories Chart */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">
            Top Categories By Products
          </h2>
          <Bar data={categoriesChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
