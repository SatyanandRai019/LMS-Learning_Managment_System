import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-base-100">

      <Sidebar />

      <main className="ml-64 min-h-screen overflow-y-auto p-6">

        <Outlet />

      </main>

    </div>
  );
}

export default DashboardLayout;