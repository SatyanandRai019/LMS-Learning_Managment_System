import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function TopCourses({ topCourses = [] }) {
  const hasData = topCourses.length > 0;

  const data = {
    labels: hasData ? topCourses.map((c) => c.title) : [],
    datasets: [
      {
        label: "Enrollments",
        data: hasData ? topCourses.map((c) => c.enrollments) : [],
        backgroundColor: "#0a1f44",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#475569", stepSize: 1 }, grid: { color: "rgba(0,0,0,0.05)" } },
      y: { ticks: { color: "#334155" }, grid: { display: false } },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/30">
      <h2 className="mb-6 text-xl font-semibold text-[#0a1f44]">Top Courses by Enrollment</h2>
      {hasData ? <Bar data={data} options={options} /> : <p className="text-sm text-slate-400">No enrollments yet.</p>}
    </div>
  );
}

export default TopCourses;