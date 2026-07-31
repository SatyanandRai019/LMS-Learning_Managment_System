import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/Slices/dashboardSlice";
import StatCard from "../../Components/Dashboard/StatCard";

function AdminDashboard() {

  const dispatch = useDispatch();

  const { dashboardData, loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Dashboard Overview
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Total Users"
          value={dashboardData.totalUsers}
        />

        <StatCard
          title="Total Courses"
          value={dashboardData.totalCourses}
        />

        <StatCard
          title="Revenue"
          value={`₹${dashboardData.totalRevenue}`}
        />

      </div>

    </div>
  );
}

export default AdminDashboard;