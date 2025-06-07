import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { Helmet } from "react-helmet";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Helmet><title>Dashboard</title></Helmet>
      <DashboardNavbar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
