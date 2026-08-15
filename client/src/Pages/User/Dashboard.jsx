import { useSelector } from "react-redux";
import StatCard from "../../components/Dashboard/StatCard";

function Dashboard() {
  const { data } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-5">
        <StatCard
          title="Purchased Courses"
          value={data?.subscription?.length || 0}
        />

        <StatCard title="Role" value={data?.role} />

        <StatCard title="Status" value="Active" />
      </div>
    </div>
  );
}

export default Dashboard;
