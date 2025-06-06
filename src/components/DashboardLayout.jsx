import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <DashboardNavbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
