import { Outlet } from "react-router-dom";
import Navbar from "@components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
