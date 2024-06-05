import { Outlet } from "react-router-dom";
import Navbar from "@components/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
