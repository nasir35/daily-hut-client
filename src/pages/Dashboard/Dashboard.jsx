import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import axios from "axios";
import { Bar } from "react-chartjs-2";
Chart.register(CategoryScale);
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:5000/api/v1/products"
        );
        setProducts(productsResponse.data.data);

        const usersResponse = await axios.get(
          "http://localhost:5000/api/v1/users/users-count",
          { headers: { authorization: `Bearer ${token}` } }
        );
        setUsers(usersResponse.data.data);

        const categoriesResponse = await axios.get(
          "http://localhost:5000/api/v1/category"
        );
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // Example chart data
  const productsChartData = {
    labels: ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"],
    datasets: [
      {
        label: "Product Quantity",
        data: [10, 20, 15, 25, 30],
        backgroundColor: "#4F46E5",
      },
    ],
  };

  const usersChartData = {
    labels: ["Admins", "Users", "Shopkeepers"],
    datasets: [
      {
        label: "User Count",
        data: [5, 20, 15],
        backgroundColor: "#F87171",
      },
    ],
  };

  const categoriesChartData = {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        label: "Category Count",
        data: [8, 15, 10, 20, 12],
        backgroundColor: "#34D399",
      },
    ],
  };

  return (
    <div>
      <h3 className="text-center text-xl font-medium text-orange-700">
        Dummy data charts
      </h3>
      <div className="container mx-auto grid lg:grid-cols-2 grid-cols-1 gap-7">
        {/* Products Chart */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Products Chart</h2>
          <Bar data={productsChartData} />
        </div>

        {/* Users Chart */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Users Chart</h2>
          <Bar data={usersChartData} />
        </div>

        {/* Categories Chart */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Categories Chart</h2>
          <Bar data={categoriesChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
