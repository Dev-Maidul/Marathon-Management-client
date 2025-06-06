// src/components/DashboardNavbar.jsx
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard/add-marathon" className="block text-blue-600 hover:underline">
  Add Marathon
</Link></li>
        <li><Link to="/dashboard/my-marathons" className="block text-blue-600 hover:underline">My Marathon List</Link></li>
        <li><Link to="/dashboard/my-applies" className="block text-blue-600 hover:underline">My Apply List</Link></li>
      </ul>
    </div>
  );
};

export default DashboardNavbar;
