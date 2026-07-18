import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 border-r">
        Sidebar
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;